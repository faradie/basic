<template>
  <div class="col-md-12">
    <div class="panel">
      <div class="panel-heading">
        <router-link :to="{ name: 'courses.add' }" class="btn btn-primary btn-sm btn-flat">Tambah</router-link>
        <div class="pull-right">
          <input type="text" class="form-control" placeholder="Cari..." v-model="search" />
        </div>
      </div>

      <div class="panel-body">
        <div class="table-responsive">
          <b-table striped hover bordered :items="courses.data" :fields="fields" show-empty>
            <template v-slot:cell(idNya)="row">
              <td class="parent-row">{{ row.item.id }}</td>
            </template>
            <template v-slot:cell(name)="row">
              <td class="parent-row">{{ row.item.name }}</td>
            </template>
            <template v-slot:cell(description)="row">
              <td class="parent-row">{{ row.item.description }}</td>
            </template>
            <template v-slot:cell(created_at)="row">
              <td class="parent-row">{{ row.item.created_at | moment("D MMMM YYYY") }}</td>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "DataCourses",
  methods: {
    ...mapActions("courses", ["getCourses"])
  },
  created() {
    this.getCourses();
  },
  data() {
    return {
      fields: [
        { key: "idNya", label: "ID" },
        { key: "name", label: "Matakuliah" },
        { key: "description", label: "Deskripsi" },
        { key: "created_at", label: "Dibuat" }
      ],
      search: ""
    };
  },
  computed: {
    ...mapState("courses", {
      courses: state => state.courses
    })
  }
};
</script>

<style>
</style>