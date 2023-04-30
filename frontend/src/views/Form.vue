<template>
  <div id="app">
    <div
      class="container-fluid font my-3"
      v-for="info in info"
      :key="info.tourId"
    >
      <h1>กรอกรายละเอียดสำหรับติดต่อ</h1>
      <hr />
      <div class="row justify-content-md-center">
        <div class="col-8 gap-5">
          <div class="row border">
            <div class="col-12">
              <div class="row mx-3 mt-2">
                <h5>สรุปรายการจองทัวร์</h5>
              </div>
            </div>
            <div class="col-12">
              <div class="row mx-3 mb-2">
                <div class="col-7">
                  <img class="img-fluid" :src="info.img" width="100%" />
                </div>
                <div class="col-5">
                  <h5 class="my-5">
                    <i class="bi bi-airplane mr-3"></i>{{ info.name }}
                  </h5>
                  <h5 class="my-5">
                    <i class="bi bi-coin mr-3"></i>{{ info.price }} THB/คน
                  </h5>
                  <h5 class="my-5">
                    <i class="bi bi-geo-alt mr-3"></i>{{ info.province }}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-2 border">
            <div class="col-12">
              <form @submit.prevent="submit" class="m-4" method="POST">
                <div class="col-12">
                  <h5>แบบฟอร์มการจองสำหรับติดต่อ</h5>
                </div>
                <div class="col-12 mt-2">
                  <div class="row">
                    <div class="col-6">
                      <label class="form-label"
                        >ชื่อผู้ติดต่อ <span class="require">*</span></label
                      >
                      <input
                        name="firstname"
                        type="text"
                        class="form-control"
                        id="firstname"
                        v-model="firstname"
                      />
                      <span>
                        <p v-if="err.fname !== '' && firstname == ''">
                          <span class="ml-2" style="color:red;">{{
                            err.fname
                          }}</span>
                        </p>
                      </span>
                    </div>
                    <div class="col-6">
                      <label class="form-label"
                        >นามสกุลผู้ติดต่อ <span class="require">*</span></label
                      >
                      <input
                        name="lastname"
                        value=""
                        type="text"
                        class="form-control"
                        aria-describedby="emailHelp"
                        v-model="lastname"
                      />
                      <span>
                        <p v-if="err.lname !== '' && lastname == ''">
                          <span class="ml-2" style="color:red;">{{
                            err.lname
                          }}</span>
                        </p>
                      </span>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-6">
                      <label class="form-label"
                        >หมายเลขโทรศัพท์ <span class="require">*</span></label
                      >
                      <input
                        name="phone"
                        value=""
                        type="text"
                        class="form-control"
                        aria-describedby="emailHelp"
                        v-model="phone"
                      />
                      <span>
                        <p v-if="err.phone !== '' && phone == ''">
                          <span class="ml-2" style="color:red;">{{
                            err.phone
                          }}</span>
                        </p>
                      </span>
                    </div>
                    <div class="col-6">
                      <label class="form-label"
                        >Email <span class="require">*</span></label
                      >
                      <input
                        name="email"
                        type="email"
                        class="form-control"
                        aria-describedby="emailHelp"
                        v-model="email"
                      />
                      <span>
                        <p v-if="err.email !== '' && email == ''">
                          <span class="ml-2" style="color:red;">{{
                            err.email
                          }}</span>
                        </p>
                      </span>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-12">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                        >หมายเหตุ
                      </label>
                      <textarea
                        name="annotation"
                        value=""
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        v-model="annotaion"
                      ></textarea>
                    </div>
                  </div>
                  <div class="card my-3">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-4">
                          <h5>ชื่อทัวร์</h5>
                          <div class="form-group">
                            <select class="form-select" name="tour_name">
                              <option selected>{{ info.tour_name }}</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-4">
                          <h5>จังหวัด</h5>
                          <div class="form-group">
                            <select class="form-select" name="province">
                              <option selected>{{ info.province }}</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-4">
                          <h5>ราคา/ท่าน</h5>
                          <div class="form-group">
                            <select class="form-select" name="tour_price">
                              <option selected>{{ info.price }}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row mt-3">
                        <div class="col-6">
                          <h5>วันเดินทาง</h5>
                          <div class="form-group">
                            <select
                              class="form-select"
                              name="date"
                              v-model="date"
                            >
                              <option value="">เลือกวันเดินทาง</option>
                              <option :value="info.date_first">
                                {{ info.date_first }}
                              </option>
                              <option :value="info.date_second">
                                {{ info.date_second }}
                              </option>
                            </select>
                            <span>
                              <p v-if="err.date !== '' && date == ''">
                                <span class="ml-2" style="color:red;">{{
                                  err.date
                                }}</span>
                              </p>
                            </span>
                          </div>
                        </div>
                        <div class="col-6">
                          <h5>ผู้เดินทาง</h5>
                          <div class="input-group">
                            <span class="input-group-text"
                              ><i class="bi bi-person"></i
                            ></span>
                            <input
                              name="total_tourist"
                              v-model="total_tourist"
                              class="form-outline form-control w-50"
                              type="number"
                              min="1"
                              placeholder="จำนวนผู้เดินทาง"
                            />
                            <span class="input-group-text">คน</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-2" style="text-align: end">
                    <router-link
                      class="btn btn-primary col mx-3"
                      :to="`/tour/${info.name}`"
                      >ย้อนกลับ</router-link
                    >
                    <button type="submit" class="btn btn-primary">
                      ส่งฟอร์ม
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="col-3">
          <div class="row border tab">
            <div class="col-12 d-flex justify-content-center mt-3">
              <h5>ขั้นตอนการจองทัวร์</h5>
            </div>
            <div class="col-12 d-flex justify-content-center mt-3">
              <i class="bi bi-1-circle-fill text-primary i-circle"></i>
            </div>
            <div class="col-12 d-flex justify-content-center mt-3">
              <p class="text-primary">กรอกรายละเอียดสำหรับติดต่อ</p>
            </div>
            <div class="col-12 d-flex justify-content-center my-5">
              <i class="bi bi-arrow-down text-muted i-arrow"></i>
            </div>
            <div class="col-12 d-flex justify-content-center mt-3">
              <i class="bi bi-2-circle-fill text-muted i-circle"></i>
            </div>
            <div class="col-12 d-flex justify-content-center my-3">
              <p class="text-muted">ทำการชำระเงิน</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Form",
  data() {
    return {
      info: [],
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      annotaion: "",
      total_tourist: 1,
      date: "",
      err: {
        fname: "",
        lname: "",
        phone: "",
        email: "",
        date: ""
      },
      
    };
  },
  mounted() {
    this.getFormDetail(this.$route.params.id);
  },
  methods: {
    getFormDetail(tourId) {
      axios
        .get(
          `https://xzd0nvjr64.execute-api.us-east-1.amazonaws.com/tour/form?tourId=${tourId}`
        )

        .then(response => {
          this.info = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    submit() {
      if (
        this.firstname == "" ||
        this.lastname == "" ||
        this.phone == "" ||
        this.email == "" ||
        this.date == ""
      ) {
        this.err.fname = "Plese input your firstname";
        this.err.lname = "Plese input your lastname";
        this.err.phone = "Plese input your phone number";
        this.err.email = "Plese input your email";
        this.err.date = "Plese select your tour date";
      } else {
        axios
          .post(
            "https://xzd0nvjr64.execute-api.us-east-1.amazonaws.com/tour/form",
            {
              firstname: this.firstname,
              lastname: this.lastname,
              phone: this.phone,
              email: this.email,
              annotation: this.annotaion,
              total_tourist: parseInt(this.total_tourist),
              tour_name: this.info[0].tour_name,
              province: this.info[0].province,
              price: parseInt(this.info[0].price),
              
              date: this.date,
            }
          )
          .then(response=> {
            this.$router.push({ name: "confirm", params: { id: response.data } });
            console.log(response.data)
            // console.log("hi")
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap");

.font {
  font-family: "Kanit", sans-serif;
}

.tab {
  padding-bottom: 227px;
  padding-top: 227px;
}

.i-arrow {
  font-size: 5rem;
}

.i-circle {
  font-size: 3rem;
}

.border {
  border: 1px solid #a6a6a6;
}

.require {
  color: red;
}
</style>
