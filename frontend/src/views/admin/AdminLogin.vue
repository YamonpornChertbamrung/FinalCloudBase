<template>
    <section class="section" id="app">
        <div class="container-fluid mb-3 mt-2 font">
            <div
                class="card mx-auto position-absolute top-50 start-50 translate-middle shadow-sm p-3 mb-5 bg-body rounded card-w">
                <img src="https://cdn.discordapp.com/attachments/876025140490698753/1054368171223683172/PaaPai.png"
                    width="167" height="189" class="card-img-top logo" alt="LOGO_PaaPai">
                <div class="card-body mx-4">
                    <form class="needs-validation" novalidate @submit.prevent="submit" method="post">
                        <div class="mb-3">
                            <label for="validationCustomUsername" class="form-label">Username</label>
                            <input class="form-control" id="validationCustomUsername" aria-describedby="emailHelp" required
                                name="username" v-model="username">
                            <div class="invalid-feedback">
                                Please input your username.
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" required name="password"
                                v-model="password">
                            <div class="invalid-feedback">
                                Please input your password.
                            </div>
                        </div>
                        <div class="d-grid col mx-auto">
                            <button class="btn btn-primary" type="submit">เข้าสู่ระบบ</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script>
import axios from "axios";
import router from "../../router";
// @ is an alias to /src
export default {
    name: "Login",
    data() {
        return {
            username: '',
            password: '',
            result: '',
        };
    },
    mounted() {
    },
    methods: {
        submit() {
            axios
                .post("https://xzd0nvjr64.execute-api.us-east-1.amazonaws.com/admin/login", { username: this.username, password: this.password })
                .then(response => {
                    console.log(response.data)
                    if (response.data !== 'invalid' && response.data !== null) {
                        this.$router.push({ name: 'home'})
                    } else if (response.data === 'invalid') {
                        alert("User is Invalid")
                        this.username = ''
                        this.password = ''
                    }
                })
                .catch(err => {
                    console.log(err);
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

.logo {
    object-fit: contain;
}

.card-w {
    width: 25rem;
}
</style>
  