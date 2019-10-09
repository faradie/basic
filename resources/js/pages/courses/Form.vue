<template>
  <div>
    <div class="form-group" :class="{ 'has-error': errors.id }">
      <label for>ID Matakuliah</label>
      <input
        placeholder="Isikan id..."
        type="text"
        class="form-control"
        v-model="course.id"
        :readonly="$route.name == 'course.edit'"
      />
      <p class="text-danger" v-if="errors.id">{{ errors.id[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.name }">
      <label for>Nama Matakuliah</label>
      <input placeholder="Nama matakuliah" type="text" class="form-control" v-model="course.name" />
      <p class="text-danger" v-if="errors.name">{{ errors.name[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.description }">
      <label>Deskripsi</label>
      <textarea class="form-control" rows="3" v-model="course.description" placeholder="Isikan ..."></textarea>
      <p class="text-danger" v-if="errors.description">{{ errors.description[0] }}</p>
    </div>
    <div class="form-group">
      <input type="checkbox" v-model="course.status" />
      <label for>{{ course.status == true ? "Aktif" : "Tidak aktif" }}</label>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "FormCourse",
  computed: {
    ...mapState(["errors"]),
    ...mapState("courses", {
      course: state => state.course
    })
  },
  methods: {
    ...mapMutations("courses", ["CLEAR_FORM_COURSE"])
  },
  destroyed() {
    this.CLEAR_FORM_COURSE();
  }
};
</script>

<style>
</style>