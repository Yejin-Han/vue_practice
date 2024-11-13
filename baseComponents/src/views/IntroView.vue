<script setup>
import BaseAccordion from '@/components/_base-accordion.vue';
</script>

<template>
  <div class="wrapper">
    <BaseAccordion>
      <template v-slot:accordion__header>
        <p>첫번째 제목 제목 제목</p>
      </template>
      <template v-slot:accordion__body>
        <p>내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용</p>
      </template>
    </BaseAccordion>
  </div>
</template>

<script>
export default {
  name: 'Intro',
  components: {
    BaseAccordion
  }
}
</script>