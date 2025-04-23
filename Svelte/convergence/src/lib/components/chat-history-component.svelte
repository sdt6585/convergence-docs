<!-- components/ChatHistory.svelte -->
<script>
  // Sample chat messages
  let chatMessages = [];
</script>

<div class="chat-history">
  <h3>Chat History</h3>
  
  {#if chatMessages.length === 0}
    <div class="empty-history">
      No messages yet.
    </div>
  {:else}
    {#each chatMessages as message}
      <div class="message">
        <span class="timestamp">{message.timestamp}</span>
        <span class="author">{message.author}:</span>
        <span class="content">{message.content}</span>
      </div>
    {/each}
  {/if}
</div>

<style>
  .chat-history {
    height: 100%;
    overflow-y: auto;
  }
  
  h3 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .empty-history {
    color: #888;
    font-style: italic;
  }
  
  .message {
    margin-bottom: 8px;
  }
  
  .timestamp {
    color: #888;
    margin-right: 5px;
    font-size: 0.8rem;
  }
  
  .author {
    font-weight: bold;
    margin-right: 5px;
  }
</style>
