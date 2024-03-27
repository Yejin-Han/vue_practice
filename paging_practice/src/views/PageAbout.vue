<template>
  <section id="about" class="flex justify-center items-center">
    <h2 class="font-black text-6xl text-center leading-tight">
      <p><span class="vue">Vue3</span>.js를 이용하여</p>
      <p>간단한 연락처의</p>
      <p><span class="text-fuchsia-600">Paginated List</span>를 보여줍니다.</p>
    </h2>
  </section>
</template>

<style scoped>
h2 {
  margin-top: 5rem;
  animation: text-show 0.6s ease-in-out both;
}
.vue {
  color: #41b883;
}

@keyframes text-show {
  0% {
    opacity: 0;
    margin-top: 5rem;
  }

  100% {
    opacity: 1;
    margin-top: 0;
  }
}
</style>