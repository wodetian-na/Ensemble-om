<template>
    <v-container fluid pr-5 pt-0>
        <v-flex xs12 md12 lg12>
            <div slot="widget-content">
                <v-container fluid pt-1>
                    <v-layout row wrap>
                        <v-layout row wrap v-if="prodType!= undefined ">
                            <v-flex md6 lg6>
                                <dc-text-field labelDesc="产品代码" v-model="prodType.prodType" :disabled="true" :disablePower="disablePower"></dc-text-field>
                            </v-flex>
                            <v-flex md6 lg6>
                                <dc-text-field labelDesc="产品描述" v-model="prodType.prodDesc" :disabled="true" :disablePower="disablePower"></dc-text-field>
                            </v-flex>
                                <v-flex md6 lg6>
                                    <dc-multiselect :options="sourceModuleOption" labelDesc="业务模块" :disabled="true" :disablePower="disablePower" :isMultiSelect="false" v-model="prodType.sourceModule" class="dcMulti"></dc-multiselect>
                                </v-flex>
                                <v-flex md6 lg6>
                                    <dc-multiselect :options="prodClassOption" labelDesc="产品分类" :disabled="true" :disablePower="disablePower" :isMultiSelect="false" v-model="prodType.prodClass" class="dcMulti"></dc-multiselect>
                                </v-flex>
                                <v-flex md6 lg6>
                                    <dc-multiselect :options="prodRangeOption" labelDesc="产品属性" :disabled="true" :disablePower="disablePower" :isMultiSelect="false" v-model="prodType.prodRange" class="dcMulti"></dc-multiselect>
                                </v-flex>
                                <v-flex md6 lg6>
                                    <dc-switch v-model="prodType.prodGroup" labelDesc="组合产品" :disabled="true" :disablePower="disablePower"></dc-switch>
                                </v-flex>
                                <v-flex md6 lg6>
                                    <dc-multiselect :options="statusOption" labelDesc="产品状态" :disablePower="disablePower" :isMultiSelect="false" v-model="prodType.status" class="dcMulti"></dc-multiselect>
                                </v-flex>
                                <v-flex md6 lg6>
                                    <dc-multiselect :options="baseProdTypeOption" labelDesc="基础产品" :disabled="true" :disablePower="disablePower" :isMultiSelect="false" v-model="prodType.baseProdType" class="dcMulti"></dc-multiselect>
                                </v-flex>
                        </v-layout>
                        <draggable v-model="dataSource" :move="getdata" @update="datadragEnd" class="layout row wrap">
                            <v-flex v-for="(keyData ,key ,index) in dataSource" v-bind:key="key" lg6>
                                <v-layout row wrap>
                                    <v-flex md8 lg4 v-if="keyData.columnType == 'tree'">
                                    </v-flex>
                                    <v-flex md12 lg12 v-if="keyData.columnType == 'tree'">
                                        <dc-treeview v-if="keyData.columnType == 'tree'" v-model="prodDefines[keyData.key].attrValue" :disablePower="disablePower" :options="keyData.valueScore"></dc-treeview>
                                    </v-flex>
                                    <v-flex md12 lg12 v-else>
                                        <dc-text-field :baseAttr="prodDefines[keyData.key].group" v-if="keyData.columnType == 'input'"
                                                       class="primary&#45;&#45;text mx-1" :label="keyData.columnDesc"
                                                       name="title" :labelDesc="keyData.columnDesc" :disablePower="disablePower" v-model="prodDefines[keyData.key]" single-line
                                                       hide-details></dc-text-field>
                                        <dc-multiselect :baseAttr="prodDefines[keyData.key].group" v-if="keyData.columnType == 'select'" :labelDesc="keyData.columnDesc" v-model="prodDefines[keyData.key]"
                                                        :options="keyData.valueScore" class="dcMulti" :disablePower="disablePower" :isMultiSelect=keyData.isMultiSelect></dc-multiselect>
                                        <dc-switch :baseAttr="prodDefines[keyData.key].group" v-if="keyData.columnType == 'switch'" :disablePower="disablePower" :labelDesc="keyData.columnDesc"
                                                   v-model="prodDefines[keyData.key]"></dc-switch>
                                        <dc-date :baseAttr="prodDefines[keyData.key].group" v-if="keyData.columnType == 'date'" :disablePower="disablePower" :labelDesc="keyData.columnDesc" v-model="prodDefines[keyData.key]"></dc-date>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </draggable>
                    </v-layout>
                </v-container>
            </div>
        </v-flex>
    </v-container>
