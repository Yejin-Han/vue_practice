<template>
  <div class="accordion">
    <div class="accordion__header" @click="toggleAccordion">
      <slot name="accordion__header"></slot>
    </div>
    <Transition
      name="accordion"
      @before-enter="beforeEnter" @enter="enter"
      @before-leave="beforeLeave" @leave="leave">
      <div class="accordion__body" v-show="showAccordionContent">
        <div class="accordion__body-inner">
          <slot name="accordion__body"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'BaseAccordion',

  data() {
    return {
      showAccordionContent: false
    }
  },
  methods: {
    toggleAccordion() {
      this.showAccordionContent = !this.showAccordionContent;
    },
    beforeEnter(el) {
      el.style.height = '0';
    },
    enter(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    beforeLeave(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    leave(el) {
      el.style.height = '0';
    }
  }
}
</script>

<style>
.accordion {
  border: 1px solid #cdcdcd;
  max-width: 25rem; width: 100%;
}
.accordion__header {
  padding: 1.5rem;
  cursor: pointer;
}
.accordion__body {
  background-color: #def7ff;
  border-top: 1px solid #cdcdcd;
  transition: all 0.3s ease-out;
  overflow: hidden;
}
.accordion__body-inner {
  padding: 1.5rem;
}
</style>