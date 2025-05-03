<script>
  import '../../../styles/auth-forms.css';
  import { createClient } from '@supabase/supabase-js';
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_URL } from '$env/static/public';
  
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
  
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let isLoading = $state(false);
  let errorMessage = $state('');
  let successMessage = $state('');
  
  async function handleSignup(event) {
    event.preventDefault();
    isLoading = true;
    errorMessage = '';
    successMessage = '';
    
    // Validate passwords match
    if (password !== confirmPassword) {
      errorMessage = 'Passwords do not match';
      isLoading = false;
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${PUBLIC_URL}/app`
        }
      });
      
      if (error) throw new Error("Account creation error: " + error.message);

      if (data?.user?.identities?.length === 0) {
        // Email already exists - let's send them a magic link instead
        const { error: magicLinkError } = await supabase.auth.signInWithOtp({
          email: email,
          options: {
            emailRedirectTo: `${PUBLIC_URL}/app`
          }
        });

        if (magicLinkError) throw new Error ("Magic link error: " + magicLinkError.message);
      }
      
      // Success - Supabase sends a confirmation email by default
      successMessage = 'Account created! Please check your email to confirm your account.';
      
      // Clear form
      email = '';
      password = '';
      confirmPassword = '';
      
    } catch (error) {
      console.error('Signup error:', error);
      errorMessage = error.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="auth-container">
  <div class="auth-header">
    <h2>Sign Up</h2>
  </div>
  
  <form class="auth-form" on:submit={handleSignup}>
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
    
    <div class="form-group">
      <label for="password-confirmation">Password Confirmation</label>
      <input 
        type="password" 
        id="password-confirmation" 
        placeholder="Confirm your password"
        bind:value={confirmPassword}
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

    {#if successMessage}
      <div class="success-message">
        {successMessage}
      </div>
    {/if}
  </form>
</div>

<style>
  
</style>