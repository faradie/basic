<template>
  <div class="col">
    <!-- <div class="col-sm-12">
      <div class="form-group">
        <label for>Waktu Kontrak</label>
        <div class="row">
          <VueCtkDateTimePicker placeholder="Waktu Kontrak" v-model="timeContract" />
          <p class="text-danger" v-if="errors.timeContract">{{ errors.role_id[0] }}</p>
        </div>
      </div>
    </div> -->
    <div class="row">
       <div class="col-sm-6">
        <div class="form-group">
          <label for>Matakuliah</label>
          <select class="form-control" :class="{ 'has-error': errors.course_id }" v-model="classField.course_id">
            <option value>Pilih</option>
            <option
              v-for="row in courses"
              :value="row.id"
              :key="row.id"
            >{{ row.name.charAt(0).toUpperCase() + row.name.slice(1) }}</option>
          </select>
          <p class="text-danger" v-if="errors.course_id">{{ errors.course_id[0] }}</p>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label for>Dosen</label>
          <select class="form-control" :class="{ 'has-error': errors.lecture_id }" v-model="classField.lecture_id">
            <option value>Pilih</option>
            <option
              v-for="row in lectures"
              :value="row.id"
              :key="row.id"
            >{{ row.name.charAt(0).toUpperCase() + row.name.slice(1) }}</option>
          </select>
          <p class="text-danger" v-if="errors.lecture_id">{{ errors.lecture_id[0] }}</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label for>Hari</label>
          <select class="form-control" :class="{ 'has-error': errors.day }" v-model="classField.day">
            <option value>Pilih</option>
            <option
              v-for="row in optionsDays"
              :value="row.value"
              :key="row.value"
            >{{ row.text.charAt(0).toUpperCase() + row.text.slice(1) }}</option>
          </select>
          <p class="text-danger" v-if="errors.day">{{ errors.day[0] }}</p>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group" :class="{ 'has-error': errors.attrib }">
          <label for>Kelas</label>
          <input
            placeholder="A, B, C ..."
            type="text"
            class="form-control"
            v-model="classField.attrib"
            :readonly="$route.name == 'course.edit'"
          />
          <p class="text-danger" v-if="errors.attrib">{{ errors.attrib[0] }}</p>
        </div>
      </div>
    </div>

    <div class="i-am-centered">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <div class="row">
              <vue-timepicker  v-model="classField.start_time" placeholder="Waktu Mulai"></vue-timepicker>
              <p class="text-danger" v-if="errors.start_time">{{ errors.start_time[0] }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <div class="row">
              <vue-timepicker v-model="classField.end_time" placeholder="Waktu Selesai"></vue-timepicker>
              <p class="text-danger" v-if="errors.end_time">{{ errors.end_time[0] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import VueTimepicker from "vue2-timepicker";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
export default {
  name: "FormClass",
  data() {
    return {
      optionsDays: [
        { value: "senin", text: "Senin" },
        { value: "selasa", text: "Selasa" },
        { value: "rabu", text: "Rabu" },
        { value: "kamis", text: "Kamis" },
        { value: "jumat", text: "Jumat" },
        { value: "sabtu", text: "Sabtu" }
      ]
    };
  },
  components: { VueTimepicker, VueCtkDateTimePicker },
  methods: {
    ...mapActions("classes", ["getCoursesAndLectures"]),
     ...mapMutations("classes", ["CLEAR_FORM_CLASS"])
  },
  created() {
    this.getCoursesAndLectures();
  },
  computed: {
    ...mapState(["errors"]),
    ...mapState("classes", {
      courses: state => state.courses,
      lectures: state => state.lectures,
      classField: state=>state.classField
    })
  },
  destroyed() {
    this.CLEAR_FORM_CLASS();
  }
};
</script>

<style>
.i-am-centered {
  margin: auto;
  max-width: 300px;
}
</style>