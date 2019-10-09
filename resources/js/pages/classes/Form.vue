<template>
  <div>
    <div class="form-group">
      <label for>Matakuliah</label>
      <select class="form-control" v-model="courses">
        <option value>Pilih</option>
        <option
          v-for="row in courses"
          :value="row.id"
          @click="getName(row.name)"
          :key="row.id"
        >{{ row.name.charAt(0).toUpperCase() + row.name.slice(1) }}</option>
      </select>
      <p class="text-danger" v-if="errors.role_id">{{ errors.role_id[0] }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState(["errors"]),
        ...mapState('classes',['getCoursesAndLectures'])
    },
    created() {
        this.getCoursesAndLectures();
    },
};
</script>

<style>
</style>