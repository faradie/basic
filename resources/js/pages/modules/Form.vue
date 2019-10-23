<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for>Matakuliah</label>
          <select
            class="form-control"
            :class="{ 'has-error': errors.lecture_id }"
            v-model="module_materi.course_id"
          >
            <option value>Pilih</option>
            <option
              v-for="row in courses.data"
              :value="row.id"
              :key="row.id"
            >{{ row.name.charAt(0).toUpperCase() + row.name.slice(1) }}</option>
          </select>
          <p class="text-danger" v-if="errors.category_id">{{ errors.category_id[0] }}</p>
        </div>
      </div>
      <div class="col-md-6">
        <label for>Pilih File</label>
        <input
          type="file"
          accept="file_extension|audio/*|video/*|image/*|media_type"
          @change="uploadFile($event)"
          id="file-input"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="form-group" :class="{ 'has-error': errors.title }">
          <label for>Nama file baru</label>
          <input
            placeholder="Tidak wajib..."
            type="text"
            class="form-control"
            v-model="module_materi.title"
          />
          <p class="text-danger" v-if="errors.title">{{ errors.title[0] }}</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="form-group" :class="{ 'has-error': errors.title }">
          <label for>Deskripsi</label>
          <input
            placeholder="Tidak wajib..."
            type="text"
            class="form-control"
            v-model="module_materi.description"
          />
          <p class="text-danger" v-if="errors.title">{{ errors.title[0] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ModuleForm",
  data() {
    return {
      module_materi: {
        id: "",
        title: "",
        description: "",
        file: "",
        course_id: "",
        user_id: ""
      }
    };
  },
  methods: {
    ...mapActions("courses", ["getCourses"]),
    ...mapActions("modules", ["submitAdd"]),
    uploadFile(event) {
      this.module_materi.file = event.target.files[0];
    },
    submitFormModule() {
      let form = new FormData();
      form.append("id", this.module_materi.id);
      form.append("title", this.module_materi.title);
      form.append("description", this.module_materi.description);
      form.append("file", this.module_materi.file);
      form.append("course_id", this.module_materi.course_id);
      form.append("user_id", this.module_materi.user_id);

      if (this.$route.name == "modules.add") {
        this.submitAdd(form).then(() => {
          this.module_materi = {
            id: "",
            title: "",
            description: "",
            file: "",
            course_id: "",
            user_id: ""
          };
          this.$router.push({ name: 'modules.data' })
        });
      }
    }
  },
  created() {
    this.module_materi.user_id = this.user.id;
    this.getCourses();
    if (this.$route.name == "modules.edit") {
      this.editModules(this.$route.params.id).then(response => {
        this.module_materi = {
          id: response.data.id,
          description: response.data.description,
          file: "",
          course_id: response.data.course_id,
          user_id: response.data.user_id
        };
      });
    }
  },
  computed: {
    ...mapState(["errors"]),
    ...mapState("courses", {
      courses: state => state.courses
    }),
    ...mapState("auth", {
      user: state => state.user
    })
  }
};
</script>

<style>
</style>