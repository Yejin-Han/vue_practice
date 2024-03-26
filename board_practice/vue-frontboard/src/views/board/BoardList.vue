<template>
  <div class="board-list">
    <div class="common-buttons">
      <button type="button" class="c-button c-round c-blue-grey" v-on:click="fnWrite">등록</button>
    </div>
    <table class="c-table c-table-all">
      <thead>
        <tr>
          <th>No.</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in list" :key="idx">
          <td>{{ row.idx }}</td>
          <td><a v-on:click="fnView(`${row.idx}`)">{{ row.title }}</a></td>
          <td>{{ row.author }}</td>
          <td>{{ row.created_at }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination c-bar c-padding-16 c-small" v-if="paging.total_list_cnt > 0">
      <span class="pg">
        <a href="javascript:;" @click="fnPage(1)">&lt;&lt;</a>
        <a href="javascript:;" v-if="paging.start_page > 10" @click="fnPage(`${paging.start_page - 1}`)" class="prev c-button c-border">&lt;</a>
        <template v-for="(n, idx) in paginavigation()"> <!-- 콘텐츠 조각을 나중에 사용하기 위해 담아놓는 컨테이너 -->
          <template v-if="paging.page == n">
            <strong class="c-button c-border c-green" :key="idx">{{ n }}</strong>
          </template>
          <template v-else>
            <a href="javascript:;" class="c-button c-border" @click="fnPage(`${n}`)" :key="idx">{{ n }}</a>
          </template>
        </template>
        <a href="javascript:;" v-if="paging.total_page_cnt > paging.end_page" @click="fnPage(`${paging.end_page + 1}`)" class="last c-button c-border">&gt;&gt;</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() { // 변수 생성
    return {
      requestBody: {}, // 리스트 페이지 데이터 전송
      list: {}, // 리스트 데이터
      no: '', // 게시판 숫자처리
      paging: {
        block: 0,
        end_page: 0,
        next_block: 0,
        page: 0,
        page_size: 0,
        prev_block: 0,
        start_index: 0,
        start_page: 0,
        total_block_cnt: 0,
        total_list_cnt: 0,
        total_page_cnt: 0,
      }, // 페이징 데이터
      page: this.$route.query.page ? this.$route.query.page : 1,
      size: this.$route.query.size ? this.$route.query.size : 10,
      keyword: this.$route.query.keyword,
      paginavigation: function () {
        let pageNumber = [];
        let start_page = this.paging.start_page;
        let end_page = this.paging.end_page;
        for(let i = start_page; i <= end_page; i++) pageNumber.push(i);

        return pageNumber;
      }
    }
  },
  mounted() {
    this.fnGetList()
  },
  methods: {
    fnGetList() {
      this.list = [
        {
          "idx": 1,
          "title": "제목1",
          "author": "작성자1",
          "created_at": "작성일시1",
        },
        {
          "idx": 1,
          "title": "제목1",
          "author": "작성자1",
          "created_at": "작성일시1",
        },
        {
          "idx": 1,
          "title": "제목1",
          "author": "작성자1",
          "created_at": "작성일시1",
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>