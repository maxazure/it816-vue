<template>
  <div class="sententces">
    <van-nav-bar
      title="Answering a question"
      fixed
      placeholder
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="sententce.sentence_en"
        name="sentence_en"
        label="Question"
        placeholder="Sentence"
        autosize
        type="textarea"
        rows="4"
        readonly
        maxlength="650"
        show-word-limit
        :rules="[{ required: true, message: 'English Sentence required.' }]"
      />
      <van-field
        v-model="sentence_cn"
        name="sentence_cn"
        label="Answer"
        placeholder="Sentence"
        autosize
        rows="8"
        type="textarea"
        maxlength="650"
        show-word-limit
        :rules="[{ required: true, message: 'Answer required.' }]"
      />

      <van-cell title="Audio upload">
        <input
          type="file"
          name="audio_url"
          @change="tirggerFile($event)"
          accept="audio/*;capture=microphone"
        />
      </van-cell>
      <van-cell class="desc"
        >Only allow to upload mp3 or using Recorder.</van-cell
      >

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
  name: "editententces",
  data() {
    return {
      sententce: {
        sentence_en: "",
      },
      sentence_cn: "",
      mp3_file_url: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    tirggerFile(event) {
      let file = event.target.files[0];
      console.log(this.mp3_file);

      let param = new FormData(); // 创建form对象
      param.append("file", file, file.name); // 通过append向form对象添加数据
      console.log(param.get("file")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      request({
        url: "/upload",
        method: "post",
        data: param,
      }).then((response) => {
        if (response.code == 200) {
          this.mp3_file_url = response.data;
          console.log(response);
        } else {
          console.log(response);
        }
      });
    },
    onSubmit(values) {
      let user = getUser();
      if (this.mp3_file_url != "") {
        values.audio_url = this.mp3_file_url;
      }
      values.anwser_id = user.id;
      values.answered = true;
      console.log(this.values);
      request({
        url: "/explore/" + this.$route.params.id,
        method: "put",
        data: values,
      }).then((response) => {
        this.$router.go(-1);
      });
    },
  },
  mounted() {
    console.log(this.$route.params.id);
    this.loading = true;
    request({
      url: "/explore/" + this.$route.params.id,
      method: "get",
    })
      .then((response) => {
        if (response.code == 200) {
          console.log(response.data);
          this.sententce = response.data;
        }
      })
      .finally(() => {
        this.loading = false;
        this.finished = true;
      });
  },
};
</script>
<style>
.desc div {
  color: #999;
  text-align: center;
}
</style>
