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
    </v-main>
  </v-app>
</template>

<script>
export default {
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
    }
  }
}
</script>