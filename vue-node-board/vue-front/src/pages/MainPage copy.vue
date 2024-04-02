<template>
  <v-app class="orbit-regular">
    <v-app-bar color="blue-darken-4">
      <v-app-bar-title :style="{marginInlineStart: 0, lineHeight: 1}">
        <div style="text-align: center; font-size: 2rem;" class="jua-regular">메인화면</div>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container :style="{marginTop: '2rem'}">
        <v-row align="center" :style="{justifyContent: 'center'}">
          <v-col cols="12" md="2" align="center">
            <v-btn color="light-blue-lighten-3" @click="movetoboard1"
                   :style="{height:'3.125rem', width:'10.625rem', fontWeight:'bold', fontSize:'1.125rem'}">게시판1</v-btn>
          </v-col>
          <v-col cols="12" md="2" align="center">
            <v-btn color="cyan-lighten-3" @click="movetoboard2"
                   :style="{height:'3.125rem', width:'10.625rem', fontWeight:'bold', fontSize:'1.125rem'}">게시판2</v-btn>
          </v-col>
          <v-col cols="12" md="2" align="center">
            <v-btn color="teal-lighten-3" type="submit" @click="movetoboard3"
                   :style="{height:'3.125rem', width:'10.625rem', fontWeight:'bold', fontSize:'1.125rem'}">게시판3</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container :style="{marginTop: '2rem'}">
        <v-row :style="{justifyContent: 'center'}">
          <v-col cols="12" md="2" />
          <v-col cols="12" md="2">
            <v-select :items="searchoption" v-model="searchoptionselected" :style="{}" />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="searchkeyword" variant="solo" label="검색키워드" :style="{width: '100%'}" />
          </v-col>
          <v-col cols="12" md="1">
            <v-btn @click="searchstart">검색</v-btn>
          </v-col>
          <v-col cols="12" md="3" />
        </v-row>
      </v-container>
      <v-container v-if="searchfinish === true" style="text-align: center;">
        <div style="font-size: 1.25rem;">검색결과 : {{ searchcnt }} 개</div> 
        <table style="border-collapse: collapse; border-spacing: 0; width: 100%; margin-top: 1rem;">
          <thead>
            <tr>
              <td style="width: 10%;">게시판</td>
              <td style="width: 20%;">작성자</td>
              <td style="width: 50%;">제목</td>
              <td style="width: 20%;">작성일</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in contentlist" :key="item.id" @click="movetocontent(item.boardnum, item.id)">
              <td>{{ item.boardnum }}</td>
              <td>{{ item.writer }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.createdAt.split('T')[0] }}</td>
            </tr>
          </tbody>
        </table>
      </v-container>
    </v-main>
    <v-footer style="max-height: 3.125rem; color: white" />
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      searchkeyword: '', // 검색 키워드
      searchfinish: false, // 검색 완료시 true로 바뀌고, 이 때부터 표 생성
      searchoption: ['제목', '작성자'], // 검색옵션
      searchoptionselected: '제목', // 검색옵션 값 받아오기, 기본값은 제목으로 지정
      searchcnt: 0, // 검색된 게시글 개수
      contentlist: [] // 게시글 리스트
    }
  },
  methods: {
    // params로 게시판 구분, query로 페이지 구분
    movetoboard1() {
      window.location.href = '/board/1/?page=1'
    },
    movetoboard2() {
      window.location.href = '/board/2/?page=1'
    },
    movetoboard3() {
      window.location.href = '/board/3/?page=1'
    },
    movetocontent(boardnum, id) { // 검색된 게시물 클릭 시 해당 게시글로 이동
      window.location.href = '/board/' + boardnum + '/content?id=' + id
    },
    searchstart() { // 검색버튼 눌렀을 때 실행
      if(this.searchkeyword == '') {
        alert('키워드를 입력해주세요.');
      } else {
        axios({
          url: 'http://127.0.0.1:52273/content/search/',
          method: 'POST',
          data: {
            searchoption: this.searchoptionselected,
            searchkeyword: this.searchkeyword,
          }
        }).then(res => {
          this.contentlist = res.data;
          this.searchcnt = this.contentlist[Object.keys(this.contentlist).length - 1].cnt;
          this.contentlist.pop();
          alert('검색완료!');
          this.searchfinish = true;
          this.searchkeyword = '';
        }).catch(err => {
          alert(err);
        });
      }
    }
  }
}
</script>