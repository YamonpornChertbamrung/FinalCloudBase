<template>
  <div id="app">
    <div class="container-fluid mb-3 mt-5 m-auto font" v-for="user in user" :key="user.userId">
      <div class="d-flex align-items-center flex-column">
        <div class="card shadow card-w">
          <div class="card-body my-4">
            <div class="text-center">
              <img src="https://cdn.discordapp.com/attachments/876025140490698753/1054368171223683172/PaaPai.png"
                class="rounded-circle" alt="..." />
            </div>
            <h3 class="card-title d-flex justify-content-center mt-3">
              {{ user.tour_name }}
            </h3>
            <div class="row mt-1">
              <div class="col-3"></div>
              <div class="col-4 d-flex justify-content-start">
                <p class="card-text">จังหวัด</p>
              </div>
              <div class="col-5 d-flex justify-content-start">
                <p class="card-text">{{ user.province }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-3"></div>
              <div class="col-4 d-flex justify-content-start">
                <p class="card-text">วันที่เดินทาง</p>
              </div>
              <div class="col-5 d-flex justify-content-start">
                <p class="card-text">{{ user.date }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-3"></div>
              <div class="col-4 d-flex justify-content-start">
                <p class="card-text">ชื่อผู้จอง</p>
              </div>
              <div class="col-5 d-flex justify-content-start">
                <p class="card-text">
                  คุณ {{ user.firstname }} {{ user.lastname }}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-3"></div>
              <div class="col-4 d-flex justify-content-start">
                <p class="card-text">รหัสการจอง</p>
              </div>
              <div class="col-5 d-flex justify-content-start">
                <p class="card-text">
                  {{ user.userId }}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-3"></div>
              <div class="col-4 d-flex justify-content-start">
                <p class="card-text">จำนวนผู้เดินทาง</p>
              </div>
              <div class="col-5 d-flex justify-content-start">
                <p class="card-text">{{ user.total_tourist }} ท่าน</p>
              </div>
            </div>
            <!-- <p class="card-text">{{ user.state }}</p> -->
            <div class="row">
              <div class="col-3"></div>
              <div class="col-4 d-flex justify-content-start">
                <p class="card-text">สถานะ</p>
              </div>
              <div class="col-5 d-flex justify-content-start">
                <div v-switch="state">
                  <p v-case="'true'" class="text-success">
                    <span> <i class="bi bi-check-square"></i></span>
                    ผ่านการตรวจสอบ
                  </p>
                  <p v-case="'false'" class="text-danger">
                    <span><i class="bi bi-x-square"></i></span>
                    ไม่ผ่านการตรวจสอบ
                  </p>
                  <p v-case="''" class="text-warning">
                    <span><i class="bi bi-arrow-repeat"></i></span> รออนุมัติ
                  </p>
                </div>
              </div>
            </div>
            <div class="text-center">
              <a href="/" class="btn btn-primary">กลับสู่หน้าหลัก</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// @ is an alias to /src
export default {
  name: "Status",
  data() {
    return {
      search: "",
      user: [],
      state: ''
    };
  },
  mounted() {
    this.getUser(this.$route.params.id);
  },
  methods: {
    getUser(id) {
      axios
        .get(`https://xzd0nvjr64.execute-api.us-east-1.amazonaws.com/tour/status?userId=${id}`)
        .then((response) => {
          this.user = response.data;
          this.state = response.data[0].userState
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');
.font {
  font-family: "Kanit", sans-serif;
}

.card-w {
  width: 40rem;
}

img {
  width: 40%;
  height: 40%;
}

p {
  font-size: 22px;
}
</style>