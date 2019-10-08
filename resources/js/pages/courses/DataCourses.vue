<template>
  <div class="col-md-12">
    <div class="panel">
      <div class="panel-heading">
        <router-link :to="{ name: 'course.add' }" class="btn btn-primary btn-sm btn-flat">Tambah</router-link>
        <button class="btn btn-danger btn-sm btn-flat" v-if="courses.data && courses.data.length > 0" @click="hapusAll">Hapus Semua</button>
        <div class="pull-right">
          <input type="text" class="form-control" placeholder="Cari..." v-model="search" />
        </div>
      </div>

      <div class="panel-body">
        <div class="table-responsive">
          <b-table striped hover bordered :items="courses.data" :fields="fields" show-empty>
            <template v-slot:cell(idNya)="row">
              <td class="parent-row">{{ row.item.id }}</td>
            </template>
            <template v-slot:cell(name)="row">
              <td class="parent-row">{{ row.item.name }}</td>
            </template>
            <template v-slot:cell(status)="row">
              <a class="btn btn-success btn-flat disabled" v-if="row.item.status == 1">Aktif</a>
              <a class="btn btn-default btn-flat disabled" v-else>NonAktif</a>
            </template>
            <template v-slot:cell(created_at)="row">
              <td class="parent-row">{{ row.item.created_at | moment("D MMMM YYYY") }}</td>
            </template>
            <template v-slot:cell(action)="row">
              <router-link
                :to="{ name: 'course.edit', params: {id: row.item.id} }"
                class="btn btn-warning btn-sm"
              >
                <i class="fa fa-pencil"></i>
              </router-link>
              <button @click="deleteCourse(row.item.id)" class="btn btn-danger btn-sm">
                <i class="fa fa-trash"></i>
              </button>
            </template>
          </b-table>

          <div class="row">
            <div class="col-md-6">
              <p v-if="courses.data">
                <i class="fa fa-bars"></i>
                {{ courses.data.length }} item dari {{ courses.meta.total }} total matakuliah
              </p>
            </div>
            <div class="col-md-6">
              <div class="pull-right">
                <b-pagination
                  v-model="page"
                  :total-rows="courses.meta.total"
                  :per-page="courses.meta.per_page"
                  aria-controls="courses"
                  v-if="courses.data && courses.data.length > 0"
                ></b-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "DataCourses",
  methods: {
    ...mapActions("courses", ["getCourses", "dropCourse","dropAllCourse"]),
    deleteCourse(id) {
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
          this.dropCourse(id).then(() => {
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: "success",
              title: "Berhasil hapus"
            });
            this.getCourses();
          });
        }
      });
    },
    hapusAll(){
      this.$swal({
        title: "Yakin dihapus semua?",
        text: "Apabila terhapus tidak dapat dikembalikan seperti mantan!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya Hapus semua!",
        cancelButtonText: "Tidak"
      }).then(result => {
        if (result.value) {
          this.dropAllCourse().then(() => {
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: "success",
              title: "Berhasil hapus semua"
            });
            this.getCourses();
          });
        }
      });
    }
  },
  created() {
    this.getCourses();
  },
  data() {
    return {
      fields: [
        { key: "idNya", label: "ID" },
        { key: "name", label: "Matakuliah" },
        { key: "status", label: "Status" },
        { key: "created_at", label: "Dibuat" },
        { key: "action", label: "Lanjutan" }
      ],
      search: ""
    };
  },
  computed: {
    ...mapState("courses", {
      courses: state => state.courses
    }),
    page: {
      get() {
        return this.$store.state.courses.page;
      },
      set(val) {
        this.$store.commit("courses/SET_PAGE", val);
      }
    }
  },
  watch: {
    page() {
      this.getCourses();
    },
    search(){
      this.getCourses(this.search)
    }
  }
};
</script>

<style>
</style>