<template>
<!-- class="container" -->
  <div >
      <section class="content-header">
          <h1>Matakuliah</h1>
          <breadcrumb></breadcrumb>
      </section>

      <section class="content">
            <div class="row">
                <router-view></router-view>
            </div>
        </section>

  </div>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb.vue'
    export default {
        name: 'IndexCourses',
        components: {
            'breadcrumb': Breadcrumb
        }
    }
</script>

<style>

</style>