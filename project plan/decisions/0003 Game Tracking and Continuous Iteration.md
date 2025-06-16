
# Event Tracking Implementation Plan for Convergence

## 1. Core Dependencies

First, we need to add these key dependencies to `package.json`:

```json
{
  "dependencies": {
    "@posthog/node": "^3.1.0",  // Server-side tracking
    "posthog-js": "^1.96.0",    // Client-side tracking
    "uuid": "^9.0.1"            // For generating event IDs
  }
}
```

## 2. Event Schema Implementation

Create a new file `src/lib/analytics/eventSchema.js`:

```javascript
export const EventTypes = {
  // User Lifecycle Events
  USER_SIGNUP: 'user_signup',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  
  // Game Events
  GAME_CREATED: 'game_created',
  GAME_SESSION_STARTED: 'game_session_started',
  GAME_SESSION_ENDED: 'game_session_ended',
  ROLL_MADE: 'roll_made',
  SKILL_LEVELED: 'skill_leveled',
  CLASS_LEVELED: 'class_leveled',
  ITEM_ADDED: 'item_added',
  
  // Payment Events
  PAYMENT_COMPLETED: 'payment_completed',
  SUBSCRIPTION_CHANGED: 'subscription_changed'
};

export const createEventPayload = (eventName, properties = {}, context = {}) => ({
  event_id: crypto.randomUUID(),
  timestamp: new Date().toISOString(),
  event_name: eventName,
  event_version: '1.0',
  properties,
  context: {
    ...context,
    page_url: typeof window !== 'undefined' ? window.location.href : null,
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null
  }
});
```

## 3. Client-Side Implementation

Create `src/lib/analytics/client.js`:

```javascript
import posthog from 'posthog-js';
import { createEventPayload } from './eventSchema';

class AnalyticsClient {
  constructor() {
    this.initialized = false;
    this.eventQueue = [];
  }

  init() {
    if (this.initialized) return;
    
    posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
      api_host: import.meta.env.VITE_POSTHOG_HOST,
      capture_pageview: false, // We'll handle this manually
      capture_pageleave: true,
      persistence: 'localStorage',
      loaded: (posthog) => {
        this.initialized = true;
        this.processQueue();
      }
    });
  }

  track(eventName, properties = {}) {
    const event = createEventPayload(eventName, properties);
    
    if (!this.initialized) {
      this.eventQueue.push(event);
      return;
    }

    posthog.capture(event.event_name, {
      ...event.properties,
      ...event.context
    });
  }

  identify(userId, traits = {}) {
    if (!this.initialized) return;
    posthog.identify(userId, traits);
  }

  private processQueue() {
    this.eventQueue.forEach(event => {
      this.track(event.event_name, event.properties);
    });
    this.eventQueue = [];
  }
}

export const analytics = new AnalyticsClient();
```

## 4. Server-Side Implementation

Create `src/lib/analytics/server.js`:

```javascript
import { PostHog } from '@posthog/node';
import { createEventPayload } from './eventSchema';

class AnalyticsServer {
  constructor() {
    this.client = new PostHog(
      process.env.POSTHOG_KEY,
      { host: process.env.POSTHOG_HOST }
    );
  }

  async track(eventName, properties = {}, userId = null) {
    const event = createEventPayload(eventName, properties);
    
    await this.client.capture({
      distinctId: userId || 'anonymous',
      event: event.event_name,
      properties: {
        ...event.properties,
        ...event.context
      }
    });
  }

  async identify(userId, traits = {}) {
    await this.client.identify({
      distinctId: userId,
      properties: traits
    });
  }
}

export const analyticsServer = new AnalyticsServer();
```

## 5. Supabase Integration

Create `src/lib/analytics/supabase.js`:

```javascript
import { analyticsServer } from './server';

export const setupSupabaseAnalytics = (supabase) => {
  // Track auth events
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      analyticsServer.track('user_login', {
        auth_provider: session?.user?.app_metadata?.provider
      }, session?.user?.id);
    }
    
    if (event === 'SIGNED_OUT') {
      analyticsServer.track('user_logout', {}, session?.user?.id);
    }
  });

  // Track database changes
  supabase
    .channel('analytics')
    .on('postgres_changes', { 
      event: 'INSERT', 
      schema: 'public', 
      table: 'games' 
    }, (payload) => {
      analyticsServer.track('game_created', {
        game_id: payload.new.id,
        game_type: payload.new.type
      }, payload.new.user_id);
    })
    .subscribe();
};
```

## 6. Implementation Steps

1. **Environment Setup**
   - Add PostHog environment variables to `.env`:
   ```
   VITE_POSTHOG_KEY=your_key
   VITE_POSTHOG_HOST=https://app.posthog.com
   POSTHOG_KEY=your_key
   POSTHOG_HOST=https://app.posthog.com
   ```

2. **Initialize Analytics**
   - Add to `src/routes/+layout.svelte`:
   ```svelte
   <script>
     import { onMount } from 'svelte';
     import { analytics } from '$lib/analytics/client';
     import { setupSupabaseAnalytics } from '$lib/analytics/supabase';
     import { supabase } from '$lib/supabaseClient';

     onMount(() => {
       analytics.init();
       setupSupabaseAnalytics(supabase);
     });
   </script>
   ```

3. **Track Key Events**
   - Add to relevant components, for example in `src/routes/game/+page.svelte`:
   ```svelte
   <script>
     import { analytics } from '$lib/analytics/client';

     function handleGameStart() {
       analytics.track('game_session_started', {
         game_id: gameId,
         difficulty: difficulty
       });
     }
   </script>
   ```

## 7. Testing Plan

1. **Unit Tests**
   - Create `src/lib/analytics/__tests__/analytics.test.js`
   - Test event creation, queueing, and sending
   - Mock PostHog client

2. **Integration Tests**
   - Test Supabase event tracking
   - Test client-server event correlation
   - Verify event schema compliance

## 8. Monitoring & Maintenance

1. **Error Tracking**
   - Implement error boundaries for analytics
   - Log failed events to error tracking service
   - Set up alerts for tracking failures

2. **Performance Monitoring**
   - Track analytics client load time
   - Monitor event processing latency
   - Set up dashboards for key metrics

## 9. Privacy & Compliance

1. **GDPR Compliance**
   - Implement user consent management
   - Add data deletion endpoints
   - Document data retention policies

2. **Data Protection**
   - Implement PII filtering
   - Add data encryption for sensitive events
   - Set up audit logging

This implementation plan provides a robust foundation for event tracking in Convergence while maintaining scalability and compliance requirements. The architecture supports both client-side and server-side tracking, with Supabase integration for database events.

Would you like me to help you implement any specific part of this plan or would you like more details about any section?