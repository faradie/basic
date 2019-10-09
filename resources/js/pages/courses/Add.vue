<template>
  <div class="col-md-12">
    <div class="panel">
      <div class="panel-heading">
        <h3>Tambah Matakuliah</h3>
      </div>
      <div class="panel-body">
        <course-form></course-form>
        <div class="form-group">
          <button class="btn btn-primary btn-sm btn-flat" @click.prevent="submit">
            <i class="fa fa-save"></i> Tambah
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FormCourse from '../courses/Form.vue'
export default {
    name: 'AddCourse',
    data(){
        return{

        }
    },
    methods:{
        ...mapActions('courses', ['createCourse']),
        submit(){
            this.createCourse().then(()=>{
                this.$router.push({ name: 'courses.data' })
                const Toast = this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "success",
            title: "Berhasil tambah matakuliah!"
          });
            })
        }
    },
    components:{
        'course-form': FormCourse
    }
};
</script>

<style>
</style>