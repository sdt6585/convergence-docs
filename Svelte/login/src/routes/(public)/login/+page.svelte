<!-- src/lib/components/Login.svelte -->
<script>
  import '../../../styles/auth-forms.css';
  import { createClient } from '@supabase/supabase-js';
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
  import { goto } from '$app/navigation';

  // Initialize Supabase client
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

  // Svelte 5 reactive variables using $state
  let email = $state('');
  let password = $state('');
  let isLoading = $state(false);
  let errorMessage = $state('');
  
  // Form submission handler
  async function handleLogin(event) {
    event.preventDefault();
    isLoading = true;
    errorMessage = '';  // Clear any previous errors
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      
      if (error) throw error;
      
      // Successful login - you can redirect or handle the session here
      goto('/app');
      
    } catch (error) {
      console.error('Login error:', error);
      errorMessage = error.message;
    } finally {
      isLoading = false;
    }
  }
  
  // Google sign-in handler
  function handleGoogleLogin() {
    console.log('Google login clicked');
    // Would implement Google OAuth flow here
  }
</script>

<div class="auth-container">
  <div class="auth-header">
    <h2>Sign In</h2>
  </div>
  
  <form class="auth-form" on:submit={handleLogin}>
    <div class="form-group">
      <label for="email">Email</label>
      <input 
        type="email" 
        id="email" 
        placeholder="Enter your email"
        bind:value={email}
        required
      />
    </div>
    
    <div class="form-group">
      <label for="password">Password</label>
      <input 
        type="password" 
        id="password" 
        placeholder="Enter your password"
        bind:value={password}
        required
      />
    </div>
    
    <button type="submit" class="btn btn-primary" disabled={isLoading}>
      {isLoading ? 'Signing In...' : 'Login'}
    </button>

    
    {#if errorMessage}
      <div class="error-message">
        {errorMessage}
      </div>
    {/if}
    
    <div class="divider">OR</div>
    
    <button 
      type="button" 
      class="btn btn-google" 
      on:click={handleGoogleLogin}
      disabled={isLoading}
    >
      <!-- Google icon (simplified SVG) -->
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path fill="#ffffff" d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"></path>
        <path fill="#ffffff" d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"></path>
        <path fill="#ffffff" d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"></path>
        <path fill="#ffffff" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"></path>
      </svg>
      Continue with Google
    </button>
    
    <div class="auth-link">
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  </form>
</div>

<style>
  .btn-google {
    background-color: #333;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .btn-google:hover:not(:disabled) {
    background-color: #444;
  }

  .btn-google:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .divider {
    display: flex;
    align-items: center;
    text-align: center;
    color: #666;
    margin: 1rem 0;
  }

  .divider::before,
  .divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #333;
  }

  .divider::before {
    margin-right: 0.5rem;
  }

  .divider::after {
    margin-left: 0.5rem;
  }

  @media (max-width: 480px) {
    .login-container {
      padding: 1.5rem;
    }
  }
</style>