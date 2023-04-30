<template>
  <div id="app">
    <div class="container-fluid mb-3 mt-2 font">
      <div
        class="card mx-auto position-absolute top-50 start-50 translate-middle shadow-sm p-3 mb-5 bg-body rounded card-w"
      >
        <img
          src="https://cdn.discordapp.com/attachments/876025140490698753/1054368171223683172/PaaPai.png"
          width="167"
          height="189"
          class="card-img-top logo"
          alt="LOGO_PaaPai"
        />
        <div class="card-body mx-4">
          <form
            class="needs-validation"
            novalidate
            @submit.prevent="submit"
            method="post"
          >
            <div class="mb-3">
              <label class="form-label">ID:</label>
              <input
                class="form-control"
                required
                name="userId"
                v-model="userId"
              />
              <span
                ><p v-if="errors.length">
                  <span
                    v-for="error in errors"
                    :key="error.key"
                    style="color:red;"
                    >{{ error }}</span
                  >
                </p></span>
              <div class="invalid-feedback">
                Please input your Id.
              </div>
            </div>
            <div class="d-grid col mx-auto">
              <button class="btn btn-primary fs-5" type="submit">
                ตรวจเช็คสถานะการจองทัวร์
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// @ is an alias to /src
export default {
  name: "StatusCheck",
  data() {
    return {
      search: "",
      tours: [],
      userId: "",
      msg: [],
      errors: []
    };
  },
  mounted() {
    // this.getTours(this.$route.params);
  },
  methods: {
    submit(e) {
      e.preventDefault();
      if (this.userId && this.userId.length ) {
        axios
          .post(`https://xzd0nvjr64.execute-api.us-east-1.amazonaws.com/tour/check`, {
            userId: this.userId
          })
          .then(response => {
            this.$router.push({
              name: "status",
              params: { id: response.data }
            });
          })
          .catch(err => {
            console.log(err);
          });
      }

      this.errors = [];

      if (!this.userId.length ) {
        this.errors.push(" Id is Incorrect!");
      }
    },
    computed: {
      errors: function() {
        if (!this.userId) {
          return [" Id is Incorrect!"];
        }
        else {
          return [];
        }
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
</style>
