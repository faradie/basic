<template>
<!-- class="container" -->
  <div >
    <div class="content-header">
      <h1>Kategori</h1>
      <breadcrumb></breadcrumb>
    </div>

    <div class="content">
      <div class="row">
        <div class="col-md-6">
          <div class="box box-primary direct-chat direct-chat-primary">
            <div class="box-header with-border">
              <div class="form-group">
                <input
                  type="text"
                  placeholder="Tambahkan Nama Kategori.."
                  v-model="category.title"
                  class="form-control"
                  :class="{ 'is-invalid': errors.title }"
                />
                <p class="text-danger" v-if="errors.title">{{ errors.title[0] }}</p>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  placeholder="Tambahkan Deskripsi.."
                  v-model="category.description"
                  class="form-control"
                  :class="{ 'is-invalid': errors.description }"
                />
                <p class="text-danger" v-if="errors.description">{{ errors.description[0] }}</p>
              </div>
              <div class="form-group" v-if="category.id == ''">
                <button
                  v-if="category.id == ''"
                  class="btn btn-primary btn-block btn-sm btn-flat"
                  @click.prevent="addCategory"
                >
                  <i class="fa fa-save"></i> Tambah
                </button>
              </div>
              <div class="form-group" v-else>
                <button
                  class="btn btn-warning btn-block btn-sm btn-flat"
                  @click.prevent="updateCategory(category.id)"
                >
                  <i class="fa fa-save"></i> Update
                </button>
                <button class="btn btn-secondary btn-block btn-sm btn-flat" @click.prevent="back">
                  <i class="fa fa-save"></i> Kembali
                </button>
              </div>
            </div>
            <div class="panel-body">
              <p>Kategori ini digunakan untuk mengelompokkan informasi dan daftar isi.</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="box box-warning direct-chat direct-chat-warning">
            <div class="box-header with-border">
              <input
                type="text"
                class="form-control"
                placeholder="Cari judul kategori"
                @keyup.enter="getSearch"
                v-model="search"
              />
              <br />
              <div class="table-responsive">
                <b-table striped hover bordered :items="datas.data" :fields="fields" show-empty>
                  <template v-slot:cell(title)="row">
                    <td class="parent-row">{{ row.item.title }}</td>
                  </template>
                  <template v-slot:cell(description)="row">
                    <td class="parent-row">{{ row.item.description }}</td>
                  </template>
                  <template v-slot:cell(actions)="row">
                    <button
                      @click.prevent="edits(row.item.id,row.item.title,row.item.description)"
                      class="btn btn-warning btn-sm"
                    >
                      <i class="fa fa-pencil"></i>
                    </button>

                    <button @click.prevent="deletes(row.item.id)" class="btn btn-danger btn-sm">
                      <i class="fa fa-trash"></i>
                    </button>
                  </template>
                </b-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Breadcrumb from "../../components/Breadcrumb.vue";
export default {
  name: "IndexCategories",
  components: {
    breadcrumb: Breadcrumb
  },
  data() {
    return {
      title: "",
      description: "",
      search: "",
      fields: [
        { key: "title", label: "Kategori" },
        { key: "description", label: "Deskripsi" },
        { key: "actions", label: "Lanjutan" }
      ]
    };
  },
  computed: {
    ...mapState(["errors"]),
    ...mapState("categories", {
      datas: state => state.datas,
      category: state => state.category
    })
  },
  methods: {
    ...mapMutations("categories", ["SET_FOR_UPDATE"]),
    ...mapActions("categories", [
      "getCategories",
      "addCategoryData",
      "updateCategoryData",
      "dropCategory"
    ]),
    getSearch(){
      this.getCategories(this.search)
    },
    deletes(id) {
      this.$swal({
        title: "Yakin dihapus?",
        text: "Apabila terhapus tidak dapat dikembalikan seperti mantan!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya Hapus!",
        cancelButtonText: "Tidak"
      }).then(result => {
        if (result.value) {
          this.dropCategory(id).then(() => {
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: "success",
              title: "Berhasil hapus kategori!"
            });
            this.getCategories();
          });
        }
      });
    },
    back() {
      this.category.id = "";
      this.category.title = "";
      this.category.description = "";
    },
    updateCategory(id) {
      this.updateCategoryData(id).then(() => {
        this.getCategories();

        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: "success",
          title: "Berhasil edit kategori!"
        });
      });
    },
    addCategory() {
      this.addCategoryData().then(() => {
        this.getCategories();

        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: "success",
          title: "Berhasil tambah kategori!"
        });
      });
    },
    edits(id, title, description) {
      this.category.id = id;
      this.category.title = title;
      this.category.description = description;
    }
  },
  created() {
    this.getCategories();
  }
};
</script>

<style>
</style>