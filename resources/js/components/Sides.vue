<template>
  <div>
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
          <div class="pull-left image">
            <img src="/assets/img/avatar5.png" class="img-circle" alt="User Image" />
          </div>
          <div class="pull-left info">
            <p>{{ user.name }}</p>
            <a href="#">
              <i class="fa fa-circle text-success"></i>
              {{ user.role }}
            </a>
          </div>
        </div>

        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu" data-widget="tree">
          <li>
            <router-link :to="{ name:'home' }">
              <a>
                <i class="fa fa-ticket"></i>
                <span>Beranda</span>
              </a>
            </router-link>
          </li>
          <li class="header">Master</li>
          <li>
            <router-link data-toggle="push-menu" :to="{ name:'courses.data' }">
              <a>
                <i class="fa fa-files-o"></i>
                <span>Matakuliah</span>
              </a>
            </router-link>
          </li>
          <li>
            <router-link data-toggle="push-menu" :to="{ name:'categories' }">
              <a>
                <i class="fa fa-th"></i>
                <span>Kategori</span>
              </a>
            </router-link>
          </li>
          <li>
            <router-link data-toggle="push-menu" :to="{ name:'informations.data' }">
              <a>
                <i class="fa fa-info-circle"></i>
                <span>Informasi</span>
              </a>
            </router-link>
          </li>
          <li>
            <router-link data-toggle="push-menu" :to="{ name:'classes.data' }">
              <a>
                <i class="fa fa-graduation-cap"></i>
                <span>Kelas</span>
              </a>
            </router-link>
          </li>
          <li>
            <router-link data-toggle="push-menu" :to="{ name:'users.data' }">
              <a>
                <i class="fa fa-group"></i>
                <span>Pengguna</span>
              </a>
            </router-link>
          </li>
          <li class="treeview">
            <a href="#">
              <i class="fa fa-tags"></i>
              <span>Task</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li>
                <a href="pages/charts/chartjs.html">
                  <i class="fa fa-circle-o"></i> Laporan
                </a>
              </li>
              <li>
                <a href="pages/charts/morris.html">
                  <i class="fa fa-circle-o"></i> Pretest
                </a>
              </li>
              <li>
                <a href="pages/charts/flot.html">
                  <i class="fa fa-circle-o"></i> Tugas
                </a>
              </li>
              <li>
                <a href="pages/charts/inline.html">
                  <i class="fa fa-circle-o"></i> Ujian
                </a>
              </li>
            </ul>
          </li>
          <li class="treeview">
            <a href="#">
              <i class="fa fa-pie-chart"></i>
              <span>Penilaian</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li>
                <a href="pages/charts/chartjs.html">
                  <i class="fa fa-circle-o"></i> Laporan
                </a>
              </li>
              <li>
                <a href="pages/charts/morris.html">
                  <i class="fa fa-circle-o"></i> Pretest
                </a>
              </li>
              <li>
                <a href="pages/charts/flot.html">
                  <i class="fa fa-circle-o"></i> Tugas
                </a>
              </li>
              <li>
                <a href="pages/charts/inline.html">
                  <i class="fa fa-circle-o"></i> Ujian
                </a>
              </li>
            </ul>
          </li>

          <li class="header">Dosen</li>
          <li>
            <a href="pages/widgets.html">
              <i class="fa fa-random"></i>
              <span>Presensi</span>
            </a>
          </li>
          <li>
            <router-link data-toggle="push-menu" :to="{ name:'modules.data' }">
              <a>
                <i class="fa fa-book"></i>
                <span>Materi</span>
              </a>
            </router-link>
          </li>

          <li class="header">Praktikan</li>

          <li class="treeview">
            <a href="#">
              <i class="fa fa-upload"></i>
              <span>Upload</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li>
                <a href="pages/charts/chartjs.html">
                  <i class="fa fa-circle-o"></i> Laporan
                </a>
              </li>
              <li>
                <a href="pages/charts/morris.html">
                  <i class="fa fa-circle-o"></i> Pretest
                </a>
              </li>
              <li>
                <a href="pages/charts/flot.html">
                  <i class="fa fa-circle-o"></i> Tugas
                </a>
              </li>
              <li>
                <a href="pages/charts/inline.html">
                  <i class="fa fa-circle-o"></i> Ujian
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="pages/widgets.html">
              <i class="fa fa-ticket"></i>
              <span>Nilai Saya</span>
            </a>
          </li>
        </ul>
      </section>
      <!-- /.sidebar -->
    </aside>

    <!-- /.control-sidebar -->
    <!-- Add the sidebar's background. This div must be placed
    immediately after the control sidebar-->
    <div class="control-sidebar-bg"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    check() {
      console.log(localStorage.getItem("token"));
    }
  },
  computed: {
    ...mapState("auth", {
      user: state => state.user
    })
  }
};
</script>

<style>
</style>