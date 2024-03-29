<template>
  <div class="CompositionTestCmp testWrap">
    <h2>👨‍🏫 Composition Example</h2>
    <button @click="initTest();">초기화</button>
    <div>
      <h4>
        <span>입력 : </span>
        <input v-model="inData" @keyup.enter = "addList(inData);" placeholder="아무거나 입력해주세요.">
      </h4>
    </div>
    <div>
      <h4>
        <span>선택 : </span>
        <select v-model="selected">
          <option value="-" selected>선택해주세요.</option>
          <option v-for="(item, i) in list" :key="i" :value="item">{{ item }}</option>
        </select>
      </h4>
    </div>
    <div>
      <h4>
        <span>확인 : {{ selected }}</span>
      </h4>
    </div>
    <div>
      <h4>리스트 현황</h4>
      <div v-for="(item, i) in list" :key="item">
        {{ i }} → {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

/** 반응형 객체 */
let inData = ref("");
let list = ref([]);
let selected = ref("-");

/** 리스트 값 추가 */
function addList(data) {
  if(data == "" || data == null) {
    alert("입력 값이 없습니다.");
  } else {
    list.value.push(data);
    inData.value = "";
  }
}

/** 초기화 */
function initTest() {
  inData.value = "";
  list.value = [];
  selected.value = "-";
}
</script>