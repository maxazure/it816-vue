<template>
  <div class="catalogs">
    <van-nav-bar title="Editing catalog" fixed placeholder left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="catalog.name_en"
        name="name_en"
        label="Title"
        placeholder="Title"
        :rules="[{ required: true, message: 'title required' }]"
      />
      <van-field v-model="catalog.name_cn" name="name_cn" label="Chinese" placeholder="Title" />
      <van-field
        v-model="catalog.description"
        name="description"
        label="Description"
        placeholder="description"
        autosize
        type="textarea"
        rows="4"
        maxlength="150"
        show-word-limit
      />

      <div style="margin: 16px; text-align:center;">
        <van-button round type="info" native-type="submit">submit</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import request from "@/utils/request";
import { Toast } from "vant";
export default {
  name: "editcatalog",
  data() {
    return {
      catalog: {
        name_cn: "",
        name_en: "",
        description: ""
      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSubmit(values) {
      let user = getUser();
      values.user_id = user.id;

      request({
        url: "/catalogs/" + this.$route.params.id,
        method: "put",
        data: values
      }).then(response => {
        if (response.code == 200) {
          console.log(response);
          this.$router.go(-1);
        } else {
          console.log(response);
        }
      });
    }
  },
  mounted() {
    this.loading = true;
    request({
      url: "/catalogs/" + this.$route.params.id,
      method: "get"
    })
      .then(response => {
        if (response.code == 200) {
          console.log(response.data.list);
          this.catalog = response.data;
        }
      })
      .finally(() => {
        this.loading = false;
        this.finished = true;
      });
  }
};
</script>