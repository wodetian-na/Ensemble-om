<template>
  <div class="ml-4">
    <v-layout row wrap>
      <v-flex md8 lg8>
        <!--复核流程信息-->
        <v-card class="mt-4 elevation-4 radiusDc">
          <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
            <v-icon>call_split</v-icon>
            <v-toolbar-title>{{title}}</v-toolbar-title>
          </v-toolbar>
        <v-stepper v-model="e11" v-if="optKey == 3">
          <v-stepper-header style="font-size: large">
            <v-divider></v-divider>
            <v-stepper-step editable :complete="e11 > 1" step="1">提交信息</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable :complete="e11 > 2" step="2">复核信息</v-stepper-step>
            <v-divider></v-divider>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-layout wrap>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">提交人:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkFlowInfo.flowCommitInfo.userId" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">提交时间:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkFlowInfo.flowCommitInfo.tranTime" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">提交原因:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkFlowInfo.flowCommitInfo.remark" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">备注信息:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" single-line hide-details>
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-layout wrap>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">复核人:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkInfo.userId" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">复核日期:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkInfo.date" value="2018/09/07" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">复核状态:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-switch color="success" style="margin-top: 8px" hide-details value="Y" :label="`${checkInfo.isApproved==='Y'?'通过':'驳回'}`" v-model="checkInfo.isApproved"></v-switch>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">复核意见:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" name="title" v-model="checkInfo.remark" single-line hide-details>
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

        <!--发布流程信息-->
        <v-stepper v-model="e1" style="color: white" v-if="optKey == 4">
          <v-stepper-header style="font-size: large">
            <v-stepper-step editable :complete="e1 > 1" step="1">提交信息</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable :complete="e1 > 2" step="2">复核信息</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="3">发布信息</v-stepper-step>
          </v-stepper-header>
          <v-stepper-content step="1">
            <v-layout wrap>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">提交人:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseFlowInfo.flowCommitInfo.userId" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">提交时间:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseFlowInfo.flowCommitInfo.tranTime" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">提交原因:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseFlowInfo.flowCommitInfo.remark" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">备注信息:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-layout wrap>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">复核人:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" v-model="releaseFlowInfo.flowCheckInfo.userId" name="title" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">复核时间:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" v-model="releaseFlowInfo.flowCheckInfo.tranTime" name="title" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">复核状态:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-switch color="success" style="margin-top: 8px" hide-details value=true disabled="false" v-model="releaseFlowInfo.flowCheckInfo.isApproved" :label="`${releaseFlowInfo.flowCheckInfo.isApproved==='Y'?'通过':'驳回'}`" ></v-switch>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">复核意见:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" disabled="false" label="" name="title" v-model="releaseFlowInfo.flowCheckInfo.remark" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-layout wrap>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">发布人:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseInfo.userId" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">发布时间:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseInfo.date" value="2018/09/07" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">发布状态:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-switch color="success" style="margin-top: 8px " hide-details value="Y" :label="`${releaseInfo.isApproved==='Y'?'通过':'驳回'}`" v-model="releaseInfo.isApproved"></v-switch>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">发布意见:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" name="title" v-model="releaseInfo.remark" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-stepper-content>
        </v-stepper>
        </v-card>
     </v-flex>
      <v-flex md4 lg4>
        <v-card class="ml-4 mt-4 elevation-4 radiusDc">
          <v-card-media src="/static/avatar/prod1.jpg" style="margin-left: 29%;margin-right: 30%">
          </v-card-media>
          <v-layout>
            <v-subheader class="showMsg" style="color: #00b0ff">产品代码:</v-subheader>
            <v-subheader class="showMsg" style="color: #00b0ff">{{prodType}}</v-subheader>
          </v-layout>
          <v-layout>
            <v-subheader style="font-size: x-large;font-style: inherit;margin-left: 5%;color: #00b0ff">产品名称:</v-subheader>
            <v-subheader style="font-size: x-large;font-style: inherit;margin-left: 0%;color: #00b0ff">{{prodDesc}}</v-subheader>
          </v-layout>
          <v-layout>
            <v-btn class="btnClass" color="primary lighten-2" dark large @click='confirmClick'>确 认</v-btn>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-card class="elevation-2 radiusDc">
    <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" class="elevation-4 mt-4" flat>
      <v-toolbar-side-icon @click="showClick"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">修改差异展示</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom color="blue">
        <v-btn flat icon="print" slot="activator">
          <v-icon class="mr-2" @click="printDown()" style="color: white">print</v-icon>
        </v-btn>
        <span>打      印</span>
      </v-tooltip>
      <v-tooltip bottom color="blue">
        <v-btn flat icon="widgets" slot="activator">
          <v-icon @click="downLoad()" style="color: white">widgets</v-icon>
        </v-btn>
        <span>导      出</span>
      </v-tooltip>

    </v-toolbar>
    </v-card>

    <v-card md20 lg20 v-show="showFlag==1" ref="print">
      <v-card-text>
        <v-tabs fixed-tabs v-if="isTable == false">
          <v-tab v-for="n in diffList" :key="n" class="diffTitle">{{n}}</v-tab>
          <v-tabs-items v-model="model">
            <v-tab-item v-for="i in diffList" :key="i">
              <prod-diff v-if="i=='产品属性'" :prodData="prodDefineData"></prod-diff>
              <!--<prod-diff v-if="i=='利息信息'" :prodData="prodEventCycle"></prod-diff>-->
              <prod-diff v-if="i=='开户定义'" :prodData="prodEventOpen"></prod-diff>
              <prod-diff v-if="i=='放款定义'" :prodData="prodEventDrw"></prod-diff>
              <prod-diff v-if="i=='还款定义'" :prodData="prodEventRec"></prod-diff>
              <prod-diff v-if="i=='到期信息'" :prodData="prodEventDue"></prod-diff>
              <base-table v-if="i=='核算信息'" :prodCharge="prodAccounting"></base-table>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
        <v-tabs fixed-tabs v-if="isTable == true">
          <v-tab style="margin-left: 0px">{{diffTitles}}</v-tab>
          <v-tabs-items>
            <v-tab-item>
              <base-table :prodCharge="prodCharge"></base-table>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>
    </v-card>
    <!--</v-layout>-->
  </div>
