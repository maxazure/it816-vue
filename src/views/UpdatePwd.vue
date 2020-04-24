<template>
  <div class="me">
    <van-nav-bar title="Updating" fixed placeholder />

    <van-form @submit="onSubmit">
      <van-field
        v-model="password"
        name="password"
        label="Password"
        placeholder="password"
        :rules="[{ required: true, message: 'password required' }]"
      />

      <div style="margin: 16px; text-align:center;">
        <van-button round block type="info" native-type="submit">Update</van-button>
      </div>
    </van-form>
    <div style="margin: 16px; text-align:center;">
      <van-button plain round block type="info" @click="$router.go(-1)">Cancel</van-button>
    </div>
  </div>
</template>
<script>
import { getUser } from "@/utils/auth";
import request from "@/utils/request";
export default {
  name: "updatepws",
  data() {
    return {
      password: ""
    };
  },
  methods: {
    onSubmit(values) {
      let user = getUser();
      request({
        url: "/users/" + user.id,
        method: "put",
        data: values
      }).then(response => {
        if (response.code == 200) {
          this.$router.go(-1);
        } else {
          this.info = "User exsited.";
        }
      });
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
          this.name = response.data.name;
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
</style>
