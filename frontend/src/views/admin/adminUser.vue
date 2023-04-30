<template>
  <section class="section" id="app">
    <div class="container font">
      <div class="row gx-5 mt-4 mb-4">
        <div class="col-3">
          <div class="p-3 border bg-white h-100 rounded-2 shadow p-3 mb-5 bg-body rounded">
            <div class="text-center">
              <router-link to="/admin">
                <img src="https://cdn.discordapp.com/attachments/876025140490698753/1054368171223683172/PaaPai.png"
                  class="rounded logo" alt="LOGO_PaaPai" />
              </router-link>
              <hr />
              <p class="fw-bold text-primary text-start">ผู้ดูแลระบบ</p>
              <div class="row">
                <div class="col-6">
                  <p class=" text-start ms-2"><i class="bi bi-person-fill-gear"></i> Admin</p>
                </div>
                <div class="col-6 text-center">
                  <router-link to="/admin/login" class="text-decoration-none">
                    <div class="bg-danger text-white rounded-3">ออกจากระบบ</div>
                  </router-link>
                </div>
              </div>
              <div>
                <hr />
                <p class="fw-bold text-primary text-start">ทัวร์</p>
                <router-link to="/admin/allTour" class="text-decoration-none text-dark">
                  <p class=" text-start ms-2">
                    <i class="bi bi-geo-alt-fill"></i> ทัวร์ทั้งหมด
                  </p>
                </router-link>
                <router-link to="/admin/manage" class="text-decoration-none text-dark">
                  <p class=" text-start ms-2">
                    <i class="bi bi-pen-fill"></i> จัดการทัวร์
                  </p>
                </router-link>
                <hr />
                <p class="fw-bold text-primary text-start">รายการชำระเงิน</p>
                <router-link to="/admin/pay" class="text-decoration-none text-dark">
                  <p class=" text-start ms-2">
                    <i class="bi bi-cash"></i> รายการชำระเงิน
                  </p>
                </router-link>
                <router-link to="/admin/approve" class="text-decoration-none text-dark">
                  <p class=" text-start ms-2">
                    <i class="bi bi-check-circle-fill"></i> อนุมัติแล้ว
                  </p>
                </router-link>
                <router-link to="/admin/reject" class="text-decoration-none text-dark">
                  <p class=" text-start ms-2">
                    <i class="bi bi-x-circle-fill"></i> ไม่อนุมัติ
                  </p>
                </router-link>
                <hr />
                <p class="fw-bold text-primary text-start">การจอง</p>
                <router-link to="/admin/home" class="text-decoration-none text-dark">
                  <p class=" text-start ms-2">
                    <i class="bi bi-receipt-cutoff"></i> รายการจองทั้งหมด
                  </p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-9">
          <div
            class="p-3 border bg-white h-100 fs-2 rounded-2 shadow p-3 mb-5 bg-body rounded"
          >
            <h3 class=" text-start ms-2 mt-3">
              <i class="bi bi-person-vcard"></i> รายชื่อทั้งหมด
            </h3>
            <div>
              <h4 class="ms-2">
                <i class="bi bi-people"></i> จำนวนผู้ร่วมเดินทางในทัวร์นี้
                {{ users.length }} คน
              </h4>
            </div>
            <hr />
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="ค้นหารายชื่อ"
                v-model="search"
              />
              <button
                class="btn btn-outline-primary"
                type="button"
                id="button-addon2"
              >
                <i class="bi bi-search"></i>
              </button>
            </div>

            <table class="table fs-6 table-hover">
              <thead>
                <tr>
                  <th scope="col">รหัสการจอง</th>
                  <th scope="col">ชื่อ-นามสกุล</th>
                  <th scope="col">โทรศัพท์</th>
                  <th scope="col">อีเมล</th>
                </tr>
              </thead>
              <tbody v-for="user in users" :key="user.userId">
                <tr v-if="users.length > 0">
                  <td>{{ user.userId }}</td>
                  <td>
                    {{ user.firstname }}
                    <span class="ml-3">{{ user.lastname }}</span>
                  </td>
                  <td>{{ user.phone }}</td>
                  <td>{{ user.email }}</td>
                </tr>
              </tbody>
            </table>
            <h5 v-if="users.length === 0" class="text-center ">
              No User Booking
            </h5>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
export default {
  name: "allUser",
  data() {
    return {
      users: [],
      search: ""
    };
  },
  mounted() {
    this.getUsers(this.$route.params.tourName);
  },
  computed: {
    filteredUsers() {
      let res = this.users.filter(post => {
        return post.firstname.toLowerCase().includes(this.search.toLowerCase());
      });

      if (this.search != "") {
        return res;
      } else {
        return this.users;
      }
    }
  },
  methods: {
    getUsers(tourName) {
      axios
        .get(
          `https://xzd0nvjr64.execute-api.us-east-1.amazonaws.com/admin/tourdetail?tour_name=${tourName}`
        )
        .then(response => {
          this.users = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap");

.font {
  font-family: "Kanit", sans-serif;
}

.logo {
  height: 150px;
  width: 150px;
}

.imgAdmin {
  height: 70px;
  width: 70px;
}
</style>