</template>
<script>
  import prodDiff from '@/views/prodFactory/prodDiff/prodDiff'
  import baseTable from '@/views/prodFactory/prodInfo/table/baseTable'
  import { getDiffList } from "@/api/url/prodInfo";
  import { getDiffTable } from "@/api/url/prodInfo";
  import {PrintInfo} from '@/utils/print/print'
  import {getColumnDesc_} from '@/utils/columnDesc'
  import {getColumnDesc} from '@/utils/columnDesc'

  import DcTextField from '@/components/widgets/DcTextField'
  import { getProdData } from "@/api/prod";
  import download2 from '@/utils/download2';
    import toast from '@/utils/toast';
    import {
        tranFlowInfo
    } from '@/api/url/prodInfo';
import {
    tranFlowRelease
} from '@/api/url/prodInfo';
  export default {
        components: {
            prodDiff,
            baseTable,
            getColumnDesc_,
            DcTextField
        },
      props: ["prodData"],
      data (){
          return {
              e1: 3,
              releaseFlowInfo: [],
              temp: [],
              title: "",
              releaseInfo: {
                  mainSeqNo: '',
                  date: '',
                  isApproved: 'Y',
                  userId: '',
                  remark: '',
                  optType: '4'//发布
              },
              e11: 2,
              diffTitles: "",
              checkFlowInfo: [],
              confirmInfo: [],
              checkInfo: {
                  mainSeqNo: '',
                  date: '',
                  isApproved: 'Y',
                  userId: '',
                  remark: '',
                  optType: '3' //复核
              },
              code: '',
              optKey: 0,
              showFlag: 0,
              optValue: '',
              optDesc: '',
              prodData: {},
              isTable: false,
              prodDefineData: {},
              prodEventCycle: {},
              prodEventOpen: {},
              prodEventDrw: {},
              prodEventRec: {},
              prodEventDur: {},
              prodAccounting: {},

              diffList: ["产品属性","开户定义","放款定义","还款定义","到期信息","核算定义"],
              prodGroup: [{
                  key: 'Y',
                  value: 'Y-是'
              }],
              prodClass: [{
                  key: 'RB100',
                  value: 'RB100-A'
              }],
              prodRange: [{
                  key: '',
                  value: ''
              }],
              status: [{
                  key: '',
                  value: ''
              }],
              baseProdType: [{
                  key: '',
                  value: ''
              }],
              prodType: [{
                  key: '',
                  value: ''
              }]
          }
      },
       created() {
           //交易单号
           this.code = this.$route.params.code
           this.setOptKey(this.$route.params.optValue)
           this.getDiffProdData();
       },
      mounted() {
          //获取当前操作日期
          this.getDate()
          //初始化流程信息
          this.initFlowInfo(this.$route.params)
      },
        methods: {
            initFlowInfo(val) {
                if(this.optKey === 3){
                    this.checkInfo.mainSeqNo = val.code
                    this.checkInfo.userId = sessionStorage.getItem("userId")
                    for(let i=0; i<val.flowInfo.length; i++) {
                        if(val.flowInfo[i].flowManage.tranId === "MB_PROD_TYPE"){
                            this.isTable = false
                        }else{
                            this.isTable = true
                        }
                        if(val.flowInfo[i].flowManage.mainSeqNo === this.checkInfo.mainSeqNo){
                            this.checkFlowInfo = val.flowInfo[i]
                        }
                    }
                }
                if(this.optKey === 4){
                    this.releaseInfo.mainSeqNo = val.code;
                    this.releaseInfo.userId = sessionStorage.getItem("userId")
                    for(let i=0; i<val.flowInfo.length; i++) {
                        if(val.flowInfo[i].flowManage.tranId === "MB_PROD_TYPE"){
                            this.isTable = false
                        }else{
                            this.isTable = true
                        }
                        if (val.flowInfo[i].flowManage.mainSeqNo === this.releaseInfo.mainSeqNo) {
                            this.releaseFlowInfo = val.flowInfo[i]
                        }
                    }
                }
            },
            downLoad() {
                this.releaseInfo['downLoad']=false;
                    tranFlowRelease(this.releaseInfo).then(response => {
                            if (response.status === 200) {
                                toast.success("sql导出成功！");
                                let date = new Date();
                                let fileName = ""
                                fileName = date.getFullYear().toString()+(date.getMonth()+1).toString()+ date.getDate().toString()+"_"+this.releaseFlowInfo.flowManage.tranId.toString();
                                download2.download(response.data.data.sql, fileName, "text/plain");
                            }
                        })
            },
            getDate() {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth()+1;//js中是从0开始所以要加1
                var day = date.getDate();
                this.releaseInfo.date = year+'/'+month+'/'+day;
                this.checkInfo.date = year+'/'+month+'/'+day;
            },
            //提交事件
            confirmClick() {

                if(this.optKey === 3){
                    this.confirmInfo = this.checkInfo;
                    if(this.confirmInfo.isApproved !== "Y"){
                        this.confirmInfo.isApproved = "N"
                    }
                    tranFlowInfo(this.confirmInfo).then(response => {
                        if(response.status === 200 && this.confirmInfo.isApproved === "Y") {
                            toast.success("复核成功！");
                            this.$router.push({ name: 'userIndexFlow'});
                        }
                        if(response.status === 200 && this.confirmInfo.isApproved === "N") {
                            toast.success("驳回成功！");
                            this.$router.push({ name: 'userIndexFlow'});
                        }
                    })
                }
                if(this.optKey === 4){
                    this.releaseInfo['downLoad']=true;
                    this.confirmInfo = this.releaseInfo
                    if(this.confirmInfo.isApproved !== "Y"){
                        this.confirmInfo.isApproved = "N"
                    }
                    tranFlowRelease(this.confirmInfo).then(response => {
                        if(response.status === 200 && this.confirmInfo.isApproved === "Y") {

                            toast.success("发布成功！");
                            this.$router.push({ name: 'userIndexFlow'});
                        }
                        if(response.status === 200 && this.confirmInfo.isApproved === "N") {
                            toast.success("驳回成功！");
                            this.$router.push({ name: 'userIndexFlow'});
                        }
                    })
                }
            },
            //展开/隐藏差异信息列表
            showClick() {
                this.showFlag = this.showFlag ===0?1:0
                if(!this.isTable) {
                    //产品差异获取数据处理
                    this.getDiffProdData();
                }
                if(this.isTable){
                    //单表差异获取数据组装
                    this.getDiffTableData();
                }
            },
            setOptKey(val) {
                if(val === "复核") {
                    this.optKey = 3
                    this.optDesc = "复核"
                    this.title = "交易复核流程"
                }
                if(val === "发布") {
                    this.optKey = 4
                    this.optDesc = "发布"
                    this.title = "交易发布流程"
                }
            },
            printDown () {
                PrintInfo(this.$refs.print)
            },
            getDiffTableData() {
                //通过交易主单号 获取单表差异信息
                var data={'mainSeqNo': this.code};
                getDiffTable(data).then(response => {
                    console.log(response);
                    this.diffTitles = response.data.data.mainFlow.tranId+"-"+response.data.data.mainFlow.tranDesc
                    let tableDiffInfo = response.data.data.tableInfo
                    //获取单表列描述
                    let heards=[];
                    let assembleColumns=[];
                    if(tableDiffInfo[0] !== undefined){
                        let column = {}
                        if(tableDiffInfo[0].dmlType == 'I'){
                             column = tableDiffInfo[0].newData
                        }else{
                             column = tableDiffInfo[0].oldData
                        }
                        for(const keys in column){
                            let head={};
                            head["text"]=getColumnDesc(keys);
                            head["value"]=keys;
                            heards.push(head);
                        }
                        //区分数据操作类型
                        let opt={};
                        opt["text"]="操作类型";
                        opt["value"]= tableDiffInfo[0].dmlType
                        heards.push(opt);
                    }
                    //组装差异数据
                    for(let i in tableDiffInfo){
                        //新增参数
                        let optTypeDesc = ""
                        if(tableDiffInfo[i].dmlType === "I"){
                            optTypeDesc = "新增"
                        }
                        if(tableDiffInfo[i].dmlType === "D"){
                            optTypeDesc = "删除"
                        }
                        if(tableDiffInfo[i].dmlType === "U"){
                            optTypeDesc = "修改"
                        }
                        if(tableDiffInfo[i].dmlType == 'I'){
                            tableDiffInfo[i].newData["dmlType"] = optTypeDesc
                            assembleColumns.push(tableDiffInfo[i].newData)
                        }else if(tableDiffInfo[i].dmlType == 'D'){
                            //删除数据
                            tableDiffInfo[i].oldData["dmlType"] = optTypeDesc
                            assembleColumns.push(tableDiffInfo[i].oldData)
                        }else if(tableDiffInfo[i].dmlType == 'U'){
                            //修改数据
                            for (let col in tableDiffInfo[i].newData) {
                                let newCol = tableDiffInfo[i].newData[col]
                                let oldCol = tableDiffInfo[i].oldData[col]
                                if(newCol !== oldCol){
                                    tableDiffInfo[i].newData[col] = oldCol + ">" + newCol
                                }
                            }
                            tableDiffInfo[i].newData["dmlType"] = optTypeDesc
                            assembleColumns.push(tableDiffInfo[i].newData)
                        }
                    }

                    const column = {"headers": heards,"column": assembleColumns}
                    this.prodCharge= column;
                });
            },
            getDiffProdData(){
                //通过交易主单号 获取产品差异信息
                var data={'mainSeqNo': this.code};
                getDiffList(data).then(response => {
                    this.prodData=response.data.data;
                    this.assembleProdDefine();
                    this.assembleEvent();
                    //将收费定义的差异组装
                    this.assembleAccounting();
                    this.prodGroup = this.prodData.mbProdType.prodGroup
                    this.prodClass = this.prodData.mbProdType.prodClass
                    this.prodDesc = this.prodData.mbProdType.prodDesc
                    this.prodType = this.prodData.mbProdType.prodGroup
                    this.status = this.prodData.mbProdType.status
                    this.baseProdType = this.prodData.mbProdType.baseProdType
                    this.prodRange = this.prodData.mbProdType.prodRange
                    this.prodType = this.prodData.mbProdType.prodType
                });
            },
            assembleProdDefine() {
                const prodDefine=this.prodData.prodDefine;
                const prodDefineDiff=this.prodData.diff.prodDefine;
                const prodType=this.prodData.prodType;
                const baseEffectProd = this.prodData.baseEffectProd;
                const prodDefineData={"prodDefines": prodDefine,"diff": prodDefineDiff,"prodType": prodType,"baseEffectProd": baseEffectProd};
                this.prodDefineData=prodDefineData;
            },
            assembleEvent(){
                const prodEvent=this.prodData.prodEvent;
                const prodEventDiff=this.prodData.diff.mbProdEvent;
                const prodType=this.prodData.prodType;
                const baseEffectProd = this.prodData.baseEffectProd;
                //区分差异
                const cycleDiff={}
                const openDiff={}
                const drwDiff={}
                const recDiff={}
                const dueDiff={}
                for(const diffKey in prodEventDiff){
                    const key=diffKey.substring(diffKey.indexOf('.')+1);
//                    if(diffKey.indexOf('CYCLE')>=0){
//                        cycleDiff[key]=prodEventDiff[diffKey];
//                    }
                    if(diffKey.indexOf('OPEN')>=0){
                        openDiff[key]=prodEventDiff[diffKey];
                    }
                    if(diffKey.indexOf('DRW')>=0){
                        drwDiff[key]=prodEventDiff[diffKey];
                    }
                    if(diffKey.indexOf('REC')>=0){
                        recDiff[key]=prodEventDiff[diffKey];
                    }
                    if(diffKey.indexOf('DUE')>=0){
                        dueDiff[key]=prodEventDiff[diffKey];
                    }
                }
                for(const key in prodEvent){
                    const openEvent={"prodDefines": prodEvent[key],"prodType": prodType}
                    if(key.indexOf('OPEN')>=0){
                        openEvent["diff"]=openDiff
                        openEvent["baseEffectProd"]=baseEffectProd
                        this.prodEventOpen=openEvent;
                    }
//                    else if(key.indexOf('CYCLE')>=0){
//                        openEvent["diff"]=cycleDiff
//                        openEvent["baseEffectProd"]=baseEffectProd
//                        this.prodEventCycle= openEvent
//                    }
                    else if(key.indexOf('DRW')>=0){
                        openEvent["diff"]=drwDiff
                        openEvent["baseEffectProd"]=baseEffectProd
                        this.prodEventDrw= openEvent
                    }else if(key.indexOf('REC')>=0){
                        openEvent["diff"]=recDiff
                        openEvent["baseEffectProd"]=baseEffectProd
                        this.prodEventRec= openEvent
                    }else if(key.indexOf('DUE')>=0){
                        openEvent["diff"]=dueDiff
                        openEvent["baseEffectProd"]=baseEffectProd
                        this.prodEventDue= openEvent
                    }
                }
                if(JSON.stringify(prodEvent)=='{}' || JSON.stringify(prodEvent) == undefined){
                    let diffEvent={"prodType": prodType}
//                    let diffEventCycle={"prodType": prodType}
                    let diffEventDrw={"prodType": prodType}
                    let diffEventRec={"prodType": prodType}
                    let diffEventDue={"prodType": prodType}
                    diffEvent["diff"]=openDiff
                    this.prodEventOpen=diffEvent;
//                    diffEventCycle["diff"]=cycleDiff
//                    this.prodEventCycle= diffEventCycle;
                    diffEventDrw["diff"]=drwDiff
                    this.prodEventDrw= diffEventDrw
                    diffEventRec["diff"]=recDiff
                    this.prodEventRec= diffEventRec
                    diffEventDue["diff"]=dueDiff
                    this.prodEventDue= diffEventDue
                }
            },
            assembleAccounting(){
                const prodInfo=this.prodData.mbProdCharge;
                const prodChargeDiff=this.prodData.diff.mbProdCharge;
                let assembleColumns=[];
                let heards=[];
                for(const key in prodInfo[0]){
                    let head={};
                    head["text"]=getColumnDesc_(key);
                    head["value"]=key;
                    heards.push(head);
                }
                for(const prodCharge in prodInfo){
                    const chargeColumn= prodInfo[prodCharge];
                    const keyAndValue="{\"FEE_TYPE\":\""+chargeColumn.feeType+"\",\"PROD_TYPE\":\""+
                        chargeColumn.prodType+"\"}";
                    const diff=prodChargeDiff[keyAndValue];
                    if(diff== undefined){
                        assembleColumns.push(chargeColumn)
                    }else{
                        for(const col in chargeColumn){
                            let chargeCol=chargeColumn[col];
                            let diffCol=diff[col];
                            if(chargeCol!=diffCol){
                                chargeColumn[col]= chargeCol+'>'+diffCol
                            }
                        }
                        assembleColumns.push(chargeColumn)
                    }
                }
                if(heards.size==0){
                    for(const key in prodChargeDiff[0]){
                        let head={};
                        head["text"]=getColumnDesc_(key);
                        head["value"]=key;
                        heards.push(head);
                    }
                }
                for(const index in prodChargeDiff){
                    const prodCharge= prodChargeDiff[index];
                    const dmlType=prodCharge.dmlType;
                    let diffData={}
                    if(dmlType == 'I'){
                        const keyAndValue=index;
                        for(const num in heards){
                            const value=heards[num].value
                            diffData[value]=prodCharge[value];
                        }
                        assembleColumns.push(diffData)
                    }
                }
                const reColumn = {"headers": heards,"column": assembleColumns}
                this.prodCharge= reColumn;
            },
        }
    }
</script>
<style scoped>
    .diffTitle {
      font-size: large;
    }
    .imgUserIndexFlow {
      width: 100px;
      display: inline-block;
      margin-left: 40%
    }
  .showMsg {
       font-size: x-large;
       font-style: inherit;
       margin-left: 5%;
        margin-top: 4%;
     }
    .descClass {
      color: #64b5f6;
      font-size: large;
      font-style: inherit;
      margin-right: 0px;
      margin-top: 0px;
      margin-left: 10%
    }
    .textBox {
      margin-top: 5px;
    }
  .btnClass {
    margin-top: 5%;
    margin-left: 28%;
    margin-bottom: 3%;
    width: 50%;
    font-size: large;
  }
</style>