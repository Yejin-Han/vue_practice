<template>
  <div class="APICallTestCmp testWrap">
    <h2>👨‍🏫 API Call Test</h2>
    <h4>이메일 : <input v-model="email" placeholder="이메일"></h4>
    <h4>패스워드 : <input v-model="pwd" placeholder="패스워드"></h4>
    <button @click="call()">API Call</button>
  </div>
  <div>
    <h4>API Response</h4>
    <div style="max-width: 43.75rem; height: 18.75rem; overflow: auto;">
      {{ result }}
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'; // inject로 provide로 전달받은 데이터 사용

const URL = inject('$Login');
const Axios = inject('$Axios');
const result = ref("");
const email = ref("");
const pwd = ref("");

const call = async() => {
  const data = {
    "email": email.value,
    "password": pwd.value
  };

  await Axios
    .post(URL, data)
    .then(res => {
      console.log(res);
      result.value = res.data;
    })
    .catch(err => {
      console.log(err);
    });
}

// 이메일 : eve.holt@reqres.in
// 비밀번호 : cityslicka
</script>