<template>
  <div class="me">
    <van-nav-bar title="User Center" fixed placeholder />
    <div class="avatar-wrapper">
      <img v-bind:src="user.avatar" />
      <div class="user-info">
        <span v-html="user.name"></span>
      </div>
    </div>
    <div class="list">
      <van-cell
        title="Name"
        icon="manager"
        :value="user.name"
        is-link
        @click="$router.push('/updateinfo')"
      ></van-cell>
      <van-cell title="Email" icon="invition" :value="user.email"></van-cell>
      <van-cell title="My Language" icon="location" :value="user.first_language"></van-cell>
      <van-cell title="Intro" icon="comment" is-link @click="$router.push('/updateintro')"></van-cell>
      <van-cell :value="user.intro"></van-cell>
      <van-cell title="Change password" icon="setting" is-link @click="$router.push('/updatepwd')"></van-cell>
      <van-cell title="Logout" icon="fire" is-link @click="onClickLogout"></van-cell>
    </div>
  </div>
</template>
<script>
import { removeToken } from "@/utils/auth";
import request from "@/utils/request";
export default {
  name: "me",
  data() {
    return {
      user: {}
    };
  },
  methods: {
    onClickLogout() {
      removeToken();
      this.$router.push("/login");
    }
  },
  mounted() {
    this.loading = true;
    request({
      url: "/auth/userinfo",
      method: "get"
    })
      .then(response => {
        if (response.code == 200) {
          console.log(response.data);
          this.user = response.data;
        }
      })
      .finally(() => {
        this.loading = false;
        this.finished = true;
      });
  }
};
</script>

<style>
.avatar-wrapper {
  display: flex;
  position: relative;
  padding-left: 30%;
  padding-top: 36px;
  height: 165px;
  background-image: url(../assets/ucbg.png);
  background-size: cover;
  background-position: center;
  text-align: center;
}
.avatar-wrapper img {
  border: 1px solid #fff;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 19px;
  background-color: azure;
}
.avatar-wrapper .user-info {
  margin-top: 38px;
}
.avatar-wrapper .user-info span {
  font-size: 16px;
  color: #ffffff;
}
</style>
