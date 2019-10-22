<template>
  <div class="col-md-12">
    <div class="panel">
      <div class="panel-heading">
        <h3>Tambah Materi</h3>
      </div>
      <div class="panel-body">
        <module-form></module-form>
        <div class="form-group">
          <button class="btn btn-primary btn-sm btn-flat" >
            <i class="fa fa-save"></i> Tambah
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import FormModule from '../modules/Form.vue'
export default {
    name: 'AddModule',
    data() {
        return {
            
        }
    },
    components:{
        'module-form': FormModule
    }
};
</script>

<style>
</style>