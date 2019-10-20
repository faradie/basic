<template>
  <div class="col-md-12">
    <div class="box">
      <add-info-form></add-info-form>
    </div>
    <div class="form-group">
      <button class="btn btn-primary btn-block btn-sm btn-flat" @click.prevent="updateInformation">
        <i class="fa fa-save"></i> Edit
      </button>
    </div>
  </div>
</template>

<script>
import FormInfo from "../informations/Form.vue";
import { mapActions } from "vuex";
export default {
  name: "EditInformation",
  components: {
    "add-info-form": FormInfo
  },
  created() {
    this.editInformation(this.$route.params.id);
  },
  methods: {
    ...mapActions("informations", ["editInformation","updateInformationData"]),
    updateInformation() {
      this.updateInformationData(this.$route.params.id).then(() => {
        this.$router.push({ name: "informations.data" });
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: "success",
          title: "Berhasil edit informasi!"
        });
      });
    }
  }
};
</script>

<style>
</style>