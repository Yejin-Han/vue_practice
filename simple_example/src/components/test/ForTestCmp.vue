<template>
  <div class="testWrap">
    <h2>👨‍🏫 For Test</h2>
    <h3>리스트</h3>
    <div>{{ list }}</div>
    <h3>리스트 값</h3>
    <div v-for="(obj, i) in list" :key="obj">
      {{ i }} → {{ obj }}
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      list:
        [
          { id: '001', message: 'Hello For' },
          { id: '002', message: 'Hello Test' },
          { id: '003', message: 'Hello World' }
        ]
    };
  }
}
</script>

<style scoped>
.testWrap {
  color: #1fbe7f;
}
</style>