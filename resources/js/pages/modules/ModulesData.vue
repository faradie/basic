<template>
  <div class="col-md-12">
    <div class="panel">
      <div class="panel-heading">
        <router-link :to="{ name: 'modules.add' }" class="btn btn-primary btn-sm btn-flat">Tambah</router-link>
        <button class="btn btn-danger btn-sm btn-flat">Hapus Semua</button>
      </div>
      <div class="panel-body">
        <div v-if="courses.data < 1" class="row">
          <div class="col-md-12">
            <h4>Belum ada data matakuliah</h4>
          </div>
        </div>
        <div
          v-for="row in courses.data"
          :value="row.id"
          :key="row.id"
          class="box box-default collapsed-box box-solid"
        >
          <div class="box-header with-border">
            <h3 class="box-title">{{ row.name.toUpperCase() }}</h3>
            <div v-if="row.status == true" class="box-tools pull-right">
              <button
                @click="getModulesID(row.id,row.name)"
                data-toggle="modal"
                data-target="#modules-modal"
                type="button"
                class="btn btn-box-tool"
              >Lanjutan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modules-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">MATERI {{ choosen.toUpperCase() }}</h4>
          </div>
          <div class="modal-body">
            <div
              v-for="row in modules[choosenID]"
              :value="row.id"
              :key="row.id"
              class="box box-default collapsed-box box-solid"
            >
              <div class="box-header with-border">
                <button
                  type="button"
                  @click.prevent="downloadFile(row.id)"
                  class="btn btn-box-tool"
                >
                  <i class="fa fa-download"></i>
                </button>
                <h3 class="box-title">{{ row.file.toUpperCase() }}</h3>
                <div class="box-tools pull-right">
                  <button
                    data-toggle="modal"
                    data-target="#modules-modal"
                    @click.prevent="deleteModule(row.id)"
                    type="button"
                    class="btn btn-box-tool"
                  >Hapus</button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button> -->
            <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ModulesData",
  data() {
    return {
      choosen: "",
      choosenID: "",
      tabs: [
        { value: 1, text: "Pretest" },
        { value: 2, text: "Laporan" },
        { value: 3, text: "Tugas" },
        { value: 4, text: "Ujian" },
        { value: 5, text: "Materi" }
      ]
    };
  },
  methods: {
    ...mapActions("courses", ["getCourses"]),
    ...mapActions("modules", [
      "getAllModules",
      "getFile",
      "deleteIndividualModule"
    ]),
    getModulesID(id, name) {
      this.choosenID = id;
      this.choosen = name;
    },
    downloadFile(val) {
      this.getFile(val).then(() => {});
    },
    deleteModule(val) {
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
          this.deleteIndividualModule(val).then(() => {
            this.getAllModules();
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: "success",
              title: "Berhasil hapus materi!"
            });
          });
        }
      });
    }
  },
  computed: {
    ...mapState("courses", {
      courses: state => state.courses
    }),
    ...mapState("modules", {
      modules: state => state.modules
    })
  },
  created() {
    this.getAllModules();
    this.getCourses();
  }
};
</script>

<style>
</style>