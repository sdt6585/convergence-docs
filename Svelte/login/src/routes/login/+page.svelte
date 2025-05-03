<!-- src/lib/components/Login.svelte -->
<script>
  // Svelte 5 reactive variables using $state
  let email = $state('');
  let password = $state('');
  let isLoading = $state(false);
  
  // Form submission handler
  function handleLogin(event) {
    event.preventDefault();
    isLoading = true;
    
    // This would be replaced with actual login logic
    console.log('Login attempt:', { email, password });
    
    // Simulate API request
    setTimeout(() => {
      isLoading = false;
      // Would normally handle success/error here
    }, 1000);
  }
  
  // Google sign-in handler
  function handleGoogleLogin() {
    console.log('Google login clicked');
    // Would implement Google OAuth flow here
  }
</script>

<div class="login-container">
  <div class="login-header">
    <h2>Sign In</h2>
  </div>
  
  <form class="login-form" on:submit={handleLogin}>
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
    
    <div class="register-link">
      <p>Don't have an account? <a href="#">Register</a></p>
    </div>
  </form>
</div>

<style>
  .login-container {
    background-color: rgba(30, 30, 30, 0.95);
    border-radius: 15px;
    padding: 2rem;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin: 0 auto;
  }

  .login-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .login-header h2 {
    color: #f5f5f5;
    font-weight: 300;
    font-size: 1.8rem;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-size: 0.9rem;
    color: #aaa;
  }

  input {
    padding: 0.8rem;
    border-radius: 5px;
    border: 1px solid #333;
    background-color: #222;
    color: #fff;
    font-size: 1rem;
  }

  .btn {
    padding: 0.8rem;
    border-radius: 5px;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-primary {
    background-color: #444;
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: #555;
  }

  .btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

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

  .register-link {
    text-align: center;
    margin-top: 1rem;
    color: #666;
  }

  .register-link a {
    color: #888;
    text-decoration: none;
  }

  .register-link a:hover {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    .login-container {
      padding: 1.5rem;
    }
  }
</style>