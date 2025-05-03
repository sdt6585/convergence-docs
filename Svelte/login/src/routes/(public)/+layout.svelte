<script>
  import '../../app.css';
  import { createClient } from '@supabase/supabase-js';
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

  //Check if we're logged in or not
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
  supabase.auth.getSession()
</script>

<div class="app">
  <header>
    <div class="logo-container">
      <img src="/images/logo.png" alt="Convergence" class="logo-image" />
      <h1 class="title">CONVERGENCE</h1>
    </div>
    <nav>
      <a href="/">Home</a>
      <a href="/login">Login</a>
      <a href="/signup">Sign Up</a>
    </nav>
  </header>
  
  <main>
    <!-- This slot is where page content will be rendered -->
    <slot></slot>
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    z-index: 1;
  }
  
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: rgba(20, 20, 20, 0.8);
  }
  
  .logo-container {
    display: flex;
    align-items: center;
  }
  
  .logo-image {
    height: 50px; /* Adjust the size as needed */
    width: auto;
  }
  
  nav {
    display: flex;
    gap: 1.5rem;
  }
  
  nav a {
    color: #f5f5f5;
    font-size: 1rem;
  }
  
  main {
    flex: 1;
    padding: 2rem;
    display: flex;
    justify-content: center;
  }

  .title {
    margin-left: 15px;
  }
</style>