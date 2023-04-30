<template>
  <div class="container font">
    <section class="section" id="app">
      <div class="row">
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
        <div class="col-9" v-for="users in users" :key="users.userId">
          <div class="card" style="width: 100%; height: 100%">
            <div class="card-content">
              <div class="content">
                <div class="fs-4	">
                  <span><i class="bi bi-file-earmark-text fs-2"></i></span>
                  หลักฐานการชำระเงิน
                </div>
                <hr />
                <div class="row">
                  <div class="col-8">
                    <div class="row">
                      <div class="col-3">
                        <p class="fs-5">รหัสลูกค้า</p>
                      </div>
                      <div class="col-9">
                        <p class="fs-5">{{ users.userId }}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-3">
                        <p class="fs-5">ชื่อทัวร์</p>
                      </div>
                      <div class="col-9">
                        <p class="fs-5">{{ users.tour_name }}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-3">
                        <p class="fs-5">จังหวัด</p>
                      </div>
                      <div class="col-9">
                        <p class="fs-5">{{ users.province }}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-3">
                        <p class="fs-5">ผู้จอง</p>
                      </div>
                      <div class="col-9">
                        <p class="fs-5">
                          {{ users.firstname }} {{ users.lastname }}
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-3">
                        <p class="fs-5">วันเดินทาง</p>
                      </div>
                      <div class="col-9">
                        <p class="fs-5">{{ users.date }}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-3">
                        <p class="fs-5">จำนวนผู้เดินทาง</p>
                      </div>
                      <div class="col-9">
                        <p class="fs-5">{{ users.total_tourist }} คน</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <img :src="users.slip" alt="..." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
// @ is an alias to /src
export default {
  name: "Slips",
  data() {
    return {
      users: []
      // like: this.$route.body.like,
    };
  },
  mounted() {
    this.getUsers(this.$route.params.id);
  },
  methods: {
    getUsers(Id) {
      axios
        .get(`https://xzd0nvjr64.execute-api.us-east-1.amazonaws.com/admin/slip?userId=${Id}`)
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          this.error = error.response.data.message;
        });
    }
  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');

.font {
  font-family: "Kanit", sans-serif;
}
</style>
