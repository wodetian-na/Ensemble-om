<template>
    <div class="app-container">
        <v-layout row wrap>
            <v-flex lg9 sm9 class="v-card">
                <v-toolbar color="primary lighten-1" dark tabs>
                    <v-toolbar-side-icon></v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">个人存款产品</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>search</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>apps</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>refresh</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                    <v-tabs color="primary lighten-1" slot="extension" v-model="activeName" grow show-arrows>
                        <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tab v-for="n in prodInfo" :key="n">
                            {{ n.text}}
                            <!-- <v-icon>{{n.icon}}</v-icon> -->
                        </v-tab>
                    </v-tabs>
                </v-toolbar>
                <v-tabs-items v-model="activeName" class="white elevation-1">
                    <v-tab-item v-for="i in 12" :key="i" :id="'mobile-tabs-5-' + i">
                        <event-form v-if="i==1" ref="callback" v-bind:prodData="prodData" v-on:getNewProdData="getNewProdData"></event-form>
                        <accounting-plain v-if="i==2"></accounting-plain>
                        <branch-form v-if="i==3"></branch-form>
                        <acct-form v-if="i > 3"></acct-form>
                    </v-tab-item>
                </v-tabs-items>
            </v-flex>
            <v-flex lg3 sm3 class="v-card">
                <v-card>
                    <v-card-text>
                        <down-action v-if="pendFlag==0" v-on:listenToCopy="listenToCopy" v-on:saveProd="saveProd" v-on:tempProd="tempProd"></down-action>
                        <pending-form v-if="pendFlag==1"></pending-form>
                    </v-card-text>
                </v-card>
                <prod-list-form v-bind:prodClass="prodClass" v-on:listenToProdList="listenToProdList"></prod-list-form>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import {
        savaProdInfo
    } from '@/api/url/prodInfo';
    import BranchForm from "../form/BranchFormProd";
    import EventForm from '../form/EventFormPord';
    import ProdListForm from '../form/ProdListForm';
    import PendingForm from '../btn/PendingForm';

    import VWidget from '@/components/VWidget';
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';
    import accountingPlain from '../table/accountingPlain'
    import AcctForm from '../form/AcctFormPord';
    import { getProdData } from "@/api/url/prodInfo";
    import downAction from '../btn/downAction'
    import {filterChangeData} from "@/server/filterChangeData";
    import { getCheckFlowList } from "@/api/url/prodInfo";
    import toast from '@/utils/toast';


    export default {
        name: 'deposit',
        components: {
            accountingPlain,
            BranchForm,
            EventForm,
            VWidget,
            AcctForm,
            VuePerfectScrollbar,
            downAction,
            ProdListForm,
            PendingForm
        },
        data () {
            return {
                listLoading: true,
                searchValue: '',
                showCopy: '',
                depositProd: {
                    prodcode: '',
                    version: ''
                },
                prodCode: '',
                prodClass: '',
                pendFlag: 0,
                activeName: 'basic',
                prodInfo: [{
                    icon: 'account_balance',
                    text: '基本信息'
                }, {
                    icon: 'filter_vintage',
                    text: '账户信息'
                }, {
                    icon: 'work',
                    text: '产品对象'
                }, {
                    icon: 'work',
                    text: '利率信息'
                }, {
                    icon: 'work',
                    text: '风险信息'
                }, {
                    icon: 'work',
                    text: '开户定义'
                }, {
                    icon: 'work',
                    text: '存入定义'
                }, {
                    icon: 'work',
                    text: '支取定义'
                }, {
                    icon: 'work',
                    text: '利率信息'
                }, {
                    icon: 'work',
                    text: '核算信息'
                }, {
                    icon: 'work',
                    text: '销户定义'
                }, {
                    icon: 'work',
                    text: '结息定义'
                }],
                files: [{
                    icon: 'assignment',
                    iconClass: 'blue white--text',
                    value: '',
                    lable: ''
                }],
                prodData: {},
                sourceProdData: {},
                targetData: {}
            }
        },
        mounted: function() {
            this.queryProdFlow();
            if(this.$route.hash !== "" && this.$route.hash !== null) {
                //点击主菜单产品组时 获取产品组代码
                this.prodClass = this.$route.hash
            }else if(this.$route.params.prodClassCmp !== "" && this.$route.params.prodClassCmp !== null){
                //通过全局搜索/产品目录  获取目标产品产品组代码
                this.prodClass = this.$route.params.prodClassCmp
            }
            //通过全局搜索/产品目录 获取目标产品代码
            if(this.$route.params.prodType !== "" && this.$route.params.prodType !== null){
                this.listenToProdList(this.$route.params)
            }
        },
        methods: {
            queryProdFlow(){
                getCheckFlowList().then(response => {
                    let length = response.data.data.length
                    for(let j = 0; j<length; j++){
                        if(response.data.data[j].flowManage.status === "2"){
                            this.pendFlag = 1
                            toast.info("存在已提交数据，等待复核!");
                            break
                        }
                        if(response.data.data[j].flowManage.status === "3"){
                            this.pendFlag = 1
                            toast.info("存在已复核数据，等待发布！");
                            break
                        }
                    }
                });
            },
            queryProdInfo() {
                console.log('start query prod info')
            },
            saveProd() {
                this.$refs.callback[0].callbackprod()
                this.targetData = filterChangeData(this.prodData, this.sourceProdData,this.showCopy)
                if(this.showCopy === "Y") {
                    this.targetData.optionType = "I"
                }else{
                    this.targetData.optionType = "U"
                }
                this.targetData.option = "save";
                this.targetData.userName = sessionStorage.getItem("userId")
                savaProdInfo(this.targetData).then(response => {
                    if(response.status === 200) {
                        //置灰提交按钮，防止为此提交
                        this.pendFlag = 1
                        toast.success("提交成功！");
                    }
                })
            },
            tempProd() {
                this.$refs.callback[0].callbackprod()
                this.targetData = filterChangeData(this.prodData,this.sourceProdData,this.showCopy)
                if(this.showCopy === "Y") {
                    this.targetData.optionType = "I"
                }else{
                    this.targetData.optionType = "U"
                }
                this.targetData.option="temp";
                this.targetData.userName = sessionStorage.getItem("userId")
                savaProdInfo(this.targetData).then(response => {
                    if(response.status === 200) {
                        toast.success("暂存成功！");
                    }
                })
            },
            listenToProdList(value) {
                this.prodCode = value.prodType
                getProdData(this.prodCode).then(response => {
                    this.prodData = response.data.data
                    this.sourceProdData = this.copy(this.prodData,this.sourceProdData)
                });
            },
            //对象浅复制
            copy(obj1,obj2) {
                var obj = obj2||{};
                for(let name in obj1){
                    if(typeof obj1[name] === "object" && obj1[name]!== null){
                        obj[name]= (obj1[name].constructor===Array)?[]:{};
                        this.copy(obj1[name],obj[name]);
                    }else{
                        obj[name]=obj1[name];
                    }
                }
                return obj;
            },
            initStage(value){
                this.listValue = value
            },
            onSubmit() {
                this.$message('submit!')
            },
            onCancel() {
                this.$message({
                    message: 'cancel!',
                    type: 'warning'
                })
            },
//            getProdBySearchValue(val) {
//                if (val) {
//                    let j = 1
//                    for (let i = 1; i < this.folders.length; i++) {
//                        if (this.folders[i].value.indexOf(val) == -1 || this.folders[i].label.indexOf(val) == -1) {
//                        }
//                    }
//                }
//            },
            getNewProdData(val) {
                console.log(val)
                this.prodData.prodType.prodType = val.eventForm.prodType
                this.prodData.prodType.prodDesc = val.eventForm.prodDesc
                this.prodData.prodType.prodRange = val.eventForm.prodRange
                this.prodData.prodType.prodClass = val.eventForm.prodClass
                this.prodData.prodType.prodGroup = val.eventForm.prodGroup
                this.prodData.prodType.status = val.eventForm.status
                this.prodData.prodDefines.ACCT_STRUCT_FLAG.attrValue = val.eventForm.acctStructFlag
                this.prodData.prodDefines.ACCT_REAL_FLAG.attrValue = val.eventForm.acctRealFlag
                this.prodData.prodDefines.ACCT_INT_FLAG.attrValue = val.eventForm.acctIntFlag
                this.prodData.prodDefines.ACCT_BAL_FLAG.attrValue = val.eventForm.acctBalFlag
                this.prodData.prodDefines.PROFIT_CENTRE.attrValue = val.eventForm.profitCenter
                this.prodData.prodDefines.PROD_START_DATE.attrValue = val.eventForm.prodStartDate
                this.prodData.prodDefines.PROD_END_DATE.attrValue = val.eventForm.prodEndDate
                this.prodData.prodDefines.ACCT_TYPE.attrValue = val.eventForm.acctType

                this.prodData.mbEventInfos["CLOSE_"+ val.prodType.prodType].mbEventAttrs.CHECK_AGENT.attrValue = val.eventForm.baseprod
            },
            listenToCopy(data) {
                this.prodCode=data.prodType;
                this.prodData.prodType.prodType=data.prodType;
                this.prodData.prodType.prodDesc=data.prodDesc;
                const newData=this.copy(this.prodData,[]);
                this.prodData=newData;
                if(!data.showCopy){
                    this.showCopy = 'Y';
                }else{
                    this.showCopy = '';
                }
            }
        }
//        watch: {
//            searchValue(val, oldval) {
//                if (val !== oldval) {
//                    this.getProdBySearchValue(val)
//                }
//            }
//        }
    }
</script>

<style scoped>
    .top {
        padding-top: 8px;
    }
    .depositTree {
        height: calc(90vh - 48px);
    }
    /*  .prodList {
                  border-top-style: solid;border-top-width: 1px;border-color: rgba(40, 24, 31, 0.21);
                }
                .prodLists {
                  border-bottom-style: solid;border-bottom-width: 3px;border-color: rgba(183, 172, 177, 0.6);
                }*/
</style>