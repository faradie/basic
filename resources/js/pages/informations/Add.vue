<template>
  <div class="col-md-12">
    <div class="box">
      <add-info-form></add-info-form>
    </div>
    <div class="form-group">
      <button class="btn btn-primary btn-block btn-sm btn-flat" @click.prevent="addInformation">
        <i class="fa fa-save"></i> Tambah
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import FormInfo from "../informations/Form.vue";
export default {
  name: "AddInformation",
  components: {
    "add-info-form": FormInfo
  },

  methods: {
    ...mapActions('informations',['addInformationsData']),
    addInformation(){
      this.addInformationsData().then(()=>{
        this.$router.push({ name: 'informations.data' })
         const Toast = this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "success",
            title: "Berhasil tambah informasi!"
          });
      })
    }
  },
};
</script>

<style>
</style>