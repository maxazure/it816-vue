<template>
  <div class="catalogs">
    <van-nav-bar title="New catalog" fixed placeholder left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="name_en"
        name="name_en"
        label="Title"
        placeholder="Title"
        :rules="[{ required: true, message: 'title required' }]"
      />
      <van-field v-model="name_cn" name="name_cn" label="Chinese" placeholder="Title" />
      <van-field
        v-model="description"
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
import { getUser } from "@/utils/auth";
export default {
  name: "newcatalog",
  data() {
    return {
      name_cn: "",
      name_en: "",
      description: ""
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
        url: "/catalogs",
        method: "post",
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
  }
};
</script>