<template>
  <header id="header" class="w-full text-center fixed">
    <div class="innerbox h-full flex justify-between items-center">
      <h1><router-link to="/"><img src="../assets/img/logo.png" alt=""></router-link></h1>
      <nav id="gnb">
        <ul class="text-white font-bold">
          <li class="inline-block mr-4"><router-link to="/" class="hover:text-fuchsia-500 focus:text-fuchsia-500">Home</router-link></li>
          <li class="inline-block mr-4"><router-link to="/about" class="hover:text-fuchsia-500 focus:text-fuchsia-500">About</router-link></li>
          <li class="inline-block"><router-link to="/contact" class="hover:text-fuchsia-500 focus:text-fuchsia-500">Contact</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>