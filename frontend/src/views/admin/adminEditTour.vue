<template>
  <div class="container ">
    <section class="section" id="app">
      <div class="d-flex justify-content-center">
        <div class="card" style="width: 60%;">
          <div class="card-body">
            <form @submit.prevent="submit">
              <div class="mb-3">
                <div class="form-group">
                  <label class="form-label">รหัสทัวร์</label>
                  <input class="form-control" type="text" readonly :value="details[0].tourId">
                </div>
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">ชื่อทัวร์</label>
                <div class="input-group">
                  <input v-if="tour_name === ''" type="text" class="form-control" name="tour_name" :value="details[0].tour_name" readonly />
                  <input v-else-if="tour_name !== ''" type="text" class="form-control" name="tour_name" :value="tour_name" readonly />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-pencil"
                        @click="updateName"></i></span>
                  </div>
                </div>
                <div v-if="edit_tour_name === true" class="input-group my-2">
                  <input type="text" class="form-control" name="tour_name" v-model="tour_name" />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-check2"
                        @click="saveName(tour_name)"></i></span>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">จังหวัด</label>
                <div class="input-group">
                  <input v-if="province === ''" type="text" class="form-control" name="province" :value="details[0].province"
                    readonly />
                  <input v-else-if="province !== ''" type="text" class="form-control" name="province" :value="province"
                    readonly />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-pencil"
                        @click="updateProvince"></i></span>
                  </div>
                </div>
                <div v-if="edit_province === true" class="input-group my-2">
                  <input type="text" class="form-control" name="province" v-model="province" />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-check2"
                        @click="saveProvince(province)"></i></span>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">ราคา</label>
                <div class="input-group">
                  <input v-if="price === 0" type="text" class="form-control" name="price" :value="details[0].price"
                    readonly />
                  <input v-else-if="price !== ''" type="text" class="form-control" name="price" :value="price" readonly />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-pencil"
                        @click="updatePrice"></i></span>
                  </div>
                </div>
                <div v-if="edit_price === true" class="input-group my-2">
                  <input type="text" class="form-control" name="price" v-model="price" />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-check2"
                        @click="savePrice(price)"></i></span>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">รายละเอียด</label>
                <textarea readonly v-if="detail === ''" rows="6" type="text" class="form-control" name="detail"
                  :value="details[0].detail"></textarea>
                <textarea v-else-if="detail !== ''" rows="6" type="text" class="form-control" name="detail"
                  :value="detail"></textarea>
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2"><i class="bi bi-pencil"
                      @click="updateDetail"></i></span>
                </div>
                <div v-if="edit_detail === true" class="my-2">
                  <textarea type="text" class="form-control" name="detail" v-model="detail"></textarea>
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-check2"
                        @click="saveDetail(detail)"></i></span>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">ตารางการเดินทาง</label>
                <textarea readonly v-if="schedule === ''" rows="6" type="text" class="form-control" name="schedule"
                  :value="details[0].schedule"></textarea>
                <textarea v-else-if="schedule !== ''" rows="6" type="text" class="form-control" name="schedule"
                  :value="schedule"></textarea>
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2"><i class="bi bi-pencil"
                      @click="updateSchedule"></i></span>
                </div>
                <div v-if="edit_schedule === true" class="my-2">
                  <textarea type="text" class="form-control" name="schedule" v-model="schedule"></textarea>
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-check2"
                        @click="saveSchedule(schedule)"></i></span>
                  </div>
                </div>
              </div>

              <label for="exampleFormControlInput1" class="form-label">วันที่เดินทาง</label>
              <div class="mb-3">
                <label>ครั้งที่1</label>
                <div class="input-group">
                  <b-form-datepicker v-if="date_first === ''" :value="details[0].date_first" name="date_first" class="mb-2"
                    locale="en"></b-form-datepicker>
                  <b-form-datepicker v-else-if="date_first !== ''" :value="date_first" name="date_first" class="mb-2"
                    locale="en"></b-form-datepicker>
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-pencil"
                        @click="updateDate_first"></i></span>
                  </div>
                </div>
                <div v-if="edit_date_first === true" class="input-group my-2">
                  <b-form-datepicker v-model="date_first" name="date_first" class="mb-2" locale="en"></b-form-datepicker>
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-check2"
                        @click="saveDate_first(date_first)"></i></span>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label>ครั้งที่2</label>
                <div class="input-group">
                  <b-form-datepicker v-if="date_second === ''" :value="details[0].date_second" name="date_second"
                    class="mb-2" locale="en"></b-form-datepicker>
                  <b-form-datepicker v-else-if="date_second !== ''" :value="date_second" name="date_second" class="mb-2"
                    locale="en"></b-form-datepicker>
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-pencil"
                        @click="updateDate_second"></i></span>
                  </div>
                </div>
                <div v-if="edit_date_second === true" class="input-group my-2">
                  <b-form-datepicker v-model="date_second" name="date_second" class="mb-2"
                    locale="en"></b-form-datepicker>
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-check2"
                        @click="saveDate_second(date_second)"></i></span>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">ภาพปก</label>
                <div class="input-group">
                  <input v-if="img === ''" type="text" class="form-control" name="img" :value="details[0].img" readonly />
                  <input v-else-if="img !== ''" type="text" class="form-control" name="img" :value="img" readonly />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-pencil"
                        @click="updateImg"></i></span>
                  </div>
                </div>
                <div v-if="edit_img === true" class="input-group my-2">
                  <input type="text" class="form-control" name="img" v-model="img" />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-check2"
                        @click="saveImg(img)"></i></span>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">ภาพรายละเอียด</label>
                <div class="input-group">
                  <input v-if="detail_img === ''" type="text" class="form-control" name="detail_img"
                    :value="details[0].detail_img" readonly />
                  <input v-else-if="detail_img !== ''" type="text" class="form-control" name="detail_img"
                    :value="detail_img" readonly />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-pencil"
                        @click="updateDetail_img"></i></span>
                  </div>
                </div>
                <div v-if="edit_detail_img === true" class="input-group my-2">
                  <input type="text" class="form-control" name="detail_img" v-model="detail_img" />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-check2"
                        @click="saveDetail_img(detail_img)"></i></span>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">จำนวนผู้เดินทาง</label>
                <div class="input-group">
                  <input v-if="max_tourist === 0" type="text" class="form-control" name="max_tourist"
                    :value="details[0].max_tourist" readonly />
                  <input v-else-if="max_tourist !== ''" type="text" class="form-control" name="max_tourist"
                    :value="max_tourist" readonly />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-pencil"
                        @click="updateMax_tourist"></i></span>
                  </div>
                </div>
                <div v-if="edit_max_tourist === true" class="input-group my-2">
                  <input type="text" class="form-control" name="max_tourist" v-model="max_tourist" />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="bi bi-check2"
                        @click="saveMax_tourist(max_tourist)"></i></span>
                  </div>
                </div>
              </div>

              <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                <router-link to="/admin/manage" class="btn btn-secondary me-md-2" type="button">
                  ยกเลิก
                </router-link>
                <button class="btn btn-info" type="submit">บันทึก</button>
              </div>
            </form>
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
  name: "Edit",
  data() {
    return {
      details: [],
      tour_name: '',
      province: "",
      price: 0,
      img: "",
      detail_img: "",
      detail: "",
      schedule: "",
      max_tourist: 0,
      date_first: "",
      date_second: "",

      edit_tour_name: false,
      edit_province: false,
      edit_price: false,
      edit_img: false,
      edit_detail_img: false,
      edit_detail: false,
      edit_schedule: false,
      edit_max_tourist: false,
      edit_date_first: false,
      edit_date_second: false,
    };
  },
  mounted() {
    this.getToursDetail(this.$route.params.id);
  },
  methods: {
    getToursDetail(tourId) {
      axios
        .get(`https://xzd0nvjr64.execute-api.us-east-1.amazonaws.com/admin/update?tourId=${tourId}`)
        .then(response => {
          this.details = response.data;
        })
        .catch(error => {
          this.error = error.response.data.message;
        });
    },

    updateName() {
      this.edit_tour_name = true;
    },
    updateProvince() {
      this.edit_province = true;
    },
    updatePrice(price) {
      this.edit_price = true;
    },
    updateImg(img) {
      this.edit_img = true;
    },
    updateDetail_img(detail_img) {
      this.edit_detail_img = true;
    },
    updateDetail(detail) {
      this.edit_detail = true;
    },
    updateSchedule(schedule) {
      this.edit_schedule = true;
    },
    updateMax_tourist(max_tourist) {
      this.edit_max_tourist = true;
    },
    updateDate_first(date_first) {
      this.edit_date_first = true;
    },
    updateDate_second(date_second) {
      this.edit_date_second = true;
    },

    saveName(name) {
      this.name = name
      this.edit_name = false;
    },
    saveProvince(province) {
      this.province = province
      this.edit_province = false;
    },
    savePrice(price) {
      this.price = price
      this.edit_price = false;
    },
    saveImg(img) {
      this.img = img
      this.edit_img = false;
    },
    saveDetail_img(detail_img) {
      this.detail_img = detail_img
      this.edit_detail_img = false;
    },
    saveDetail(detail) {
      this.detail = detail
      this.edit_detail = false;
    },
    saveSchedule(schedule) {
      this.schedule = schedule
      this.edit_schedule = false;
    },
    saveMax_tourist(max_tourist) {
      this.max_tourist = max_tourist
      this.edit_max_tourist = false;
    },
    saveDate_first(date_first) {
      this.date_first = date_first
      this.edit_date_first = false;
    },
    saveDate_second(date_second) {
      this.date_second = date_second
      this.edit_date_second = false;
    },
    check() {
      if (this.tour_name === '') {
        this.tour_name = this.details[0].tour_name
      }
      if (this.province === "") {
        this.province = this.details[0].province
      }
      if (this.price === 0) {
        this.price = this.details[0].price
      }
      if (this.img === "") {
        this.img = this.details[0].img
      }
      if (this.detail_img === "") {
        this.detail_img = this.details[0].detail_img
      }
      if (this.detail === "") {
        this.detail = this.details[0].detail
      }
      if (this.schedule === "") {
        this.schedule = this.details[0].schedule
      }
      if (this.max_tourist === 0) {
        this.max_tourist = this.details[0].max_tourist
      }
      if (this.date_first === "") {
        this.date_first = this.details[0].date_first
      }
      if (this.date_second === "") {
        this.date_second = this.details[0].date_second
      }
    },
    submit() {
      this.check()
      axios
        .put("https://xzd0nvjr64.execute-api.us-east-1.amazonaws.com/admin/update" , {
          tour_name: this.tour_name,
          province: this.province,
          price: this.price,
          img: this.img,
          detail_img: this.detail_img,
          detail: this.detail,
          schedule: this.schedule,
          max_tourist: this.max_tourist,
          date_first: this.date_first,
          date_second: this.date_second,
          tourId: this.details[0].tourId,
        })
        .then((response) => {
          this.$router.push({ name: "manage" });
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  }
};
</script>
