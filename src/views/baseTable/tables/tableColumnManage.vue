<template>
    <div class="elevation-4">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>元数据管理</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" flat color="primary lighten-2" @click="addClick">
                    <td style="color: white;margin-left: 100px">添加</td>
                </v-btn>
                <v-card>
                    <v-card-title>
                        <span style="color: #00b0ff;font-size: x-large;margin-left: 5%">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text style="margin-top: -10%">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs6 sm6 md6 v-if="disabled=='true'">
                                    <v-text-field v-model="editedItem.columnId" label="字段ID" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6 v-if="disabled=='false'">
                                    <v-text-field v-model="editedItem.columnId" label="字段ID"></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field v-model="editedItem.columnDesc" label="字段名称"></v-text-field>
                                </v-flex>
                                <!--<v-flex xs12 sm12 md12>-->
                                    <!--<v-text-field v-model="editedItem.valueType" label="数据类型"></v-text-field>-->
                                <!--</v-flex>-->
                                <!--<v-flex xs12 sm12 md12>-->
                                    <!--<v-text-field v-model="editedItem.valueLength" label="数据长度"></v-text-field>-->
                                <!--</v-flex>-->
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.columnType" label="字段属性" :items="columnTypeRf" item-text="value" item-value="key"></v-select>

                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.valueMethod" label="数据模型" :items="valueMethodRf" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.valueScore" label="数据来源表" :items="tab" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field v-model="editedItem.valueScoreColumn" label="数据参数"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions style="margin-top: -7%">
                        <v-btn color="info" @click="close" class="bthStyle" style="margin-left: 6%">取消</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="info" @click="save" class="bthStyle" style="margin-right: 6%">保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table :headers="headers" :items="desserts" class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.columnId }}</td>
                <td>{{ props.item.columnDesc }}</td>
                <!--<td>{{ props.item.valueType }}</td>-->
                <!--<td>{{ props.item.valueLength }}</td>-->
                <td>{{ props.item.columnType }}</td>
                <td>{{ props.item.valueMethod }}</td>
                <td>{{ props.item.valueScore }}</td>
                <td>{{ props.item.valueScoreColumn }}</td>

                <td>
                    <v-tooltip bottom color="blue" style="margin-left: -20px">
                        <v-btn flat icon="edit" slot="activator">
                            <v-icon small class="mr-2" @click="editItem(props.item)" style="color: #0d47a1">edit</v-icon>
                        </v-btn>
                        <span>修改</span>
                    </v-tooltip>
                    <v-tooltip bottom color="red" style="margin-left: -20px">
                        <v-btn flat icon="delete" slot="activator">
                            <v-icon small @click="deleteItem(props.item)" style="color: red">delete</v-icon>
                        </v-btn>
                        <span>删除</span>
                    </v-tooltip>
                </td>
            </template>
        </v-data-table>
    </div>
</template>
<script>
    import {getSysTable} from "@/api/url/prodInfo";
    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import {saveSysTable} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import {getSysInfoByUser} from "@/api/url/prodInfo";
    import columnInfo from '@/views/prodFactory/prodInfo/columnInfo'

    export default {
        props: ["title"],
        data: () => ({
            dialog: false,
            disabled: "false",
            tab: [],
            valueMethodRf: [
                {
                    key: "RF",
                    value: "数据来源他表"
                },
                {
                    key: "VL",
                    value: "固定备选数据"
                },
                {
                    key: "FD",
                    value: "手动输入"
                },
                {
                    key: "YN",
                    value: "YN"
                }
            ],
            columnTypeRf: [
                {
                    key: "select",
                    value: "下拉选择"
                },
                {
                    key: "input",
                    value: "手动输入"
                },
                {
                    key: "switch",
                    value: "开关"
                },
                {
                    key: "data",
                    value: "日期控件"
                },
                {
                    key: "tree",
                    value: "树形结构"
                }
            ],
            headers: [
                { text: '字段ID',sortable: false},
                { text: '字段名称',sortable: false},
//                { text: '数据类型',sortable: false },
//                { text: '数据长度',sortable: false },
                { text: '字段属性',sortable: false },
                { text: '数据模型',sortable: false },
                { text: '数据来源表',sortable: false },
                { text: '数据参数',sortable: false },
                { text: 'Action',sortable: false }
            ],
            desserts: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "tableName"
                }
            ],
            editedIndex: -1,
            title: "",
            editedItem: {
                columnId: '',
                columnDesc: '',
//                valueType: '',
//                valueLength: '',
                columnType: '',
                valueMethod: '',
                valueScore: '',
                valueScoreColumn: ''
            },
            defaultItem: {
                columnId: '',
                columnDesc: '',
//                valueType: '',
//                valueLength: '',
                columnType: '',
                valueMethod: '',
                valueScore: '',
                valueScoreColumn: ''

            },
            backValue: {}
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增元数据' : '修改元数据'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.initialize()
            this.initRf()
        },

        methods: {
            initRf() {
                let that = this
                getSysTable("OM_TABLE_LIST").then(function (response) {
                    for(let i=0; i<response.data.data.columnInfo.length; i++){
                        let temp = {}
                        temp["key"] = response.data.data.columnInfo[i].tableName
                        temp["value"] = response.data.data.columnInfo[i].tableDesc
                        that.tab.push(temp)
                    }
                });
            },
            initialize () {
                let that = this
                //读取本地json文件
                const dataSource = columnInfo;
                for(let i in dataSource){
                    let temp = {}
                    temp["columnId"] = i
                    temp["columnDesc"] = dataSource[i].columnDesc
                    temp["columnType"] = dataSource[i].columnType
                    temp["valueMethod"] = dataSource[i].valueMethod
                    temp["valueScore"] = dataSource[i].valueScore === undefined?"":dataSource[i].valueScore.tableName
                    let valueScoreColumn = " "
                    if(dataSource[i].valueMethod === "RF" && dataSource[i].valueScore !== undefined){
                        valueScoreColumn = dataSource[i].valueScore.columnCode
                        valueScoreColumn = valueScoreColumn + dataSource[i].valueScore.columnDesc
                    }
                    if(dataSource[i].valueMethod == "VL" && dataSource[i].valueScore !== undefined){
                        for(let j=0; j<dataSource[i].valueScore.length; j++){
                            valueScoreColumn =valueScoreColumn + dataSource[i].valueScore[j].key +"-" + dataSource[i].valueScore[j].value +','
                        }
                        valueScoreColumn = valueScoreColumn.substr(0, valueScoreColumn.length - 1);
                    }
                    temp["valueScoreColumn"] = valueScoreColumn
                    that.desserts.push(temp)
                }
            },
            addClick() {
                this.disabled = "false"
            },
            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                this.disabled = "true";

            },

            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
//                //保存数据本地json文件
//                var fs = require('fs');
//                fs.writeFile('@/views/prodFactory/prodInfo/columnInfo.json',JSON.stringify(this.desserts),function(err){
//                    if(err){
//                        console.error(err);
//                    }
//                    console.log('----------新增成功-------------');
//                })
////                this.desserts
                toast.success("提交成功！");
                this.close()
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
            }
        }
    }
</script>
<style scoped>
    .ee{
        font-size: medium;
    }
    .bthStyle {
        color: #00b0ff;
        width: 120px;
    }
</style>