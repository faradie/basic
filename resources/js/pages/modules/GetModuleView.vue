<template>
  <div>
    <section class="content-header">
      <h1>Materi</h1>
      <breadcrumb></breadcrumb>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="panel">
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
                <div v-if="modules[choosenID] == null" class="modal-body">
                  <h3>Tidak ada materi terbaru</h3>
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
                      <h3 class="box-title">{{ row.title.toUpperCase() }}</h3>
                      <div class="box-tools pull-right">
                        <button
                          data-toggle="modal"
                          data-target="#modules-modal"
                          @click.prevent="downloadFile(row.id)"
                          type="button"
                          class="btn btn-box-tool"
                        >Download</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Breadcrumb from "../../components/Breadcrumb.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "getModules",
  components: {
    breadcrumb: Breadcrumb
  },
  data() {
    return {
      choosen: "",
      choosenID: ""
    };
  },
  methods: {
    ...mapActions("modules", ["getAllModules", "getFile"]),
    ...mapActions("courses", ["getCourses"]),
    getModulesID(id, name) {
      this.choosenID = id;
      this.choosen = name;
    },
    downloadFile(val) {
      this.getFile(val).then(() => {});
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