<template>
  <div class="col">
    <div class="form-group">
      <label for>Judul</label>
      <input
        placeholder=""
        type="text"
        class="form-control"
        v-model="title"
      />
      <p class="text-danger" v-if="errors.attrib">{{ errors.attrib[0] }}</p>
    </div>
    <div class="row"></div>
  </div>
</template>

<script>
export default {
    name:'ModuleForm',
    data() {
        return {
            title:''
        }
    },
};
</script>

<style>
</style>