<template>
  <div class="login">
    <div  class="logo"><img src="../assets/logo.png" alt="Shadowing Language Partner"></div>
<van-form @submit="onSubmit">
  <van-field
    v-model="email"
    name="email"
    label="Email"
    placeholder="Email"
    :rules="[{ required: true, message: 'Email is required.' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="password"
    label="Password"
    placeholder="Password"
    :rules="[{ required: true, message: 'Password is required.' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">
      Login
    </van-button>
    <van-cell :title="info" size="large" />
  </div>
</van-form>
 <div style="margin: 16px;">
    <van-button round block plain type="info" @click="onSignup">
      Sign Up
    </van-button>
  </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import { setToken, setUser } from '@/utils/auth'
export default {
     name: 'login',
  data() {
    return {
      email: 'maxazure@gmail.com',
      password: 'test',
      info: '',
    };
  },
  methods: {
    onSignup(){
      this.$router.push('/signup')
    },
    onSubmit(values) {
      console.log('submit', values);
      // request.post("/api/auth/login",values)
      // .then(response => (this.info = response))
        request({
        url: "/auth/login",
        method: 'post',
        data: values
        }).then(response => {
          if(response.code == 200){
            setToken(response.data.token)
            setUser(response.data.user)
            localStorage.max_login = true;
             this.info = "Login successfully."
            this.$router.push('/home');
          }else{
            this.info = "Email or Password was wrong."
          }

        })
    },
  },
};
</script>

<style>
.login {
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    background: #fff;
}
.logo {
    text-align: center;
}

</style>
