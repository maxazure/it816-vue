<template>
  <div class="sententces">
    <van-nav-bar title="Editing Sentence" fixed placeholder left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="sententce.title"
        name="title"
        label="Title"
        placeholder="Title"
        :rules="[{ required: true, message: 'Sentence title required' }]"
      />
      <van-field
        v-model="sententce.sentence_en"
        name="sentence_en"
        label="English Sentence"
        placeholder="Sentence"
        autosize
        type="textarea"
        rows="4"
        maxlength="650"
        show-word-limit
        :rules="[{ required: true, message: 'English Sentence required.' }]"
      />
      <van-field
        v-model="sententce.sentence_cn"
        name="sentence_cn"
        label="Chinese Sentence"
        placeholder="Sentence"
        autosize
        type="textarea"
        maxlength="150"
        show-word-limit
      />
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-picker
          show-toolbar
          confirm-button-text="OK"
          cancel-button-text="Cancel"
          :columns="catalogs"
          @change="onSelect"
          @cancel="show = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <van-cell is-link @click="show=true" title="Catalog" v-model="catalog_name"></van-cell>

      <van-cell title="Audio upload">
        <input
          type="file"
          name="audio_url"
          @change="tirggerFile($event)"
          accept="audio/*;capture=microphone"
        />
      </van-cell>

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
      show: false,
      catalog_name: "",
      catalog_id: null,
      catalogs: [],
      sententce: {
        sentence_en: "",
        sentence_cn: ""
      },
      mp3_file_url: ""
    };
  },
  methods: {
    onConfirm(item) {
      this.catalog_name = item.text;
      this.catalog_id = item.value;
      this.show = false;
    },
    onSelect(picker, item, index) {
      console.log(item.value);
      this.catalog_name = item.text;
      this.catalog_id = item.value;
    },
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
        headers: { "Content-Type": "multipart/form-data" }
      };

      request({
        url: "/upload",
        method: "post",
        data: param
      }).then(response => {
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
      if (this.sententce.sentence_cn == "") {
        values.anwser_id = 0;
        values.answered = false;
      } else {
        values.anwser_id = user.id;
        values.answered = true;
      }
      values.catalog_id = this.catalog_id;
      request({
        url: "/sentences/" + this.$route.params.id,
        method: "put",
        data: values
      }).then(response => {
        this.$router.go(-1);
      });
    },
    getCatalogs() {
      request({
        url: "/catalogsapi",
        method: "get"
      }).then(response => {
        if (response.code == 200) {
          this.catalogs = response.data;
          this.catalogs.forEach(item => {
            console.log("catalog: ", item.value, this.catalog_id);
            if (item.value == this.catalog_id) {
              this.catalog_name = item.text;
              console.log("name:", this.catalog_name);
            }
          });
        } else {
          console.log(response);
        }
      });
    }
  },
  mounted() {
    console.log(this.$route.params.id);
    this.loading = true;
    request({
      url: "/sentences/" + this.$route.params.id,
      method: "get"
    })
      .then(response => {
        if (response.code == 200) {
          console.log(response.data);
          this.sententce = response.data;
          this.catalog_id = this.sententce.catalog_id;
          this.getCatalogs();
        }
      })
      .finally(() => {
        this.loading = false;
        this.finished = true;
      });
  }
};
</script>