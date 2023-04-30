<template>
  <div id="app">
    <div class="container-fluid mb-3 mt-2 font"  v-for="info in info" 
      :key="info.userId">
      <h1>ยืนยันการจอง</h1>
      <hr />
      <div class="card shadow-sm p-1 my-3 bg-body rounded">
        <div class="card-body">
          <div class="detail">
            <h4>{{ info.tour_name }}</h4>
            <div class="row my-3">
              <div class="row">
                <div class="col-1">
                  <p>จังหวัด</p>
                </div>
                <div class="col-2">
                  <p>{{ info.province }}</p>
                </div>
                <div class="col-1">
                  <p>ราคา</p>
                </div>
                <div class="col-1">
                  <p>{{ info.price }}</p>
                </div>
                <div class="col-1">
                  <p>บาท/ท่าน</p>
                </div>
                <div class="col-1">
                  <p>วันที่เดินทาง</p>
                </div>
                <div class="col-5">
                  <p>{{ info.date }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-1">
                  <p>ผู้เดินทาง</p>
                </div>
                <div class="col-1">
                  <p>{{ info.total_tourist }}</p>
                </div>
                <div class="col-1">
                  <p>คน</p>
                </div>
                <div class="col-1">
                  <p>ราคารวม</p>
                </div>
                <div class="col-1">
                  <p>{{ info.total_tourist * info.price }}</p>
                </div>
                <div class="col-3">
                  <p>บาท</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card shadow-sm p-1 bg-body rounded">
        <div class="card-body">
          <p>ข้อมูลผู้ติดต่อ</p>
          <div class="row">
            <div class="col-4">
              <div class="row">
                <p class="col-3">ชื่อ-นามสกุล</p>
                <p class="col-3">{{ info.firstname }}</p>
                <p class="col">{{ info.lastname }}</p>
              </div>
            </div>
            <div class="col-4">
              <div class="row">
                <p class="col-3">อีเมล</p>
                <p class="col">{{ info.email }}</p>
              </div>
            </div>
            <div class="col-4">
              <div class="row">
                <p class="col-3">โทรศัพท์</p>
                <p class="col">{{ info.phone }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-3 shadow-sm p-1 bg-body rounded">
        <div class="card-body">
          <p style="color: #2b99ff">ข้อตกลงและเงื่อนไข</p>
          <p>
            ข้อตกลงและเงื่อนไขของ PaaPai.com <br />
            ยินดีต้อนรับสู่เว็บไซต์ PaaPai.com ("ไซต์")
            เจ้าของและผู้จัดการเวปไซต์ของเราคือ Still Avile Co. , Ltd. ("เรา",
            "พวกเรา" หรือ "ของเรา") <br />
            ต้องอ่านข้อกำหนดและเงื่อนไขข้างล่างนี้ก่อนการใช้เวปไซต์นี้
            การใช้งานเว็บไซต์นี้แสดงถึงการยอมรับข้อกำหนดและเงื่อนไขดังนี้
            <br />
            โปรดอ่านข้อกำหนดและเงื่อนไขรวมถึงนโยบายความเป็นส่วนตัวของเรา
            (เรียกรวมกันว่า "ข้อตกลง") และคำถามที่พบบ่อยด้านล่างอย่างละเอียด
            ก่อนที่จะเข้าถึงเว็บไซต์นี้และ/หรือก่อนการจอง
            (ทั้งหมดที่กำหนดไว้ด้านล่าง) <br />
            เพื่อให้เข้าใจสิทธิและภาระผูกพันของคุณ
            คุณตกลงที่จะผูกพันตามกฎหมายโดยข้อกำหนดเหล่านี้เมื่อมีการเข้าถึงและ/หรือการใช้เว็บไซต์นี้
            หากคุณไม่ยอมรับข้อกำหนดเหล่านี้โปรดออกจากเว็บไซต์และหยุดการใช้งานเว็บไซต์
            และบริการทันทีและไม่ทำการจองใด ๆ ผ่านทางเว็บไซต์ <br />
            1. ข้อกำหนดและเงื่อนไขของเว็บไซต์ <br />
            2. ข้อกำหนดและเงื่อนไขการจองออนไลน์; และ <br />
            3. ข้อกำหนดและเงื่อนไขของผู้ใช้ออนไลน์และบัญชีของฉัน <br />
            โปรดทราบว่าเราอาจเปลี่ยนแปลง แก้ไข
            เพิ่มและลบข้อกำหนดเหล่านี้ได้ตลอดเวลาโดยไม่ต้องแจ้งให้ทราบล่วงหน้า
            ต้องอ่านข้อกำหนดเป็นระยะ
            หากมีการใช้งานเว็บไซต์หลังจากการเปลี่ยนแปลงข้อกำหนดเหล่านี้
            ถือว่าผู้เยี่ยมชม ผู้ใช้งาน หรือผู้ใช้ที่ลงทะเบียน ("คุณ" หรือ
            "ผู้ใช้") เห็นด้วยและยินยอมต่อการเปลี่ยนแปลง
            หากคุณใช้บริการอื่นใดของเรา
            การใช้งานของคุณจะขึ้นอยู่กับการส่งและการยอมรับข้อกำหนดและเงื่อนไขของบริการดังกล่าว
          </p>
        </div>
      </div>
      <div class="form-check mt-3">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"  v-model="confirm" />
        <label class="form-check-label" for="flexCheckDefault">
          ข้าพเจ้าขอยืนยันว่าได้อ่านและยอมรับ ข้อกำหนดและเงื่อนไข และ
          นโยบายความเป็นส่วนตัว ของ PaaPai ทุกประการ
        </label>
      </div>
      <div class="row justify-content-center mt-4">
        <div class="col-1">
          <a href="/" type="button" class="btn btn-danger mx-3">ยกเลิก</a>
        </div>
        <div class="col-1">
          <!-- <router-link class="btn btn-primary" type="button" :to="`/form/${info.bookingId}/payment`">ชำระเงิน
          </router-link> -->
          <button class="btn btn-primary"  @click="submit(info.userId)">ชำระเงิน</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { MDBContainer } from "mdb-vue-ui-kit";
import axios from "axios";

export default {
  name: "Confirm",
  data() {
    return {
      search: "",
      info: [],
      confirm:'',
    };
  },
  mounted() {
    this.getConfirmDetail(this.$route.params.id);
  },
  methods: {
    getConfirmDetail(userId) {
      axios
        .get(`https://xzd0nvjr64.execute-api.us-east-1.amazonaws.com/tour/confirm?userId=${userId}`)
        .then((response) => {
          this.info = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    submit(Id){
      if (this.confirm) {
      axios
        .get(`https://xzd0nvjr64.execute-api.us-east-1.amazonaws.com/tour/payment?userId=${Id}`)
        .then(response => {
            this.$router.push({
              name: "payment",
              // params: { id: response.data }
            });
          })
        .catch((error) => {
          this.error = error.response.data.message;
        });
      }
      if (!this.confirm) {
        // this.errors.push("Booking Id is required.");
        alert('กรุณากดยอมรับเงื่อนไขและนโยบายความเป็นส่วนตัวของ PaaPai')
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');
.font {
  font-family: "Kanit", sans-serif;
}
</style>
