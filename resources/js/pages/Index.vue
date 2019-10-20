<template>
  <div class="container">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Selamat Datang
        <small>di Laboratorium Dasar</small>
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li :class="{ 'active' : index==0 }" v-for="(row, index) in fields" :key="`tab_${index}`">
            <a
              :href="'#'+row.link"
              data-toggle="tab"
            >{{ row.label.charAt(0).toUpperCase() + row.label.slice(1) }}</a>
          </li>

          <li class="pull-right">
            <a href="#" class="text-muted">Jadwal Laboratorium</a>
          </li>
        </ul>
        <div class="tab-content">
          <div
            v-for="(row,index) in fields"
            :key="`tab_${index+1}`"
            class="tab-pane"
            :class="{ 'active': index == 0 }"
            :id="`tab_${index+1}`"
          >
            <div class="table-responsive">
              <b-table
                striped
                hover
                bordered
                :v-bind="row.key"
                :items="schedule[row.label]"
                :fields="fields_table"
                show-empty
              >
                <template v-slot:cell(time)="tabs">
                  <td class="parent-row">{{ tabs.item.start_time }}-{{ tabs.item.end_time }}</td>
                </template>
                <template v-slot:cell(courseID)="tabs">
                  <td class="parent-row">{{ tabs.item.course_id }}</td>
                </template>
                <template v-slot:cell(course)="tabs">
                  <td class="parent-row">{{ tabs.item.course.name }}</td>
                </template>
                <template v-slot:cell(class)="tabs">
                  <td class="parent-row">{{ tabs.item.attrib }}</td>
                </template>
                <template v-slot:cell(lectur)="tabs">
                  <td class="parent-row">{{ tabs.item.lecture.name }}</td>
                </template>
              </b-table>
            </div>
          </div>
        </div>
        <!-- /.tab-content -->
      </div>
      <!-- Info boxes -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Index",
  data() {
    return {
      fields: [
        { key: "1", label: "senin", link: "tab_1" },
        { key: "2", label: "selasa", link: "tab_2" },
        { key: "3", label: "rabu", link: "tab_3" },
        { key: "4", label: "kamis", link: "tab_4" },
        { key: "5", label: "jumat", link: "tab_5" },
        { key: "6", label: "sabtu", link: "tab_6" }
      ],
      fields_table: [
        { key: "time", label: "Jam" },
        { key: "courseID", label: "Kode Matakuliah" },
        { key: "course", label: "Matakuliah" },
        { key: "class", label: "Kelas" },
        { key: "lectur", label: "Dosen" }
      ]
    };
  },
  methods: {
    ...mapActions("classes", ["getSchedule"])
  },
  created() {
    this.getSchedule();
  },
  computed: {
    ...mapState("classes", {
      schedule: state => state.schedule
    })
  }
};
</script>

<style>
</style>