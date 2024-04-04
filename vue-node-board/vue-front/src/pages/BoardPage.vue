<template>
  <v-app class="orbit-regular board">
    <v-app-bar color="blue-darken-4">
      <v-app-bar-title :style="{marginInlineStart: 0, lineHeight: 1}">
        <div style="text-align: center; font-size: 2rem;" class="jua-regular">게시판 {{ $route.params.id }}</div>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container :style="{marginTop: '2rem'}">
        <v-row>
          <v-col cols="12" md="4"></v-col>
          <v-col cols="12" md="2">
            <v-btn color="blue-grey-darken-2" :style="{height:'3.125rem', width:'10.625rem', fontWeight:'bold', fontSize:'1.125rem'}" @click="movetomain">홈으로</v-btn>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn color="yellow-lighten-2" :style="{height:'3.125rem', width:'10.625rem', fontWeight:'bold', fontSize:'1.125rem'}" @click="movetowrite">작성하기</v-btn>
          </v-col>
          <v-col cols="12" md="2"></v-col>
          <v-col cols="12" md="2" :style="{position: 'relative'}">
            <div :style="{position: 'absolute', fontSize: '1rem', right: '0', bottom: '0'}">글 개수 : {{ cnt }}개</div>
          </v-col>
        </v-row>
        <v-row>
          <table style="border-collapse: collapse; border-spacing: 0; width: 100%; margin-top: 1rem;">
            <thead>
              <tr style="font-weight: bold;">
                <td style="width: 20%; font-size: 1.25rem;">작성자</td>
                <td style="width: 60%; font-size: 1.25rem;">제목</td>
                <td style="width: 20%; font-size: 1.25rem;">작성일</td>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!contentlist.length">
                <td colspan="3">작성된 글이 없습니다.</td>
              </tr>
              <tr v-else v-for="item in contentlist" :key="item.id" @click="movetocontent(item.id)">
                <td class="cursor-pointer">{{ item.writer }}</td>
                <td class="cursor-pointer">{{ item.title }}</td>
                <td class="cursor-pointer">{{ item.createdAt.split('T')[0] }}</td>
                <!-- Sequelize의 createdAt, updatedAt의 날짜 형식이 '2021-12-10T12:38:52.000Z' 이런 식이여서 split('T')[0]을 통해 날짜만 표시 -->
              </tr>
            </tbody>
          </table>
        </v-row>
        <v-row style="padding-top: 3rem;">
          <v-spacer />
          <v-btn width="0.5rem" @click="movetopreviouspage">
            <v-icon color="red-darken-3" large>mdi-arrow-left-bold-outline</v-icon>
          </v-btn>
          <div style="margin: 0.4rem 1.5rem 0;">
            {{ $route.query.page }} / {{ totalPage }} page
          </div>
          <v-btn width="0.5rem" @click="movetonextpage">
            <v-icon color="red-darken-3" large>mdi-arrow-right-bold-outline</v-icon>
          </v-btn>
          <v-spacer />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      contentlist: [], // 현재 게시판과 페이지에 맞는 글 리스트들
      cnt: 0, // 현재 게시판의 총 글 개수
    }
  },
  computed: { // 계산 목적
    totalPage() {
      if(this.cnt == 0) { // 현재 게시판 글 개수가 0개일 때, 총 페이지 수가 0이 되는 것을 방지
        return 1;
      } else {
        return Math.ceil(this.cnt / 10); // (글 개수 / 10)한 후 올림 연산을 통해 총 페이지 계산
      }
    }
  },
  mounted() { // 페이지가 켜질 때 글 리스트를 db에서 불러옴
    // 게시글 작성자, 제목, 작성일 가져오기
    axios({
      url: "http://127.0.0.1:52273/content/boardlist/",
      method: "POST",
      data: {
        boardnum: this.$route.params.id,
        page: this.$route.query.page,
      },
    }).then(res => {
      this.contentlist = res.data;
    }).catch(err => {
      alert(err);
    });

    // 현재 게시판 글 개수 가져오기
    axios({
      url: "http://127.0.0.1:52273/content/boardlistcnt/",
      method: "POST",
      data: {
        boardnum: this.$route.params.id,
      },
    }).then(res => {
      this.cnt = res.data;
    }).catch(err => {
      alert(err);
    });
  },
  methods: {
    movetomain() {
      window.location.href = "/";
    },
    movetowrite() {
      // window.location.pathname (현재 주소) + 'write' => 글 작성 페이지로 라우팅됨
      window.location.href = window.location.pathname + 'write';
    },
    movetocontent(id) { // 클릭된 글의 id를 받아와야 라우팅할 때 보낼 수 있음
      window.location.href = window.location.pathname + 'content?id=' + id;
    },
    movetopreviouspage() {
      if(this.$route.query.page == 1) {
        alert('첫번째 페이지입니다!');
      } else {
        var pp = parseInt(this.$route.query.page) - 1;
        window.location.href = window.location.pathname + '?page=' + pp;
      }
    },
    movetonextpage() {
      if(this.$route.query.page == Math.ceil(this.cnt / 10)) {
        alert('마지막 페이지입니다!');
      } else {
        var pp = parseInt(this.$route.query.page) + 1;
        window.location.href = window.location.pathname + '?page=' + pp;
      }
    }
  }
}
</script>

<style scoped>
tr, td {
  border: 1px solid #333;
  text-align: center;
}

td {
  padding: 0.8rem 0.5rem;
}
</style>