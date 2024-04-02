<template>
  <v-app class="orbit-regular">
    <v-app-bar color="blue-darken-4">
      <v-app-bar-title :style="{marginInlineStart: 0, lineHeight: 1}">
        <div style="text-align: center; font-size: 2rem;" class="jua-regular">게시판 {{ $route.params.id }}</div>
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
                <div><div style="display: inline-block; width: 6rem;">작성자</div><div style="display: inline-block;">: {{ writer }}</div></div>
                <div style="margin-top: 0.625rem;"><div style="display: inline-block; width: 6rem;">제목</div><div style="display: inline-block;">: {{ title }}</div></div>
                <div style="margin-top: 0.625rem;"><div style="display: inline-block; width: 6rem;">작성일</div><div style="display: inline-block;">: {{ changeTime(createdAt) }}</div></div>
                <div style="margin-top: 0.625rem;"><div style="display: inline-block; width: 6rem;">최근수정일</div><div style="display: inline-block;">: {{ changeTime(updatedAt) }}</div></div>
                <div style="margin-top: 1.5rem;">내용</div>
                <v-textarea variant="solo" no-resize v-model="text" rows="13" :style="{marginTop: '0.625rem'}" :readonly="editable===false"></v-textarea> <!-- 기본은 수정 불가, 수정버튼을 누르면 수정할 수 있도록 -->
                <div style="text-align: right; margin-bottom: 1.25rem;">
                  <v-btn style="width: 5rem;" @click="moveback">뒤로</v-btn>
                  <v-btn style="width: 5rem; margin-left: 1rem;" @click="editcontent" v-if="editable===false">수정</v-btn>
                  <v-btn style="width: 5rem; margin-left: 1rem;" @click="editcontentfinish" v-if="editable===true">수정완료</v-btn>
                  <v-btn style="width: 5rem; margin-left: 1rem;" @click="deletecontent">삭제</v-btn>
                </div>
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
      createdAt: '',
      updatedAt: '',
      text: '',
      
      editable: false,
    }
  },
  mounted() {
    axios({
      url: "http://127.0.0.1:52273/content/content/",
      method: "POST",
      data: {
        id: this.$route.query.id
      },
    }).then(res => {
      this.writer = res.data.writer;
      this.title = res.data.title;
      this.createdAt = res.data.createdAt;
      this.updatedAt = res.data.updatedAt;
      this.text = res.data.text;
    }).catch(err => {
      alert(err);
    })
  },
  methods: {
    moveback() {
      window.history.back();
    },
    movetomain() {
      window.location.href="/";
    },
    editcontent() {
      this.editable = true;
    },
    editcontentfinish() {
      axios({
        url: "http://127.0.0.1:52273/content/edit/",
        method: "POST",
        data: {
          id: this.$route.query.id,
          text: this.text
        },
      }).then(res => {
        alert(res.data.message);
        this.editable = false;
      }).catch(err => {
        alert(err);
      });
    },
    deletecontent() {
      axios({
        url: 'http://127.0.0.1:52273/content/delete/',
        method: "POST",
        data: {
          id: this.$route.query.id
        }
      }).then(res => {
        alert(res.data.message);
        // 삭제 후 그 게시판의 1페이지로 이동
        window.location.href = window.location.pathname.slice(0, -8) + '/?page=1';
      }).catch(err => {
        alert(err);
      })
    },
    changeTime(utc) {
      const date = new Date(utc);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      const time = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;

      return time;
    }
  }
}
</script>

<style>
textarea[readonly="readonly"] {
  background: #e9e9e9;
}
</style>