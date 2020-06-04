<template>
  <div class="home">
    <van-nav-bar
      title="My Sentences"
      fixed
      placeholder
      right-text="New Sentence"
      @click-right="onClickRight"
    />
    <van-tabs sticky offset-top="46">
      <van-tab title="Completed">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="No more."
          @load="onLoad"
        >
          <van-cell
            v-for="item in list"
            :key="item.id"
            :title="item.title"
            is-link
            @click="onClick(item.id)"
          />
        </van-list>
      </van-tab>
      <van-tab title="Unanswered">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="No more."
          @load="onLoad"
        >
          <van-cell
            v-for="item in list1"
            :key="item.id"
            :title="item.sentence_en"
            is-link
            @click="onClick(item.id)"
          />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  name: "home",
  data() {
    return {
      list: [],
      list1: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    onLoad() {
      this.loading = true;
      request({
        url: "/sentences?answered=true",
        method: "get",
      })
        .then((response) => {
          if (response.code == 200) {
            console.log(response.data.list);
            this.list = response.data.list;
          }
        })
        .finally(() => {
          this.loading = false;
          this.finished = true;
        });
      this.loading = true;
      request({
        url: "/sentences?answered=false",
        method: "get",
      })
        .then((response) => {
          if (response.code == 200) {
            console.log(response.data.list);
            this.list1 = response.data.list;
          }
        })
        .finally(() => {
          this.loading = false;
          this.finished = true;
        });
    },
    onRefresh(index) {
      this.list[index].finished = false;
      this.onLoad(index);
    },
    onClickRight() {
      this.$router.push("/newsentence");
    },
    onClick(id) {
      this.$router.push(`/showsentence/${id}`);
    },
  },
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
