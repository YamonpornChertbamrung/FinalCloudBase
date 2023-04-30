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
        <div class="col-9" v-for="tour in tours.slice(0, 1)" :key="tour.tourId">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <div class="fs-4	d-inline">
                  <span><i class="bi bi-airplane-fill"></i></span>
                  รวมแพ็กเกจทัวร์
                </div>
                <router-link class="fs-5 float-end  mr-2 btn btn-primary" :to="`/admin/createtour`"><span><i
                      class="bi bi-plus-circle"></i></span> เพิ่มทัวร์
                </router-link>
                <hr />
                <div class="row">
                  <div class="col-4" v-for="tour in tours" :key="tour.tourId">
                    <img :src="tour.img" class="card-img-top" style="width: 100%; height:170px" alt="..." />
                    <div class="card-body my-2">
                      <h5 class="card-title">{{ tour.name }}</h5>
                      <hr />
                      <div class="province">
                        <span><i class="bi bi-geo-alt"></i>
                          {{ tour.province }}</span>
                      </div>
                      <div class="row mt-3">
                        <div class="col-6">
                          <p>ราคาเริ่มต้น</p>
                        </div>
                        <div class="col-6 text-end">
                          <p>{{ tour.price }} <span class="ml-2">THB</span></p>
                        </div>
                      </div>
                      <div class="text-right">
                        <router-link class="fs-4 text-black mr-2" :to="`/admin/update/${tour.tourId}`"><span><i
                              class="bi bi-pencil-square"></i></span>
                        </router-link>
                        <span class="ml-1 fs-4" @click="deleteTour(tour.tourId)"> <i class="bi bi-trash3"></i></span>
                      </div>
                    </div>
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
  name: "Manage",
  data() {
    return {
      tours: []
    };
  },
  mounted() {
    this.getTours();
  },
  methods: {
    getTours() {
      axios
        .get("https://xzd0nvjr64.execute-api.us-east-1.amazonaws.com/admin/manage")
        .then(response => {
          this.tours = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteTour(tourId) {
      axios.delete(`https://xzd0nvjr64.execute-api.us-east-1.amazonaws.com/admin/delete?tourId=${tourId}`)
        .then(response => {
          this.$router.push({ path: "/admin/manage" });
          this.getTours();
        })
        .catch(error => {
          this.error = error.response.data.message;
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