</template>
<script>
    import columnInfo from '../columnInfo'
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcTreeSelect from "@/components/widgets/DcTreeSelect";
    import DcTreeview from "@/components/widgets/DcTreeview";

    import DcTextField from "@/components/widgets/DcTextField";
    import DcDate from '@/components/widgets/DcDate'
    import {saveColumn} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import draggable from 'vuedraggable'
    import {getParamTable} from "@/api/url/prodInfo";

    export default {
        components: {columnInfo, DcMultiselect, DcSwitch, DcTreeSelect,DcDate,DcTextField,draggable,DcTreeview},
        props: {
            prodType: String,
            prodDefines: String,
            tags: String,
            prodTypeCode: String,
            attrColumnInfo: Object,
            baseAttr: {
                type: String,
                default: false
            },
            disablePower: {
                type: Boolean,
                default: true
            }
        },
        data: () => ({
            dataSource: {},
            valueData: [],
            sourceModuleOption: [
                {
                    "key": "RB",
                    "value": "存款类"
                },
                {
                    "key": "CL",
                    "value": "贷款类"
                },
                {
                    "key": "GL",
                    "value": "内部账类"
                },
                {
                    "key": "MM",
                    "value": "货币市场类"
                }
            ],
            prodRangeOption: [
                {
                    "key": "S",
                    "value": "可售产品"
                },
                {
                    "key": "B",
                    "value": "基础产品"
                }
            ],
            statusOption: [
                {
                    "key": "A",
                    "value": "启用"
                },
                {
                    "key": "C",
                    "value": "废弃"
                }
            ],
            baseProdTypeOption: [],
            prodClassOption: []
        }),
        watch: {
            prodDefines: {
                handler(prodDefines) {
                    this.init(prodDefines);
                },
            },
        },
        mounted() {
            this.initRefData();
        },
        methods: {
            initRefData() {
                let that = this
                getParamTable("MB_PROD_CLASS").then(function (response) {
                    let prodClass = response.data.data.columnInfo;
                    for(let i=0; i<prodClass.length; i++){
                        if(prodClass[i].PROD_CLASS_LEVEL == '2'){
                            let temp = {}
                            temp["key"] = prodClass[i].PROD_CLASS;
                            temp["value"] =prodClass[i].PROD_CLASS_DESC;
                            that.prodClassOption.push(temp)
                        }
                    }
                });
                getParamTable("MB_PROD_TYPE").then(function (response) {
                    let prodType = response.data.data.columnInfo;
                    for(let i=0; i<prodType.length; i++){
                        if(prodType[i].PROD_RANGE == 'B'){
                            let temp = {}
                            temp["key"] = prodType[i].PROD_TYPE;
                            temp["value"] = prodType[i].PROD_DESC;
                            that.baseProdTypeOption.push(temp)
                        }
                    }
                });
            },
            getdata (evt) {
                console.log(evt.draggedContext.element.id)
            },
            saveColumn (){
                saveColumn({column: this.dataSource,prodType: this._props.prodTypeCode,tags: this._props.tags}).then(response => {
                    if(response.status === 200) {
                        toast.success("顺序编辑完成！");
                    }
                });
            },
            datadragEnd (evt) {
                console.log('拖动前的索引 :' + evt.oldIndex)
                console.log('拖动后的索引 :' + evt.newIndex)
                const oldIndex=evt.oldIndex;
                const newIndex=evt.newIndex;
                let dataSourceEnd=[]
                let dataSource=this.dataSource
                for(const index in dataSource){
                    dataSource[index].pageSeqNo=parseInt(index)+1;
                }
                this.saveColumn();
                //拖动后改变column数组
                console.log(this.tags)
            },
            //对象浅复制
            copy(obj1,obj2) {
                let obj = obj2||{};
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
            init(prodData) {
                let columnList=[]
                //通过后台的产品有关信息查数据字典
                for(const index in prodData) {
                    const dataSource = this.copy(this._props.attrColumnInfo,{});
                    let column = dataSource[index];
                    if (column != undefined && column != 'undefined' && this._props.tags == prodData[index].pageCode) {
                        column['key'] = index
                        column['pageSeqNo'] = prodData[index].pageSeqNo
                        column['pageCode'] = prodData[index].pageCode
                        columnList.push(column)
                    }
                }
                this.dataSource = columnList

            }
        }
    }
</script>
<style scoped>
    .dcMulti {
        margin-top: 10px;
    }

    .auto {
        margin-left: auto;
        margin-right: auto;
    }
</style>