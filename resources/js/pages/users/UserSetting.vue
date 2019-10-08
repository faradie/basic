<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-5">
        <div class="box box-primary direct-chat direct-chat-primary">
          <div class="box-header with-border">
            <h3 class="panel-title">Edit data {{ user.name }}</h3>
          </div>
          <div class="panel-body">
            <div class="form-group" :class="{ 'has-error': errors.id }">
              <label for>ID</label>
              <input
                placeholder="ID Pengguna"
                type="text"
                class="form-control"
                v-model="user.id"
                :readonly="$route.name == 'user.settings'"
              />
              <p class="text-danger" v-if="errors.id">{{ errors.id[0] }}</p>
            </div>
            <div class="form-group" :class="{ 'has-error': errors.email }">
              <label for>Email</label>
              <input
                placeholder="Email pengguna"
                type="text"
                class="form-control"
                v-model="user.email"
                :readonly="$route.name == 'user.settings'"
              />
              <p class="text-danger" v-if="errors.email">{{ errors.email[0] }}</p>
            </div>
            <div class="form-group" :class="{ 'has-error': errors.name }">
              <label for>Nama</label>
              <input
                placeholder="Nama pengguna"
                type="text"
                class="form-control"
                v-model="user.name"
                @keyup.enter="simpanData"
              />
              <p class="text-danger" v-if="errors.name">{{ errors.name[0] }}</p>
            </div>

            <div class="form-group" :class="{ 'has-error': errors.phone }">
              <label for>Telepon</label>
              <input
                placeholder="Telepon pengguna"
                type="text"
                class="form-control"
                v-model="user.phone"
                @keyup.enter="simpanData"
              />
              <p class="text-danger" v-if="errors.phone">{{ errors.phone[0] }}</p>
            </div>
            <div class="form-group">
              <label for>Role</label>
              <input
                placeholder="Wewenang sebagai.."
                type="text"
                class="form-control"
                v-model="user_role[0]"
                :readonly="$route.name == 'user.settings'"
              />
            </div>
            <div class="form-group">
              <label for>Permissions:</label>
              <template v-for="(row, index) in user_permissions">
                <a :key="index">"{{ row.name.charAt(0).toUpperCase() + row.name.slice(1) }}"</a>
              </template>
            </div>
            <div class="form-group">
              <button class="btn btn-info btn-sm" @click="simpanData">Simpan</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="box box-warning direct-chat direct-chat-warning">
          <div class="box-header with-border">
            <h3 class="box-title">Berikan akses wewenang(Role) dan izin(Permission)</h3>
          </div>
          <div class="panel-body">
            <div class="form-group">
              <label for>Wewenang</label>
              <select class="form-control" v-model="selected_role">
                <option value>Pilih</option>
                <option
                  v-for="row in roles"
                  :value="row.id"
                  @click="getName(row.name)"
                  :key="row.id"
                >{{ row.name.charAt(0).toUpperCase() + row.name.slice(1) }}</option>
              </select>
              <p class="text-danger" v-if="errors.role_id">{{ errors.role_id[0] }}</p>
            </div>

            <div class="form-group">
              <label for>Berikan izin tambahan</label>
              <div class="alert alert-success" v-if="alert_permission">Izin telah diberikan</div>
              <br />
              <div>
                <template v-for="(row, index) in permissions">
                  <div class="new-select" :key="index">
                    <input
                      type="checkbox"
                      class="flat-red"
                      :key="index"
                      :value="row.name"
                      :checked="role_permission.findIndex(x => x.name == row.name) != -1"
                      @click="addPermission(row)"
                    />
                    <label>{{ row.name.charAt(0).toUpperCase() + row.name.slice(1) }}</label>
                  </div>
                </template>
              </div>
            </div>

            <div class="pull-right">
              <button @click="setRoleAndPermission" class="btn btn-primary btn-sm">
                <i class="fa fa-send"></i> Tetapkan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "UserSettings",
  data() {
    return {
      model: [],
      alert_permission: false,
      selected_role: "",
      new_permission: [],
      role_name: ""
    };
  },
  methods: {
    ...mapActions("users", [
      "getUser",
      "updateUser",

      "getRoles",
      "getAllPermission",

      "getUserRole",
      "getUserPermissions",
      "getRolePermission",
      "setRolePermission"
    ]),
    ...mapMutations("users", ["CLEAR_ROLE_PERMISSION"]),
    getName(val) {
      this.role_name = val;
      this.getRolePermission(this.selected_role).then(() => {
        this.loading = false;
        this.new_permission = this.role_permission;
      });
    },

    simpanData() {
      this.updateUser(this.$route.params.id).then(() => {
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: "success",
          title: "Berhasil edit"
        });
      });
    },
    addPermission(name) {
      //get index berdasarkan name apabila ada -1,
      let index = this.new_permission.findIndex(x => x == name);
      if (index == -1) {
        this.new_permission.push(name);
      } else {
        this.new_permission.splice(index, 1);
      }
    },
    setRoleAndPermission() {
      this.setRolePermission({
        role_id: this.selected_role,
        permissions: this.new_permission,
        role_name: this.role_name,
        user_id: this.$route.params.id
      }).then(response => {
        if (response.status == "success") {
          this.alert_permission = true;
          setTimeout(() => {
            this.selected_role = "";
            this.new_permission = [];
            this.loading = false;
            this.alert_permission = false;
            this.CLEAR_ROLE_PERMISSION();
            setTimeout(() => this.$router.push({ name: "users.data" }), 1500);
          }, 1000);
        }
      });
    }
  },
  computed: {
    ...mapState(["errors"]),
    ...mapState("users", {
      user: state => state.user,

      roles: state => state.roles,
      permissions: state => state.permissions,

      user_role: state => state.user_role,

      user_permissions: state => state.user_permissions_state,

      role_permission: state => state.role_permission
    })
  },
  created() {
    this.getRoles();
    this.getAllPermission();
    this.getUser(this.$route.params.id);
    this.getUserRole(this.$route.params.id);
    this.getUserPermissions(this.$route.params.id);
  },
  destroyed() {
    this.CLEAR_ROLE_PERMISSION();
  }
};
</script>

<style>
.new-select {
  display: inline-block;
  margin-right: 10px;
}
</style>