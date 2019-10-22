<template>
 <!-- class="container" -->
  <div>
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
      <div class="row">
        <div class="col-md-12">
          <h3>Informasi</h3>
          <div class="mb-2">
            <input
              type="text"
              class="form-control"
              @keyup.enter="submit"
              placeholder="Cari Informasi"
              v-model="search"
            />
          </div>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-12" v-for="row in informations.data" :value="row.id" :key="row.id">
          <div class="box box-success">
            <div class="box-header with-border">
              <router-link
                :to="{ name:'infoIndex.detail', params:{id: row.id} }"
              >
                <h3 class="box-title">{{ row.title }}</h3>
              </router-link>
              <br />
              <small>{{ row.created_at | moment("D MMMM YYYY") }}</small>
              <small class="badge badge-secondary">{{ row.category.title }}</small>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <p v-if="row.content.length > 100" v-html="row.content.substring(0,200)+'...'"></p>
              <p v-else v-html="row.content"></p>
              <button
                @click.prevent="infoDetail(row.id)"
                v-if="row.content.length > 100"
                class="btn btn-primary btn-sm"
              >Selengkapnya</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="informations.data < 1" class="row">
        <div class="col-md-12">
          <h4>Tidak ada informasi terbaru</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <p v-if="informations.data">
            <i class="fa fa-bars"></i>
            {{ informations.data.length }} item dari {{ informations.meta.total }} total informasi
          </p>
        </div>
        <div class="col-md-6">
          <div class="pull-right">
            <b-pagination
              v-model="pageIndex"
              :total-rows="informations.meta.total"
              :per-page="informations.meta.per_page"
              aria-controls="informations"
              v-if="informations.data && informations.data.length > 0"
            ></b-pagination>
          </div>
        </div>
      </div>
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
      ],
      search: ""
    };
  },
  methods: {
    ...mapActions("classes", ["getSchedule"]),
    ...mapActions("informations", ["infoIndex", "infoDetailIndex"]),
    infoDetail(id) {
      this.$router.push({ name: "infoIndex.detail", params: { id: id } });
    },
    submit() {
      this.infoIndex(this.search);
    }
  },
  created() {
    this.getSchedule();
    this.infoIndex();
  },
  computed: {
    ...mapState("classes", {
      schedule: state => state.schedule
    }),
    ...mapState("informations", {
      informations: state => state.informations
    }),
    pageIndex: {
      get() {
        return this.$store.state.informations.pageIndex;
      },
      set(val) {
        this.$store.commit("informations/SET_PAGE_INDEX", val);
      }
    }
  },
  watch: {
    pageIndex() {
      this.infoIndex();
    }
    // search() {
    //   this.infoIndex(this.search);
    // }
  }
};
</script>

<style>
</style>