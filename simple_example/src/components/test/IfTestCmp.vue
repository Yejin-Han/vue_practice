<template>
  <div class="IfTestCmp testWrap">
    <h2>👨‍🏫 If Test</h2>
    <h3>리스트</h3>
    <div>{{ list }}</div>
    <h3>리스트 값</h3>
    <div v-for="(obj, i) in list" :key="obj">
      <div v-if="obj.id == '001'">
        {{ i }} → {{ obj }}
      </div>
      <div v-else>
        {{ i }} -> None
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      list:
        [
          { id: '001', message: 'Hello If' },
          { id: '002', message: 'Hello Test' },
          { id: '003', message: 'Hello World' }
        ]
    };
  }
}
</script>