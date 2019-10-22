<template>
  <div class="col-md-12">
    <div class="box box-primary direct-chat direct-chat-primary">
      <div class="box-header with-border">
        <router-link
          :to="{ name: 'informations.add' }"
          class="btn btn-primary btn-sm btn-flat"
        >Tambah</router-link>
        <button
          @click.prevent="deleteAllInformations"
          class="btn btn-danger btn-sm btn-flat"
        >Hapus Semua</button>
        <div class="pull-right">
          <input type="text" class="form-control" placeholder="Cari dengan judul" v-model="search" />
        </div>
      </div>
      <div class="panel">
        <div class="panel-body">
          <div class="table-responsive">
            <b-table striped hover bordered :items="informations.data" :fields="fields" show-empty>
              <template v-slot:cell(title)="row">
                <td class="parent-row">{{ row.item.title }}</td>
              </template>
              <template v-slot:cell(categorys)="row">
                <td class="parent-row">{{ row.item.category.title }}</td>
              </template>
              <template v-slot:cell(createdBy)="row">
                <td class="parent-row">{{ row.item.user.name }}</td>
              </template>
              <template v-slot:cell(createdAt)="row">
                <td class="parent-row">{{ row.item.created_at | moment("D MMMM YYYY")}}</td>
              </template>
              <template v-slot:cell(actions)="row">
                <router-link
                  :to="{ name: 'informations.edit', params: {id: row.item.id} }"
                  class="btn btn-warning btn-sm"
                >
                  <i class="fa fa-pencil"></i>
                </router-link>
                <button @click="deleteInformation(row.item.id)" class="btn btn-danger btn-sm">
                  <i class="fa fa-trash"></i>
                </button>
              </template>
            </b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      search: "",
      fields: [
        { key: "title", label: "Judul" },
        { key: "categorys", label: "Kategori" },
        { key: "createdBy", label: "Oleh" },
        { key: "createdAt", label: "Dibuat" },
        { key: "actions", label: "Lanjutan" }
      ]
    };
  },
  computed: {
    ...mapState("informations", {
      informations: state => state.informations
    })
  },
  created() {
    this.getInformations();
  },
  methods: {
    ...mapActions("informations", [
      "getInformations",
      "dropInformation",
      "deleteAllInfo"
    ]),
    deleteAllInformations() {
      this.$swal({
        title: "Yakin dihapus?",
        text: "Apabila terhapus tidak dapat dikembalikan seperti mantan!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya Hapus!",
        cancelButtonText: "Tidak"
      }).then(result => {
        if (result.value) {
          this.deleteAllInfo().then(() => {
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: "success",
              title: "Berhasil hapus semua informasi!"
            });
            this.getInformations();
          });
        }
      });
    },
    deleteInformation(id) {
      this.$swal({
        title: "Yakin dihapus?",
        text: "Apabila terhapus tidak dapat dikembalikan seperti mantan!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya Hapus!",
        cancelButtonText: "Tidak"
      }).then(result => {
        if (result.value) {
          this.dropInformation(id).then(() => {
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: "success",
              title: "Berhasil hapus informasi!"
            });
            this.getInformations();
          });
        }
      });
    }
  }
};
</script>

<style>
</style>