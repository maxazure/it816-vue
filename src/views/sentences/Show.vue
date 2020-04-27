<template>
  <div class="sententces">
      <van-nav-bar title="Sentence" fixed placeholder left-arrow @click-left="onClickLeft" right-text="EDIT"  @click-right="onClickRight" />
    <van-cell-group>
        <van-cell title="title" :value="sententce.title"/>
        <van-cell title="Answered"><van-icon v-if="sententce.answered" name="success"  color="#07c160" /><van-icon  v-else name="cross" color="#1989fa"  /></van-cell>
      <van-cell title="Opration"><van-button type="danger" size="mini" @click="onDelete">DELETE</van-button></van-cell>
    </van-cell-group>
    <van-cell-group>
        <van-cell title="English Sentence"/>
        <van-cell class="content" v-model="sententce.sentence_en"  size="large" />
    </van-cell-group>
        <van-cell-group>
        <van-cell title="Chinese Sentence"/>
        <van-cell class="content" v-model="sententce.sentence_cn"  size="large" />
    </van-cell-group>
    
    <van-cell class="audio"><audio :src="sententce.audio_url" controls="controls"></audio></van-cell>
    
  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  name: 'newententces',
   data() {
    return {
      mp3:"",
      sententce: {},
      title: '',
      sentence_en: '',
      sentence_cn: '',
    };
   },
    methods: {
      onDelete(){
         request({
            url: "/sentences/" + this.$route.params.id,
            method: 'delete'
            }).then(response => {
              if(response.code == 200){
                console.log(response.data)
              }
             }).finally(() => {
               this.$router.go(-1)
               })

      },
       onLoad() {
            console.log(this.$route.params.id);
            this.loading = true;
            request({
            url: "/sentences/" + this.$route.params.id,
            method: 'get'
            }).then(response => {
              if(response.code == 200){
                console.log(response.data)
                this.sententce = response.data
                this.sententce.audio_url = this.$baseUrl + this.sententce.audio_url
                this.title = response.data.title
              }
             }).finally(() => {
               this.loading = false;
               this.finished = true;
               })

         },
        onClickLeft() {
          this.$router.go(-1);
        },
        onClickRight(){
          this.$router.push(`/editsentence/${this.$route.params.id}`);
        }
        
    }, mounted () {
      this.onLoad();
    }
}
</script>
<style>
  .content{
    height: 180px;
  }
  .audio{
    left: 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 74px;
  }
  .audio div{
    text-align: center;
    height: 62px;
  }
</style>