<!-- components/ChatPanel.svelte -->
<script>
  let chatInput = "";
  
  function sendMessage() {
    if (chatInput.trim() === "") return;
    
    // Send message logic here
    console.log("Sending message:", chatInput);
    
    // Clear input after sending
    chatInput = "";
  }
  
  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="chat-panel">
  <div class="chat-input-container">
    <span class="prompt-symbol">&gt;</span>
    <input 
      type="text" 
      class="chat-input" 
      bind:value={chatInput} 
      placeholder="Chat Prompt" 
      on:keydown={handleKeyDown}
    />
  </div>
</div>

<style>
  .chat-panel {
    width: 100%;
  }
  
  .chat-input-container {
    display: flex;
    align-items: center;
  }
  
  .prompt-symbol {
    font-weight: bold;
    margin-right: 5px;
  }
  
  .chat-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 5px;
    font-family: 'Courier New', monospace;
    font-size: 1rem;
  }
</style>
