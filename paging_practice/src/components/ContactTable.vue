<template>
  <div class="innerbox">
    <table class="w-full text-center">
      <colgroup>
        <col style="width: 5%">
        <col style="width: 25%">
        <col style="width: 25%">
        <col style="width: 10%">
        <col style="width: 35%">
      </colgroup>
      <tr class="border-y border-neutral-200 border-t-2">
        <th class="px-4 py-4 bg-slate-200/[0.1] xl:py-3">No.</th>
        <th class="px-4 py-4 bg-slate-200/[0.1] xl:py-3">Name</th>
        <th class="px-4 py-4 bg-slate-200/[0.1] xl:py-3">Tel.</th>
        <th class="px-4 py-4 bg-slate-200/[0.1] xl:py-3">Address</th>
        <th class="px-4 py-4 bg-slate-200/[0.1] xl:py-3">Unique Code</th>
      </tr>
      <tr class="border-b border-neutral-200" v-for="(li, idx) in contactList" :key="idx">
        <td class="px-4 py-4 xl:py-3">{{ idx + 1 + this.pageNum * 10 }}</td>
        <td class="px-4 py-4 xl:py-3">{{ li.name }}</td>
        <td class="px-4 py-4 xl:py-3">{{ li.tel }}</td>
        <td class="px-4 py-4 xl:py-3">{{ li.address }}</td>
        <td class="px-4 py-4 text-left xl:py-3">{{ li.no }}</td>
      </tr>
    </table>
    <div class="pagination text-center mt-8">
      <button class="prev-btn arrow-btn" @click="prevPage" :disabled="pageNum <= 0">이전</button>
      <button class="page-btn" v-for="page in shownPages" :key="page" @click="goToPage(page)" :class="{ active: pageNum === page - 1 }" :disabled="pageNum === page - 1">
        <span>{{ page }}</span>
      </button>
      <button class="next-btn arrow-btn" @click="nextPage" :disabled="pageNum >= pageCount - 1">다음</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactTable',
  data() {
    return {
      pageNum: 0,
    }
  },
  props: {
    listArray: {
      type: Array,
      required: true
    },
    pageSize: {
      type: Number,
      required: false,
      default: 10
    }
  },
  methods: {
    nextPage() {
      if((this.pageNum + 1) % 5 === 0 && this.pageNum + 1 < this.pageCount) {
        this.pageNum += 1;
      } else if((this.pageNum + 1) % 5 !== 0) {
        this.pageNum += 1;
      }
    },
    prevPage() {
      if(this.pageNum % 5 === 0 && this.pageNum - 5 >= 0) {
        this.pageNum -= 1;
      } else {
        this.pageNum -= 1;
      }
    },
    goToPage(page) {
      this.pageNum = page - 1;
    }
  },
  computed: {
    pageCount() { // 총 페이지 수를 출력할 필요가 있을 때 사용, 지금은 필요 없어짐!
      let listLeng = this.listArray.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      
      if(listLeng % listSize > 0) page += 1;

      return page;
    },
    contactList() {
      const start = this.pageNum * this.pageSize,
            end = start + this.pageSize;
      
      return this.listArray.slice(start, end);
    },
    shownPages() {
      let startPage = Math.floor(this.pageNum / 5) * 5 + 1;

      let pages = [];
      for(let i = startPage; i < startPage + 5 && i <= this.pageCount; i++) {
        pages.push(i);
      }

      return pages;
    }
  }
}
</script>