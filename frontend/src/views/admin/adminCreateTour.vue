<template>
  <div class="container">
    <section class="section" id="app">
      <div class="d-flex justify-content-center">
        <div class="card" style="width: 60%">
          <div class="card-body">
            <form @submit.prevent="submit" class="m-4" method="POST">
              <div class="mb-3">
                <label class="form-label">ชื่อทัวร์</label>
                <input type="text" name="tour_name" v-model="tour_name" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">จังหวัด</label>
                <input type="text" name="province" v-model="province" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">ราคา</label>
                <input type="text" name="price" v-model="price" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">รายละเอียด</label>
                <input type="text" name="detail" v-model="detail" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">ตารางการเดินทาง</label>
                <input type="text" name="schedule" v-model="schedule" class="form-control" />
              </div>

              <label class="form-label">วันที่เดินทาง</label>
              <div class="mb-3">
                <label for="example-datepicker">ครั้งที่1</label>
                <b-form-datepicker id="example-datepicker" class="mb-2" locale="en" name="date_first" v-model="date_first"></b-form-datepicker>
              </div>
              <div class="mb-3">
                <label for="example-datepicker">ครั้งที่2</label>
                <b-form-datepicker name="date_second" class="mb-2" locale="en" v-model="date_second" ></b-form-datepicker>
              </div>
              <div class="mb-3">
                <label class="form-label">ภาพปก</label>
                <input type="text" name="img" class="form-control" v-model="img"/>
              </div>
              <div class="mb-3">
                <label class="form-label">ภาพรายละเอียด</label>
                <input type="text" name="detail_img" class="form-control" v-model="detail_img"/>
              </div>
              <div class="mb-3">
                <label class="form-label">จำนวนผู้เดินทาง</label>
                <input type="text" name="max_tourist" class="form-control" v-model="max_tourist"/>
              </div>

              <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                <router-link class="btn btn-secondary" :to="`/admin/manage`">ยกเลิก</router-link>
                <button class="btn btn-info" type="submit">สร้างทัวร์</button>
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
  name: "Create",
  data() {
    return {
      details: [],
      value: "",
      value2: "",
      tour_name: "",
      img: "",
      detail_img: "",
      province: "",
      price: "",
      detail: "",
      schedule: "",
      max_tourist: "",
      date_first: "",
      date_second:"",e
    };
  },
  mounted() {
    // this.getTours();
  },
  methods: {
    submit() {
      axios
          .post(
            "https://xzd0nvjr64.execute-api.us-east-1.amazonaws.com/admin/createtour",
            {
              tour_name: this.tour_name,
              img: this.img,
              detail_img: this.detail_img,
              province: this.province,
              price: this.price,
              detail: this.detail,
              schedule: this.schedule,
              max_tourist: this.max_tourist,
              date_first: this.date_first,
              date_second:this.date_second
              
            }
          )
          .then(response=> {
            this.$router.push({ name: "manage" });
            console.log(response.data)
            // console.log("hi")
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
};
</script>
