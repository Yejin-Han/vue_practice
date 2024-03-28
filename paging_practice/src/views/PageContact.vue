<template>
  <section id="contact">
    <h2 class="rozha-one-regular font-bold text-6xl text-center mt-4 mb-10">Contact List</h2>
    <LoadingIndicator v-if="isLoading" />
    <ContactTable v-else :list-array="pageArray" />
  </section>
</template>

<script>
import axios from 'axios';
import ContactTable from '@/components/ContactTable';
import LoadingIndicator from '@/components/LoadingIndicator';

export default {
  name: 'PageContact',
  components: {
    ContactTable,
    LoadingIndicator
  },
  data() {
    return {
      pageArray: [],
      isLoading: true,
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      await axios.get('https://sample.bmaster.kro.kr/contacts')
      .then(response => {
        this.pageArray = response.data.contacts.filter(contact => contact.name && contact.tel);
      })
      .catch(err => {
        console.log("An error occurred: ", err);
      })
      .finally(() => {
        this.isLoading = false;
      });
    }
  }
}
</script>