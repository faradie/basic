<template>
  <div class="col-md-12">
    <div class="panel">
      <div class="panel-heading">
        <h3>Tambah Kelas</h3>
      </div>
      <div class="panel-body">
        <class-form></class-form>
        <div class="form-group">
          <button class="btn btn-primary btn-block btn-sm btn-flat" @click.prevent="addClass">
            <i class="fa fa-save" ></i> Tambah
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FormClass from "../classes/Form.vue";
export default {
  name: "AddClasses",
  data() {
    return {};
  },
  components: {
    "class-form": FormClass
  },
  methods: {
    ...mapActions('classes',['addClasses']),
    addClass(){
      this.addClasses().then(()=>{
         this.$router.push({ name: 'classes.data' })
         const Toast = this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "success",
            title: "Berhasil tambah kelas!"
          });
      })
    }
  },
  
};
</script>

<style>
</style>