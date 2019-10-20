<template>
  <div class="container">
    <section class="content-header">
      <h1>Detail Informasi {{ indexInfo.title }}</h1>
      <small>{{ indexInfo.created_at | moment("D MMMM YYYY") }}</small>
      <small class="badge badge-secondary">{{ indexInfo.category }}</small>
    </section>
    <section class="content">
      <div class="box box-primary direct-chat direct-chat-primary">
        <div class="box-header with-border">Ditulis oleh : {{ indexInfo.writer }}</div>
        <div class="panel-body">
          <p v-html="indexInfo.content"></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "InfoDetail",
  created() {
    this.infoDetailIndex(this.$route.params.id);
  },
  methods: {
    ...mapActions("informations", ["infoDetailIndex"])
  },
  computed: {
    ...mapState("informations", {
      indexInfo: state => state.indexInfo
    })
  }
};
</script>

<style>
</style>