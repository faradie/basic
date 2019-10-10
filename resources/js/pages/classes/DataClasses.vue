<template>
  <div class="col-md-12">
    <div class="panel">
      <div class="panel-heading">
        <router-link :to="{ name:'classes.add' }" class="btn btn-primary btn-sm btn-flat">Tambah</router-link>
        <button @click="dropAllClasses" class="btn btn-danger btn-sm btn-flat">Hapus Semua</button>
        <div class="pull-right">
          <input type="text" class="form-control" placeholder="Cari..." v-model="search" />
        </div>
      </div>
      <div class="panel-body">
        <div class="table-responsive">
          <b-table striped hover bordered :items="classes.data" :fields="fields" show-empty>
            <template v-slot:cell(mk)="row">
              <td class="parent-row">{{ row.item.course.name }}</td>
            </template>
            <template v-slot:cell(class)="row">
              <td class="parent-row">{{ row.item.attrib }}</td>
            </template>
            <template v-slot:cell(day)="row">
              <td class="parent-row">{{ row.item.day }}</td>
            </template>
            <template v-slot:cell(session)="row">
              <td class="parent-row">{{ row.item.start_time }} - {{ row.item.end_time }}</td>
            </template>
            <template v-slot:cell(lectur)="row">
              <td class="parent-row">{{ row.item.lecture.name }}</td>
            </template>
            <template v-slot:cell(action)="row">
              <router-link
                @click="dropClass(row.item.id)"
                class="btn btn-warning btn-sm"
              >
                <i class="fa fa-pencil"></i>
              </router-link>
              <button @click="dropClass(row.item.id)" class="btn btn-danger btn-sm">
                <i class="fa fa-trash"></i>
              </button>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "DataClasses",
  methods: {
    ...mapActions("classes", ["getClass", "deleteClass","deleteAllClasses"]),
    dropClass(val) {
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
          this.deleteClass(val).then(() => {
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: "success",
              title: "Berhasil hapus kelas!"
            });
            this.getClass();
          });
        }
      });
    },
    dropAllClasses(){
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
          this.deleteAllClasses().then(() => {
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: "success",
              title: "Berhasil hapus kelas!"
            });
            this.getClass();
          });
        }
      });
    }
  },
  created() {
    this.getClass();
  },
  computed: {
    ...mapState("classes", {
      classes: state => state.classes
    })
  },
  data() {
    return {
      fields: [
        { key: "mk", label: "Matakuliah" },
        { key: "class", label: "Kelas" },
        { key: "day", label: "Hari" },
        { key: "session", label: "Jam" },
        { key: "lectur", label: "Dosen" },
        { key: "action", label: "Lanjutan" }
      ],
      search: ""
    };
  }
};
</script>

<style>
</style>