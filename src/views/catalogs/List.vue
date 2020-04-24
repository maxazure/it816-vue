<template>
  <div class="catalogs">
    <van-nav-bar :title="catalog.name_en" fixed placeholder right-text="Edit"  @click-right="onClickRight"  left-arrow @click-left="onClickLeft" />
        <van-cell class="description" v-model="catalog.description" value="description" size="large" rows=4 />
        
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="No more catelog."
          @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.id" :title="item.sentence_en" is-link @click="onClick(item.id)"  />
    </van-list>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
    name: "home",
      data() {
    return {
      list: [],
      catalog: {},
      loading: false,
      finished: false,
    };
  },
    methods: {
       onLoad() {
            console.log(this.$route.params.id);
            this.loading = true;
            request({
            url: "/sentences?catalog_id=" + this.$route.params.id,
            method: 'get'
            }).then(response => {
              if(response.code == 200){
                console.log(response.data.list)
                this.list = response.data.list
              }
             }).finally(() => {
               this.loading = false;
               this.finished = true;
              })

            this.loading = true;
            request({
            url: "/catalogs/" + this.$route.params.id,
            method: 'get'
            }).then(response => {
              if(response.code == 200){
                console.log(response.data.list)
                this.catalog = response.data
              }
             }).finally(() => {
               this.loading = false;
               this.finished = true;
              })

    },
    onRefresh(index) {
      this.list.finished = false;
      this.onLoad();
    },
    onClickRight(){
      this.$router.push(`/catalogs/edit/${this.$route.params.id}`)
    },
    onClick(id){
      this.$router.push(`/showsentence/${id}`)
    },
    onClickLeft() {
          this.$router.go(-1);
        },
  },
};
</script>

<style>
.description span{
    color: #999;
}

</style>
