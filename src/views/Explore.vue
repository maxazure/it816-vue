<template>
  <div class="explore">
    <van-nav-bar title="Explore" fixed placeholder />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="No more qustions."
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
        @click="onClick(item.id)"
        :label="' [' + item.user_name + '] asks for pronunciation'"
        :title="item.sentence_en"
      >
        <template #icon>
          <van-image
            round
            width="5rem"
            height="5rem"
            style="margin-right: 12px"
            :src="item.avatar"
          />
        </template>
      </van-cell>

      <!-- <div v-for="item in list" :key="item.id" @click="onClick(item.id)">
        <div>
          <van-image
            round
            width="5rem"
            height="5rem"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />{{ item.name_en }}循环出来的数据
        </div>
      </div> -->
    </van-list>
  </div>
</template>
<script>
import router from "../router";
import request from "@/utils/request";
export default {
  name: "explore",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    onClick(id) {
      this.$router.push(`/answer/${id}`);
    },

    onLoad() {
      this.loading = true;
      request({
        url: "/explore",
        method: "get",
      })
        .then((response) => {
          if (response.code == 200) {
            console.log(response.data);
            this.list = response.data;
          }
        })
        .finally(() => {
          this.loading = false;
          this.finished = true;
        });
    },
  },
  mounted() {},
};
</script>

<style>
.van-nav-bar {
  background-color: #1989fa;
}
.van-nav-bar__title {
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
}
.van-nav-bar__text {
  color: #ddd;
}
.van-nav-bar .van-icon {
  color: #fff;
}
</style>
