<template>
  <div class="library">
    <van-nav-bar
      title="Catalog"
      fixed
      placeholder
      right-text="New catalog"
      @click-right="onClickRight"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="No more catelog."
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        icon="description"
        :key="item.id"
        :title="item.name_en"
        :label="item.description"
        is-link
        @click="onClick(item.id)"
      />
    </van-list>
  </div>
</template>
<script>
import router from "../router";
import request from "@/utils/request";
export default {
  name: "library",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    onClick(id) {
      this.$router.push(`/catalogs/list/${id}`);
    },
    onClickRight() {
      this.$router.push("/catalogs/new");
    },
    onLoad() {
      this.loading = true;
      request({
        url: "/catalogs",
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
