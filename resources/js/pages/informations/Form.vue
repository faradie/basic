<template>
  <div>
    <div class="box-header">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group" :class="{ 'has-error': errors.title }">
            <label for>Judul</label>
            <input placeholder="Isikan judul..." type="text" class="form-control" v-model="information.title" />
            <p class="text-danger" v-if="errors.title">{{ errors.title[0] }}</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for>Kategori</label>
            <select
              class="form-control"
              :class="{ 'has-error': errors.lecture_id }"
              v-model="information.category_id"
            >
              <option value>Pilih</option>
              <option
                v-for="row in categories.data"
                :value="row.id"
                :key="row.id"
              >{{ row.title.charAt(0).toUpperCase() + row.title.slice(1) }}</option>
            </select>
            <p class="text-danger" v-if="errors.category_id">{{ errors.category_id[0] }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="box-body">
      <div id="app">
        <vue-editor placeholder="Isikan informasi" v-model="information.content"></vue-editor>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapState, mapActions } from "vuex";
export default {
  name: "FormInformations",
  data() {
    return {
      
    };
  },

  created() {
    this.getCategories();
    this.information.user_id = this.user.id
  },
  computed: {
    ...mapState(["errors"]),
    ...mapState("informations", {
      categories: state => state.categories,
      information: state => state.information
    }),
    ...mapState('auth', {
      user: state => state.user
    }),
  },
  components: {
    VueEditor
  },
  methods: {
    ...mapActions("informations", ["getCategories"])
  }
};
</script>

<style>
</style>