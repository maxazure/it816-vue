<template>
  <div class="index">

    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/home" icon="home-o">Home</van-tabbar-item>
      <van-tabbar-item replace to="/library" icon="points">Libray</van-tabbar-item>
      <van-tabbar-item replace to="/me" icon="user-circle-o">Me</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Toast } from 'vant';

export default {
    name: "index",
     data() {
    return {
        active: 0,
      };
    },
    methods: {
    onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },
  },
};
</script>

<style>

</style>
