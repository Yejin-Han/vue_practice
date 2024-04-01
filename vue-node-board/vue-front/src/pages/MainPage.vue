<template>
  <v-app>
    <v-app-bar app color="red" dark>
      <v-app-bar-title style="margin-inline-start: 0;">
        <div :style="{textAlign: 'center', fontSize:'xx-large'}">메인화면</div>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row align="center" :style="{justifyContent: 'center'}">
          <v-col cols="12" md="2" align="center">
            <v-btn color="light-green" @click="movetoboard1"
                   :style="{height:'50px', width:'170px', fontWeight:'bold', fontSize:'large'}">게시판1</v-btn>
          </v-col>
          <v-col cols="12" md="2" align="center">
            <v-btn color="yellow" @click="movetoboard2"
                   :style="{height:'50px', width:'170px', fontWeight:'bold', fontSize:'large'}">게시판2</v-btn>
          </v-col>
          <v-col cols="12" md="2" align="center">
            <v-btn color="orange" type="submit" @click="movetoboard3"
                   :style="{height:'50px', width:'170px', fontWeight:'bold', fontSize:'large'}">게시판3</v-btn>
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

<style>
/* .v-toolbar__content > .v-toolbar-title {
  margin-inline-start: 0 !important;
} */
</style>