<template>
  <v-card class="elevation-4 mt-4 ml-4 radiusDc">
    <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
      <v-toolbar-title>任务列表</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list two-line class="pa-0 taskListHeight" >
        <template v-for="(item, index) in items" >
          <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
          <v-divider v-else-if="item.divider" :key="index"></v-divider>
          <v-list-tile avatar v-else :key="item.tranName" :class="item.className" @click="handleClick(item)" v-show="classShow">
            <v-list-tile-avatar color='light-green'>
              <v-icon dark>account_circle</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content >
              <v-list-tile-sub-title >{{ item.tranName }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <v-divider>
      </v-divider>
      <v-btn class="btnClass" color="primary lighten-2" @click="submitTask" dark large>确 认</v-btn>
      <v-btn class="btnClass" color="primary lighten-2" @click="returnTask" dark large>驳 回</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
    import {getTaskListBySeqNo} from "@/api/url/prodInfo";
    import {submitCommon} from "@/api/url/prodInfo";
    export default {
        props: {
            seqNo: String
        },
        data: () => ({
            classShow: true,
            show: '',
            items: [
                {
                    tranName: '',
                    className: ''
                }
            ],
        }),
        watch: {
            seqNo: {
                handler(msg) {
                    if(msg!='' && msg!= undefined){
                    this.getTaskList()
                    }
                }
            }
        },
        created() {
            let that=this;
            window.addEventListener("taskList", function () {
                 that.getTaskList();
             })
        },
        mounted: function() {
            this.getTaskList()
        },
        methods: {
            handleClick(item) {
                this.$emit('sendType',item.tranType,item.tranId);
                this.show=true
                for(let i=0; i<this.items.length; i++){
                    this.items[i].className=this.items[i].tranName
                }
                this.classShow=false
                item.className="changeColor"
                this.classShow=true
            },
            submit(){
                let that=this
                submitCommon({"userId": sessionStorage.getItem("userId")}).then(response => {
                    that.items=[]
                })
            },
            submitTask(){
                this.$emit('submitTask','Y');
            },
            returnTask(){
                this.$emit('submitTask','N');
            },
            getTaskList() {
                const parentSeqNo=this._props.seqNo;
                getTaskListBySeqNo({"seqNo": parentSeqNo}).then(response => {
                    this.items= response.data.data;
                    for(let i=0; i<this.items.length; i++){
                        this.items[i].className=this.items[i].tranName
                    }
                    this.handleClick(this.items[0])
                });
            },
        }
    };
</script>
<style scoped>
  .taskListHeight {
    height: 272px;
    overflow-y:auto;
    overflow-x:hidden;
  }
  .changeColor{
    background-color:gainsboro!important;
  }
  </style>