<template>
  <div class="col-md-12">
    <div class="panel">
      <div class="panel-heading">
        <h3>Tambah Kelas</h3>
      </div>
      <div class="panel-body">
        <class-form></class-form>
        <div class="form-group">
          <button class="btn btn-primary btn-sm btn-flat">
            <i class="fa fa-save"></i> Tambah
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FormClass from "../classes/Form.vue";
export default {
  name: "AddClasses",
  data() {
    return {};
  },
  components: {
    "class-form": FormClass
  }
};
</script>

<style>
</style>