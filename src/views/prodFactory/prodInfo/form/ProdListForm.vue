<template>
  <div>
    <v-layout row wrap>
      <v-flex md12 lg12>
      <v-toolbar dense class="chat-history-toolbar prodLists">
        <v-text-field flat solo full-width clearable prepend-icon="search" class="top" label="请输入产品代码或描述" v-model="searchValue"></v-text-field>
      </v-toolbar>
      <v-list two-line subheader :class="depositTree" v-show="searchValue">
        <v-list-tile class="chat-list prodList" avatar v-for="item of list" :key="item.title" @click="handleClick(item)">
          <div v-show="isRB == true" style="width: 20%;height: 60%;padding-left: -20%">
            <img src="../../../../../static/prod/prodCun.png" height=100% >
          </div>
          <div v-show="isCL == true" style="width: 20%;height: 60%;padding-left: -20%">
            <img src="../../../../../static/prod/prodDai.png" height=100% >
          </div>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.prodType }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.prodDesc }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <vue-perfect-scrollbar >
        <v-list two-line subheader :class="depositTree" v-show="!searchValue">
          <v-list-tile class="chat-list prodList" avatar v-for="(item, index ) in folders" :key="item.title" @click="handleClick(item)">
            <div v-show="isRB == true" style="width: 20%;height: 60%;padding-left: -20%">
              <img src="../../../../../static/prod/prodCun.png" height=100% >
            </div>
            <div v-show="isCL == true" style="width: 20%;height: 60%;padding-left: -20%">
              <img src="../../../../../static/prod/prodDai.png" height=100% >
            </div>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.prodType }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.prodDesc }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </vue-perfect-scrollbar>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
    import {
        getProdType
    } from '@/api/url/prodInfo'

    export default {

        props: ["prodClass","prodRange"],
        data: () => ({
            isRB: false,
            isCL: false,
            folders: [],
            list: [],
            prodType: '',
            depositTree: 'depositTree',
            searchValue: '',
        }),
        watch: {
            prodClass(val) {
                this.initProdList(val)
            },
            searchValue() {
                if(this.searchValue==''){
                    this.list=[]
                    return
                }
                this.list=[]
                for(let i=0; i<this.folders.length; i++){
                    if(this.folders[i].prodType.search(this.searchValue)!=-1 || this.folders[i].prodDesc.search(this.searchValue)!=-1){
                        this.list.push(this.folders[i])
                    }
                }
            }

        },
        mounted() {
            this.initProdList(this._props.prodClass)
        },
        methods: {
            initProdList(val) {
                if(val!=''&&val!=undefined){
                getProdType(val).then(response => {
                    let length = response.data.data.length
                    for(let j = 0; j<length; j++){
                        if(response.data.data[j].prodRange == this._props.prodRange){
                            this.folders.push(response.data.data[j])
                        }
                    }
                    if(this.folders[0].sourceModule == "RB"){
                        this.isRB = true
                    }
                    if(this.folders[0].sourceModule == "CL"){
                        this.isCL = true
                    }
                });
                }
            },
            handleClick(value) {
                this.prodType = value.prodType
                this.$emit('listenToProdList',{'prodType': this.prodType})
            },
        }
    };
</script>
<style scoped>
  .top {
    padding-top: 8px;
  }
  .depositTree {
    height: calc(90vh - 24px);
    overflow-y: scroll;
  }
  .depositTreeFixed {
    position: fixed;
    top: 0;
    width: 100%;
  }
</style>