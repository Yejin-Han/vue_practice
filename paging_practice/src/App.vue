<template>
  <PageHeader />
  <router-view /> 
  <PageFooter v-if="this.$route.path !== '/'" />
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>
