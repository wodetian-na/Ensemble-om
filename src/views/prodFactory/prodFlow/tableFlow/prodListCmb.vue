<template>
    <v-card class="radiusDc">
        <v-toolbar card color="white">
            <v-text-field flat solo prepend-icon="search" placeholder="请输入产品名称或描述" v-model="search" clearable hide-details class="hidden-sm-and-down"></v-text-field>
            <v-btn color="info" @click="addCompare">加入对比</v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <v-data-table :headers="complex.headers" :search="search" :items="items" :rows-per-page-items="[10,25,50,{text:'All','value':-1}]" class="elevation-1" item-key="prodType" select-all v-model="complex.selected">
                <template slot="items" slot-scope="props" >
                    <tr :active="props.selected" @click="props.selected = !props.selected">
                        <td>
                            <v-checkbox
                                    :input-value="props.selected"
                                    primary
                                    hide-details
                            ></v-checkbox>
                        </td>
                      <td>{{ props.item.prodType }}</td>
                      <td>{{ props.item.prodDesc }}</td>
                      <td>{{ props.item.sourceModule }}</td>
                      <td>{{ props.item.prodRange === "B"?"基础产品":"可售产品" }}</td>
                      <td>{{ props.item.baseProdType }}</td>
                      <td>{{ props.item.status === "A"?"有效":"封存"}}</td>
                      <td>
                        <v-btn depressed outline icon fab dark color="primary" small @click="handleClick(props.item)">
                          <v-icon>edit</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
    import {
        getProdType
    } from '@/api/prod';
    import {
        getDepositDtl
    } from '@/api/prod';
    export default {
        props: {
            items: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                //items: [],
                prodclass: '',
                search: '',
                complex: {
                    selected: [],
                    items: [],
                    headers: [
                        // {
                        //     text: 'Avatar',
                        //     value: 'avatar'
                        // },
                        {
                            text: '产品代码',
                            value: 'prodType'
                        },
                        {
                            text: '产品描述',
                            value: 'prodDesc'
                        },
                        {
                            text: '所属模块',
                            value: 'sourceModule'
                        },
                        {
                            text: '产品属性',
                            value: 'prodGroup'
                        },
                        {
                            text: '基础产品',
                            value: 'baseProdType'
                        },
                        {
                            text: '产品状态',
                            value: 'status'
                        },
                        {
                            text: 'Action',
                            value: ''
                        },
                    ]
                }
            };
        },
        methods: {
            addCompare() {
                let selected = [];
                for (const item in this.complex.selected) {
                    selected.push(this.complex.selected[item].value)
                }
                this.$router.push({
                    name: 'diffList',
                    params: {
                        'prodCodeList': selected
                    }
                })
            },
            handleClick(val) {
                let prodType = val.prodType
                let prodRange = val.prodRange
                let sourceModule = val.sourceModule
                if(prodRange == 'B' && sourceModule == "RB"){
                    //跳转到存款基础产品界面
                    this.$router.push({ name: "RbBaseProds", params: { prodType: prodType} });
                }
                if(prodRange == 'S' && sourceModule == "RB"){
                    //跳转到存款可售产品界面
                    this.$router.push({ name: "RbSoldProds", params: { prodType: prodType} });
                }
                if(prodRange == 'B' && sourceModule == "CL"){
                    //跳转到贷款基础产品界面
                    this.$router.push({ name: "ClBaseProds", params: { prodType: prodType} });
                }
                if(prodRange == 'S' && sourceModule == "CL"){
                    //跳转到贷款可售产品界面
                    this.$router.push({ name: "ClSoldProds", params: { prodType: prodType} });
                }
            }
        }
    };
</script>
