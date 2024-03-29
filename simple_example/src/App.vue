<template>
  <div class="HeaderCmp">
    <HeaderCmp />
  </div>
  <div class="wrap" style="display: flex;">
    <div style="flex: 1;">
      <MenuCmp />
    </div>
    <div style="flex: 2;">
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderCmp from '@/components/common/HeaderCmp.vue'
import MenuCmp from '@/components/common/MenuCmp.vue'

export default {
  components: {
    HeaderCmp,
    MenuCmp
  }
}
</script>