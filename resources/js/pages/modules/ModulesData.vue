<template>
  <div class="col-md-12">
    <div class="panel">
      <div class="panel-heading">
        <router-link :to="{ name: 'modules.add' }" class="btn btn-primary btn-sm btn-flat">Tambah</router-link>
        <button class="btn btn-danger btn-sm btn-flat">Hapus Semua</button>
      </div>
      <div class="panel-body">
        <div
          v-for="row in courses.data"
          :value="row.id"
          :key="row.id"
          class="box box-default collapsed-box box-solid"
        >
          <div class="box-header with-border">
            <h3 class="box-title">{{ row.name }}</h3>
            <div v-if="row.status == true" class="box-tools pull-right">
              <button
                @click.prevent="getModulesID(row.id)"
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
            <h4 class="modal-title">Default Modal</h4>
          </div>
          <div class="modal-body">
            <p>One fine body&hellip;</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
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
      tabs:[
        { value: 1, text:'Pretest' },
        { value: 2, text:'Laporan' },
        { value: 3, text:'Tugas' },
        { value: 4, text:'Ujian' },
        { value: 5, text:'Materi' },
      ]
    }
  },
  methods: {
    ...mapActions("courses", ["getCourses"]),
    ...mapActions("modules", ["getModules"]),
    getModulesID(id){
      console.log(id)
    }
  },
  computed: {
    ...mapState("courses", {
      courses: state => state.courses
    })
  },
  created() {
    this.getCourses();
  }
};
</script>

<style>
</style>