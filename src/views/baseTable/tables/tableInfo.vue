<template>
    <v-layout justify-center pt-4 class="ml-4 mr-4">
        <v-flex xs12 sm12>
            <v-card class="radiusDc">
                <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
                    <v-icon>widgets</v-icon>
                    <v-toolbar-title>{{title}}</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

                <!--<v-toolbar card dense color="transparent">-->
                    <!--<v-layout justify-center>-->
                        <!--<v-flex xs6 sm6>-->
                    <!--<dc-text-field label="产品类型" labelDesc="产品类型" v-model='prodTypeSearch'/>-->
                        <!--</v-flex>-->
                        <!--<v-flex xs6 sm6>-->
                    <!--<dc-multiselect label="产品分类" labelDesc="产品分类" v-model='prodClassSearch' :options="prodClassOption"></dc-multiselect>-->
                        <!--</v-flex>-->
                    <!--</v-layout>-->
                <!--</v-toolbar>-->
                <v-toolbar card dense color="transparent">
                    <a-button type="primary" @click="onAdd">新增</a-button>
                    <a-button type="primary" @click="onEdit" class="ml-2">修改</a-button>
                    <a-button type="primary" @click="onDelete" class="ml-2">删除</a-button>
                    <a-button type="primary" @click="onSave" class="ml-2">提交</a-button>
                </v-toolbar>
                <v-card-text class="pa-0">
                    <a-table :customRow="customRow" :columns="columns" @change="changeTable" :dataSource="dataInfo">
                    </a-table>
                    <v-divider></v-divider>
                </v-card-text>
                <v-dialog
                        v-model="dialog"
                        width="500"
                >
                    <edit-table-info v-if="dialog" :selected="selected" :columns="columns" :tableName="tableName"
                                     v-on:editAction="editAction"></edit-table-info>
                </v-dialog>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
    import EditTableInfo from './editTableInfo'
    import {getParamTable} from "@/api/url/prodInfo";
    import {saveTable} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import DcTextField from "@/components/widgets/DcTextField";
    import {
        savaProdInfo
    } from '@/api/url/prodInfo';
    import {remove} from '@/utils/util'
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import DcMultiselect from "../../../components/widgets/DcMultiselect";

    export default {
        name: 'tableInfo',
        components: {
            DcMultiselect,
            EditTableInfo,
            DcTextField
        },
        data() {
            return {
                title: "",
                tableName: "",
                dataInfo: [],
                sourceDataInfo: [],
                disabledFlag: false,
                prodType: '',
                open: true,
                prodTypeSearch: '',
                prodClassSearch: 'RB100',
                prodClassOption: [
                    {
                        "key": "RB100",
                        "value": "RB100-存款RB100"
                    },
                    {
                        "key": "RB400",
                        "value": "RB400-存款RB400"
                    }
                ],
                addorchange: true,
                valid: true,
                dialog: false,
                tbd: {},
                option: '',
                selectedRowKeys: [],
                selected: {},
                columns: [],
                backValue: {},
                key: []
            };
        },
        mounted: function () {
            if (this.$route.params.tableName != undefined) {
                this.title = this.$route.params.tableName + "-" + this.$route.params.tableDesc
                this.tableName = this.$route.params.tableName
                this.getParaTable(this.$route.params.tableName);
            }
        },
        methods: {
            getParaTable(tableName) {
                let that = this;
                getParamTable(tableName).then(function (response) {
                    that.dataInfo = response.data.data.columnInfo;
                    that.sourceDataInfo = that.copy(that.dataInfo, that.sourceDataInfo)
                    that.columns = response.data.data.column;
                    that.tableName = tableName
                    that.getKey()
                });
            },
            getKey(){
                for(let n=0; n<this.columns.length; n++) {
                    if(this.columns[n].key == "true"){
                        this.key.push(this.columns[n])
                    }
                }
            },
            copy(obj1, obj2) {
                var obj = obj2 || {};
                for (let name in obj1) {
                    if (typeof obj1[name] === "object" && obj1[name] !== null) {
                        obj[name] = (obj1[name].constructor === Array) ? [] : {};
                        this.copy(obj1[name], obj[name]);
                    } else {
                        obj[name] = obj1[name];
                    }
                }
                return obj;
            },
            customRow(record) {
                return {
                    on: {
                        click: this.clickRow.bind(this, record)
                    }
                }
            },
            clickRow(record, event) {
                var tr = event.currentTarget;
                var tbd = tr.parentNode;
                for (const i in tbd.childNodes) {
                    if (!isNaN(i)) {
                        if (tr == tbd.childNodes[i]) {
                            tbd.childNodes[i].style = 'background-color: #e6f7ff';
                            this.tbd = tbd.childNodes[i]
                        } else {
                            tbd.childNodes[i].style = '';
                        }
                    }
                }
                this.selected = record;
            },
            onEdit() {
                this.tbd.style = '';
                this.dialog = true;
                this.addorchange = false;
            },
            onAdd() {
                this.tbd.style = '';
                this.selected = {};
                this.dialog = true;
                this.addorchange = true;
            },
            onDelete() {
                this.tbd.style = '';
                remove(this.dataInfo, this.selected)
            },
            changeTable() {
                this.tbd.style = '';
            },
            onSave() {
                this.backValue.data = filterTableChangeData(this.columns, this.dataInfo, this.sourceDataInfo)
                this.backValue.tableName = this.tableName
                this.backValue.tableDesc= this.$route.params.tableDesc
                this.backValue.option = "save"
                this.backValue.userName = sessionStorage.getItem("userId")
                if(this.backValue.data.length==0){
                    toast.error("未做任何修改,提交失败！");
                }else{
                    saveTable(this.backValue).then(response => {
                        if (response.status === 200) {
                            toast.success("提交成功！");
                            this.$router.push({ name: "paramManage", params: { tableName: this.tableName} });
                            let setTaskEvent= new Event("taskList");
                            window.dispatchEvent(setTaskEvent);
                        }
                    });
                }
            },
            close (){
                this.dialog=false
            },
            limit(editSelected){
                let keyIsNull = false
                let keyName = []
                let keyCoName = []
                let num = 0
                for(let i=0; i<this.key.length; i++){
                        if(editSelected[this.key[i].dataIndex].value == []){
                            keyIsNull = true
                            keyName.push(this.key[i].title)
                        }
                    }
                for(let j=0; j<this.dataInfo.length; j++){
                    if(editSelected[this.key[0].dataIndex].value == this.dataInfo[j][this.key[0].dataIndex]){
                        if(num == this.key.length){
                            break
                        }
                        num++
                        keyCoName.push(this.key[0].title)
                        for(let n=1; n<this.key.length; n++){
                            if(editSelected[this.key[n].dataIndex].value == this.dataInfo[j][this.key[n].dataIndex]){
                                num++
                                keyCoName.push(this.key[n].title)
                            }else{
                                num=0
                                keyCoName = []
                                break
                            }
                        }
                    }
                }
                if (this.addorchange == false){
                    let numSel = 0
                    for(let i=0; i<this.key.length; i++){
                        if(editSelected[this.key[i].dataIndex].value == this.selected[this.key[i].dataIndex]){
                            numSel++
                        }
                        if(numSel == this.key.length){
                            num = 0
                        }
                    }
                }
                if(keyIsNull == true){
                    alert(keyName+"不能为空")
                    return false
                }else if(num == this.key.length){
                    alert(keyCoName+"不能重复")
                    return false
                }else{
                    return true
                }
            },
            editAction(option, editSelected) {

                if(option == 'close'){
                    this.close()
                }
                if (option == 'submit') {
                    let selected = this.selected;
                    if (this.addorchange == true) {
                        for (const key in editSelected) {
                            if (editSelected[key] !== undefined) {
                                selected[key] = editSelected[key].value
                            }
                        }
                        if(this.limit(editSelected)){
                            this.dataInfo.splice(0, 0, selected)
                            this.close()
                        }
                    }
                    else {
                        let dataCon = this.limit(editSelected)
                        for (const keys in selected) {
                            if(dataCon == false){
                                break;
                            }else{
                                if (selected[keys] !== undefined && editSelected[keys] !== undefined) {
                                    selected[keys] = editSelected[keys].value
                                    this.close()
                                }
                            }
                        }
                    }
                }
            }
        }
    };
</script>