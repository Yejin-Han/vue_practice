<template>
  <PageHeader />
  <router-view /> <!-- 페이지 이동이 표시될 곳 -->
  <PageFooter />
</template>

<script>
import PageHeader from './components/PageHeader'
import PageFooter from './components/PageFooter'

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2ce350;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
