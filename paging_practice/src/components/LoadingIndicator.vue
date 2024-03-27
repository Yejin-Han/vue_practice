<template>
  <div class="loader-container">
    <div class="loader">
      <div></div>   
      <div></div>    
      <div></div>    
      <div></div>    
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingIndicator',
}
</script>

<style>
.loader-container {
  position: absolute;
  left: 50%; top: 50%;
  transform: translate(-50%, -50%);
}

.loader {
  width: 0.75rem;
  height: 0.75rem;
  animation: loader-spinning 3s infinite linear;
  
}

.loader div {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #8c4397;
  border-radius: 50%;
  animation: loader-rotating 2s infinite ease;
}

.loader div:nth-child(1) {
  --rotation: 90;
}

.loader div:nth-child(2) {
  --rotation: 180;
}

.loader div:nth-child(3) {
  --rotation: 270;
}

.loader div:nth-child(4) {
  --rotation: 360;
}

@keyframes loader-rotating {
  0%, 85% {
    transform: rotate(calc(var(--rotation) * 1deg)) translateY(0);
  }

  42.5% {
    transform: rotate(calc(var(--rotation) * 1deg)) translateY(300%);
  }
}

@keyframes loader-spinning {
  to {
    transform: rotate(360deg);
  }
}
</style>