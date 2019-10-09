<template>
  <div class="col-md-12">
    <div class="panel">
      <div class="panel-heading">
        <h3>Edit Matakuliah</h3>
      </div>
      <div class="panel-body">
        <course-form></course-form>
        <div class="form-group">
          <button class="btn btn-primary btn-sm btn-flat" @click.prevent="EditCourse">
            <i class="fa fa-save"></i> Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FormCourse from "../courses/Form.vue";
export default {
  name: "EditCourse",
  methods: {
    ...mapActions("courses", ["editCourse", "updateCourse"]),
    EditCourse() {
      this.updateCourse(this.$route.params.id).then(() => {
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: "success",
          title: "Berhasil edit matakuliah!"
        });
        this.$router.push({ name: "courses.data" });
      });
    }
  },
  created() {
    this.editCourse(this.$route.params.id);
  },
  components: {
    "course-form": FormCourse
  }
};
</script>

<style>
</style>