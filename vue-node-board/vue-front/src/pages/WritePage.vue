<template>
  <v-app class="orbit-regular">
    <v-app-bar color="blue-darken-4">
      <v-app-bar-title :style="{marginInlineStart: 0, lineHeight: 1}">
        <div style="text-align: center; font-size: 2rem;" class="jua-regular">게시판 {{ $route.params.id }} 글쓰기</div>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container :style="{marginTop: '2rem'}">
        <v-row>
          <v-col cols="12" md="2" :style="{textAlign: 'center'}">
            <v-btn color="blue-grey-darken-2" :style="{maxWidth: '8rem', height:'3rem', width:'80%', fontWeight:'bold', fontSize:'1.125rem'}" @click="movetomain">홈으로</v-btn>
          </v-col>
          <v-col cols="12" md="10">
            <v-card style="padding: 2rem 6%;">
              <v-form ref="form" @submit.prevent="onSubmitForm">
                <v-text-field v-model="writer" hide-details="auto" variant="solo" label="작성자" style="max-width: 16rem; width: 40%;" :rules="[v => !!v || '작성자는 필수입니다.']"></v-text-field>
                <v-text-field v-model="title" hide-details="auto" variant="solo" label="제목" style="max-width: 30rem; width: 70%; padding-top: 1.5rem;" :rules="[v => !!v || '제목은 필수입니다.']"></v-text-field>
                <v-textarea v-model="text" no-resize label="내용" variant="solo" rows="13" :style="{marginTop: '0.625rem', paddingTop: '1.5rem'}"></v-textarea>
                <div style="text-align: right; margin-bottom: 1.25rem;">
                  <v-btn style="width: 5rem;" @click="moveback">취소</v-btn>
                  <v-btn style="width: 5rem; margin-left: 1rem;" type="submit">제출</v-btn>
                </div>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      writer: '',
      title: '',
      text: '',
    }
  },
  methods: {
    moveback() {
      window.history.back();
    },
    movetomain() {
      window.location.href = "/";
    },
    onSubmitForm() {
      if(this.$refs.form.validate()) { // 위에 써 준 rules를 만족하면 실행
        axios({
          url: "http://127.0.0.1:52273/content/write",
          method: "POST",
          data: {
            boardnum : this.$route.params.id,
            writer: this.writer,
            title: this.title,
            text: this.text
          }
        }).then(res => {
          alert(res.data.message);
          window.history.back();
        }).catch(err => {
          alert(err);
        });
      }
    }
  }
}
</script>