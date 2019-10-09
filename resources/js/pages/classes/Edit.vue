<template>
  <div class="col-md-12">
    <div class="panel">
      <div class="panel-heading">
        <h3>Tambah Kelas</h3>
      </div>
      <div class="panel-body">
        <class-form></class-form>
        <div class="form-group">
          <button class="btn btn-primary btn-block btn-sm btn-flat" @click.prevent="EditClass">
            <i class="fa fa-save"></i> Edit
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
  name: "EditClasses",
  data() {
    return {};
  },
  methods: {
    ...mapActions("classes", ["editClass","updateClass"]),
    EditClass() {
      this.updateClass(this.$route.params.id).then(() => {
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: "success",
          title: "Berhasil edit kelas!"
        });
        this.$router.push({ name: "classes.data" });
      });
    }
  },
  created() {
    this.editClass(this.$route.params.id);
  },
  components: {
    "class-form": FormClass
  }
};
</script>

<style>
</style>