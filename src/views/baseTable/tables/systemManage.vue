<template>
    <div class="elevation-4">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>交易系统管理</v-toolbar-title>
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
                                <v-flex xs12 sm12 md12 v-if="disabled=='true'">
                                    <v-text-field v-model="editedItem.systemId" label="系统ID" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-if="disabled=='false'">
                                    <v-text-field v-model="editedItem.systemId" label="系统ID"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="editedItem.systemName" label="系统名称"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="editedItem.systemDesc" label="系统描述"></v-text-field>
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
                <td>{{ props.item.systemId }}</td>
                <td>{{ props.item.systemName }}</td>
                <td>{{ props.item.systemDesc }}</td>
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
            headers: [
                { text: '系统ID',sortable: false},
                { text: '系统名称',sortable: false},
                { text: '系统描述',sortable: false },
                { text: 'Action',sortable: false }
            ],
            desserts: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "systemId"
                }
            ],
            editedIndex: -1,
            title: "",
            editedItem: {
                systemId: '',
                systemName: '',
                systemDesc: ''
            },
            defaultItem: {
                systemId: '',
                systemName: '',
                systemDesc: ''
            },
            backValue: {}
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增系统信息' : '修改系统信息'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                let that = this
                getSysTable("OM_SYSTEM_ORG").then(function (response) {
                    that.desserts = response.data.data.columnInfo;
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                });
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
                //保存数据落库
                this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                this.backValue.userName = sessionStorage.getItem("userId")
                this.backValue.tableName = "OM_SYSTEM_ORG"
                this.backValue.keySet = "SYSTEM_ID"
                saveSysTable(this.backValue).then(response => {
                    if(response.status === 200){
                    toast.success("提交成功！");
                }
            })
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