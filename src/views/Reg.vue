<template>
  <div class="login">
    <div class="logo">
      Sentence
    </div>
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
          @cancel="show = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <van-cell
        is-link
        @click="show = true"
        title="First Language"
        :value="first_language"
      ></van-cell>
      <van-cell title="Gender  (for avatar)"> </van-cell>
      <van-radio-group class="gender" v-model="gender">
        <van-cell-group>
          <van-cell title="female" clickable @click="gender = 'female'">
            <van-radio name="female" />
          </van-cell>
          <van-cell title="male" clickable @click="gender = 'male'">
            <van-radio name="male" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div class="policy center">
        By clicking Join now, you agree to Sentences' User Agreement, Privacy
        Policy, and Cookie Policy
      </div>
      <div class="btn">
        <van-button round block type="info" native-type="submit"
          >Join Now</van-button
        >
        <van-cell :title="info" size="large" />
      </div>
    </van-form>

    <div class="center" @click="$router.go(-1)">
      Already have an account? Sign in
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
      gender: "female",
      password: "",
      info: "",
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
      values.gender = this.gender;
      values.first_language = this.first_language;
      request({
        url: "/users",
        method: "post",
        data: values,
      }).then((response) => {
        if (response.code == 200) {
          this.info = "Sign up successfully.";
          this.$router.push("/login");
        } else {
          this.info = "User exsited.";
        }
      });
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
.title {
  font: 1.5em sans-serif;
  text-align: center;
  margin-bottom: 30px;
}
.logo {
  font: 2em sans-serif;
  text-align: center;
  margin-bottom: 30px;
}
.gender {
  margin-left: 5em;
}
.policy {
  color: darkgray;
  font: 0.8em sans-serif;
  margin: 1em;
}
.center {
  text-align: center;
}
</style>
