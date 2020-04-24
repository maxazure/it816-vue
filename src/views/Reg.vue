<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.png" alt="Shadowing Language Partner" />
    </div>
    <div class="title">Sign Up</div>
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
      <van-field
        v-model="name"
        name="name"
        label="Nickname"
        placeholder="Name"
        :rules="[{ required: true, message: 'Name is required.' }]"
      />
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-picker
          show-toolbar
          confirm-button-text="OK"
          cancel-button-text="Cancel"
          :columns="first_languages"
          @change="onSelect"
          @cancel="show=false"
          @confirm="onConfirm"
        />
      </van-popup>
      <van-cell is-link @click="show=true" title="first_language" :value="first_language"></van-cell>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">Sign Up Now</van-button>
        <van-cell :title="info" size="large" />
      </div>
    </van-form>
    <div style="margin: 16px;">
      <van-button round block plain type="info" @click="$router.go(-1);">Back</van-button>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
import { setToken, setUser } from "@/utils/auth";
export default {
  name: "login",
  data() {
    return {
      show: false,
      name: "",
      first_languages: ["Chinese", "English"],
      first_language: "",
      email: "",
      password: "",
      info: ""
    };
  },
  methods: {
    onConfirm(item) {
      this.first_language = item;
      this.show = false;
    },
    onSelect(picker, item, index) {
      this.first_language = item;
    },
    onSubmit(values) {
      console.log("submit", values);
      values.first_language = this.first_language;
      request({
        url: "/users",
        method: "post",
        data: values
      }).then(response => {
        if (response.code == 200) {
          this.info = "Sign up successfully.";
          this.$router.push("/login");
        } else {
          this.info = "User exsited.";
        }
      });
    }
  }
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
.title {
  font: 2em sans-serif;
  text-align: center;
  margin-bottom: 30px;
}
.logo {
  text-align: center;
}
</style>
