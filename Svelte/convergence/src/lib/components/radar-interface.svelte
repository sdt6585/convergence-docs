<script lang="ts">
  import { onMount } from 'svelte';
  let showMenu = false;
  let menuX = 0;
  let menuY = 0;

  // Radar dimensions
  const width = 400;
  const height = 400;
  const centerX = width / 2;
  const centerY = height / 2;

  // Player ship properties
  const playerRadius = 16;
  const navigableRadius = 110; // px, for 690 km
  const velocity = 46; // km/s
  const velocityLineLength = 80; // px
  const velocityAngle = -30; // degrees, for demo

  // Debris example
  const debris = [
    { x: centerX - 120, y: centerY + 30, r: 18 }
  ];

  function onPlayerClick() {
    showMenu = true;
    // Position menu near the player ship
    menuX = centerX + 30;
    menuY = centerY - 30;
  }

  function closeMenu() {
    showMenu = false;
  }

  function handleOption(option: string) {
    console.log(option + ' selected');
    closeMenu();
  }
</script>

<div class="radar-frame">
  <svg {width} {height}>
    <!-- Outer radar boundary -->
    <rect x="1" y="1" width="600" height="600" rx="24" fill="#fff" stroke="#222" stroke-width="2" />

    <!-- Navigable radius -->
    <circle cx={centerX} cy={centerY} r={navigableRadius} fill="none" stroke="#888" stroke-width="2" />

    <!-- Player ship -->
    <circle cx={centerX} cy={centerY} r={playerRadius} fill="#fff" stroke="#222" stroke-width="2" style="cursor:pointer" on:click={onPlayerClick} />
    <text x={centerX} y={centerY + 55} text-anchor="middle" font-size="13" fill="#222">Player</text>

    <!-- Velocity vector -->
    <g>
      <line
        x1={centerX}
        y1={centerY}
        x2={centerX + velocityLineLength * Math.cos(velocityAngle * Math.PI / 180)}
        y2={centerY + velocityLineLength * Math.sin(velocityAngle * Math.PI / 180)}
        stroke="#222" stroke-width="2" marker-end="url(#arrowhead)" />
      <text
        x={centerX + velocityLineLength * Math.cos(velocityAngle * Math.PI / 180) + 10}
        y={centerY + velocityLineLength * Math.sin(velocityAngle * Math.PI / 180) - 10}
        font-size="13" fill="#222">46 km/s</text>
      <text
        x={centerX + velocityLineLength * Math.cos(velocityAngle * Math.PI / 180) + 10}
        y={centerY + velocityLineLength * Math.sin(velocityAngle * Math.PI / 180) + 10}
        font-size="13" fill="#222">Current Velocity</text>
    </g>
    <defs>
      <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
        <polygon points="0 0, 8 4, 0 8" fill="#222" />
      </marker>
    </defs>

    <!-- Debris -->
    {#each debris as d}
      <ellipse cx={d.x} cy={d.y} rx={d.r} ry={d.r * 0.7} fill="#fff" stroke="#222" stroke-width="2" />
      <text x={d.x} y={d.y + 30} text-anchor="middle" font-size="13" fill="#222">Debris</text>
    {/each}

    <!-- Draw distance label -->
    <text x="20" y={height - 20} font-size="15" fill="#222">5,000 kilometer draw distance</text>
    <text x={centerX + navigableRadius + 10} y={centerY + 10} font-size="13" fill="#222">Inner circle is ship's navigable radius in a 15 second turn, in this case 690 km</text>
  </svg>

  {#if showMenu}
    <div class="player-menu" style="left: {menuX}px; top: {menuY}px;">
      <ul>
        <li><button type="button" on:click={() => handleOption('Plot Course')}>Plot Course</button></li>
        <li><button type="button" on:click={() => handleOption('Target Weapons')}>Target Weapons</button></li>
        <li><button type="button" on:click={() => handleOption('Redirect Shields')}>Redirect Shields</button></li>
        <li><button type="button" on:click={() => handleOption('Network Attack')}>Network Attack</button></li>
        <li class="close"><button type="button" on:click={closeMenu}>Cancel</button></li>
      </ul>
    </div>
  {/if}
</div>

<style>
.radar-frame {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 2px 8px #0001;
}
.player-menu {
  position: absolute;
  background: #fff;
  border: 1px solid #222;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0002;
  z-index: 10;
  min-width: 160px;
}
.player-menu ul {
  list-style: none;
  margin: 0;
  padding: 8px 0;
}
.player-menu li {
  padding: 10px 18px;
  cursor: pointer;
  font-size: 1rem;
  border-bottom: 1px solid #eee;
  transition: background 0.15s;
}
.player-menu li:last-child {
  border-bottom: none;
}
.player-menu li:hover {
  background: #f0f0f0;
}
.player-menu .close {
  color: #b00;
  font-weight: bold;
}
.player-menu button {
  width: 100%;
  background: none;
  border: none;
  padding: 10px 0;
  font-size: 1rem;
  cursor: pointer;
  text-align: left;
}
.player-menu button:hover {
  background: #f0f0f0;
}
</style> 