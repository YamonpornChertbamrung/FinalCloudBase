<template>
  <div id="app">
    <div class="container p-3 font">
      <div class="filter"></div>
      <div class="row">
        <div class="col-7">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="ค้นหาทัวร์"
              v-model="search"
            />
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="bi bi-search"></i></span>
            </div>
          </div>
        </div>
        <div class="col-3">
          <select v-model="sorted" class="mx-3 form-select">
            <option value="">🏷️ตัวกรอง</option>
            <option value="sortID">รวมแพ็กเกจทัวร์</option>
            <option value="price">ราคาถูกที่สุด</option>
            <option value="max">ราคาแพงที่สุด</option>
          </select>
        </div>
        <div class="col-2">
          <router-link class="btn btn-primary float-end" :to="`/statusUser`"
            ><span
              >เช็คสถานะการจองทัวร์<i class="bi bi-check2-square ml-1"></i
            ></span>
          </router-link>
        </div>
      </div>
      <div class="mt-3">
        <div class="row" v-if="search == ''">
          <div v-if="sorted == ''" class="row ">
            <h4 class="mb-2">รวมแพ็กเกจทัวร์</h4>
          </div>
        </div>
        <div class="row my-2" v-if="search != ''">
          <h5>Result of "{{ search }}"</h5>
        </div>
        <!-- <h4 class="mb-2">รวมแพ็กเกจทัวร์</h4> -->
        <div class="row">
          <div class="col-4" v-for="tour in filteredTours" :key="tour.id">
            <img
              :src="tour.img"
              class="card-img-top"
              style="width:100%; "
              alt="..."
            />
            <div class="card-body my-2">
              <h5 class="card-title">{{ tour.tour_name }}</h5>
              <hr />
              <div class="d-flex my-2">
                <i class="bi bi-geo-alt"></i>
                <p class="card-text mx-2">{{ tour.province }}</p>
              </div>
              <div class="row">
                <div class="col-6">
                  <p>ราคาเริ่มต้น</p>
                </div>
                <div class="col-6 text-end">
                  <p>{{ tour.price }} <span class="ml-2">THB</span></p>
                </div>
              </div>
              <div class="text-end mb-3">
                <router-link class="btn btn-primary" :to="`/tour/${tour.tourId}`"
                  >รายละเอียดเพิ่มเติม
                </router-link>
              </div>
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
  name: "Tour",
  data() {
    return {
      search: "",
      tours: [],
      sorted: ""
      // like: this.$route.body.like,
    };
  },
  mounted() {
    this.getTours();
  },
  watch: {
    search(value) {
      this.doSearch(value);
    }
  },
  computed: {
    filteredTours() {
      function comparePrice(a, b) {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        } else {
          return 0;
        }
      }

      function compareMax(a, b) {
        if (a.price < b.price) {
          return 1;
        } else if (a.price > b.price) {
          return -1;
        } else {
          return 0;
        }
      }

      function compareID(a, b) {
        if (a._id < b._id) {
          return -1;
        } else if (a._id > b._id) {
          return 1;
        } else {
          return 0;
        }
      }

      let res = this.tours.filter(post => {
        return post.tour_name.toLowerCase().includes(this.search.toLowerCase());
      });

      if (this.sorted == "" && this.search != "") {
        return res;
      } else if (this.sorted == "price") {
        return res.sort(comparePrice);
      } else if (this.sorted == "max") {
        return res.sort(compareMax);
      } else if (this.sorted == "sortID") {
        return res.sort(compareID);
      } else {
        return this.tours;
      }
    }
  },
  methods: {
    getTours() {
      
      axios

        .get("https://xzd0nvjr64.execute-api.us-east-1.amazonaws.com/tour/gettour")
        .then(response => {
          this.tours = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    doSearch(value) {
      axios
        .get("https://xzd0nvjr64.execute-api.us-east-1.amazonaws.com/tour/gettour" + this.search)
        .then(response => {
          this.tours = response.data;
        })
        .catch(e => console.log(e));
    },
    filter() {}
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap");
.font {
  font-family: "Kanit", sans-serif;
}

.filter {
  display: flex;
  justify-content: center;
  width: 100%;
}

.province {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 50%;
}
</style>
