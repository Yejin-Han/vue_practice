<template>
  <v-app class="orbit-regular write">
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
                <v-file-input class="upload-file" accept="image/*" label="이미지 제출(여러개 가능)" variant="solo" density="compact" multiple counter show-size prepend-icon="mdi-camera" style="width: 65%;" @change="onImgChange" @click:clear="clearPreview" />
                <span v-if="imgUploaded" style="display: block; margin: 1rem 0 0.5rem;">(미리보기)</span>
                <v-img v-for="(item, idx) in uploadimgurl" :key="idx" :src="item.url" cover style="display: inline-block; width: 12.5rem; height: 9.375rem; border: 1px solid #999; margin-right: 0.25rem;" />
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
      uploadimgurl: [], // 업로드한 이미지의 미리보기 기능을 위해 url을 저장
      imgcnt: 0, // 업로드한 이미지 개수
      imgUploaded: false,
    }
  },
  mounted() {
    this.imgUploaded = false;
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
            text: this.text,
            imgcnt: this.imgcnt,
          }
        }).then(res => {
          alert(res.data.message);
          window.history.back();
        }).catch(err => {
          alert(err);
        });
      }
    },
    onImgChange(file) { // v-file-input에 변경이 일어날 때
      if(!file) return;
      
      const formData = new FormData(); // 스크립트단에서 폼 데이터를 다루는 객체, 멀티미디어 파일을 페이지 전환 없이 비동기로 제출하고 싶을 때
      this.uploadimgurl = []; // 미리보기용

      Array.from(file.srcElement.files).forEach(item => {
        formData.append('filelist', item); // formData의 name: 'filelist', value: '이미지'

        const reader = new FileReader();
        reader.onload = (e) => {
          // e.target.result를 통해 이미지 url을 가져와서 uploadimgurl에 저장
          this.uploadimgurl.push({ url: e.target.result });
          console.log('uploadimgurl', this.uploadimgurl);
        }
        reader.readAsDataURL(item);
        
        this.imgUploaded = true;
      });

      axios({
        url: "http://127.0.0.1:52273/content/imagesave/",
        method: "POST",
        headers: {'Content-Type': 'multipart/form-data'}, // formdata 형식을 전송하기 위함
        data: formData,
      }).then(res => {
        console.log(res.data.message);
        this.imgcnt = Array.from(file.srcElement.files).length; // 이미지 개수 저장
      }).catch(err => {
        alert(err);
      });
    },
    clearPreview() {
      this.uploadimgurl = [];
      this.imgUploaded = false;
    }
  }
}
</script>