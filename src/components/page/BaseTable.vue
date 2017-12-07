<template>
<div class="table">
    <div class="handle-box">
        <el-select v-model="select_cate" placeholder="筛选板块" class="handle-select">
            <el-option-group v-for="group in groups" :key="group.label" :label="group.label">
                <el-option v-for="item in group.cards" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-option-group>
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input"></el-input>
        <el-button type="primary" icon="el-icon-close" @click="clear">清空条件</el-button>
        <el-button type="primary" icon="el-icon-delete" class="handle-del" @click="delAll">批量删除</el-button>
    </div>
    <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="日期" sortable width="150">
        </el-table-column>
        <el-table-column prop="name" label="标题">
        </el-table-column>
        <el-table-column prop="typeName" label="所属板块" width="150">
        </el-table-column>
        <el-table-column prop="image" label="图片">
        </el-table-column>
        <el-table-column label="操作" width="180">
            <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">设为轮播</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
        </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
        </el-pagination>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            // url: './static/vuetable.json',
            tableData: [],
            cur_page: 1,
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            del_list: [],
            is_search: false,
            total: 0,
            groups: [{
                label: '会议专题',
                cards: [{
                    value: '1_1',
                    label: '代表大会会议'
                }, {
                    value: '1_2',
                    label: '常委会会议'
                }]
            }, {
                label: '政务公开',
                cards: [{
                    value: '2_1',
                    label: '决定决议'
                }, {
                    value: '2_2',
                    label: '监督公开'
                }, {
                    value: '2_3',
                    label: '一府两院'
                }, {
                    value: '2_4',
                    label: '代表工作'
                }]
            }, {
                label: '队伍建设',
                cards: [{
                    value: '3_1',
                    label: '自身建设'
                }, {
                    value: '3_2',
                    label: '基层人大'
                }]
            }]
        }
    },
    created() {
        this.getData();
    },
    computed: {
        data() {
            const self = this;
            return self.tableData.filter(function(d) {
                let is_del = false;
                for (let i = 0; i < self.del_list.length; i++) {
                    if (d.name === self.del_list[i].name) {
                        is_del = true;
                        break;
                    }
                }
                if (!is_del) {
                    if (d.type.indexOf(self.select_cate) > -1 &&
                        (d.name.indexOf(self.select_word) > -1 ||
                            d.typeName.indexOf(self.select_word) > -1)
                    ) {
                        return d;
                    }
                }
            })
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        getData() {
            let self = this;
            // if (process.env.NODE_ENV === 'development') {
            //     self.url = '/ms/table/list';
            // };
            // self.$axios.get(self.url, {
            //     page: self.cur_page
            // }).then((res) => {
                // self.tableData = res.data.list;
                // self.total = res.data.total;
            // })
            self.total = 10;
            self.tableData = [{
                "date": "2017-11-11",
                "name": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
                "image": "img.png",
                "type": "1_1",
                "typeName": "代表大会会议"
            }, {
                "date": "2017-09-24",
                "name": "建瓯市人大常委会关于授予建瓯市国家税务局“人民满意单位”荣誉称号的决定",
                "image": "img2.png",
                "type": "1_2",
                "typeName": "常委会会议"
            }, {
                "date": "2017-08-08",
                "name": "2016年8月29日建瓯市第十五届人大常委会第36次会议通过",
                "image": "img.png",
                "type": "1_1",
                "typeName": "代表大会会议"
            }, {
                "date": "1978-06-18",
                "name": "城区殡葬“一条龙”服务点改革情况的调研报告",
                "image": "img.png",
                "type": "2_1",
                "typeName": "决定决议"
            }, {
                "date": "1977-07-09",
                "name": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
                "image": "img.png",
                "type": "2_4",
                "typeName": "代表工作"
            }, {
                "date": "1994-09-20",
                "name": "关于吴慧艳等同志职务任免的通知",
                "image": "img.png",
                "type": "2_1",
                "typeName": "决定决议"
            }, {
                "date": "1980-01-22",
                "name": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
                "image": "img.png",
                "type": "2_2",
                "typeName": "监督公开"
            }, {
                "date": "1985-10-10",
                "name": "龙村乡人大代表王菊英风采",
                "image": "img.png",
                "type": "3_1",
                "typeName": "自身建设"
            }, {
                "date": "1975-09-08",
                "name": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
                "image": "img.png",
                "type": "1_1",
                "typeName": "代表大会会议"
            }, {
                "date": "1970-06-07",
                "name": "建瓯市人大常委会关于授予建瓯市国家税务局“人民满意单位”荣誉称号的决定",
                "image": "img.png",
                "type": "1_2",
                "typeName": "常委会会议"
            }];
        },
        clear() {
            this.select_word = '';
            this.select_cate = '';
        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handleEdit(index, row) {
            this.$message('设置第' + (index + 1) + '行');
        },
        handleDelete(index, row) {
            this.$message.error('删除第' + (index + 1) + '行');
        },
        delAll() {
            const self = this,
                length = self.multipleSelection.length;
            let str = '';
            self.del_list = self.del_list.concat(self.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += self.multipleSelection[i].name + ' ';
            }
            self.$message.error('删除了' + str);
            self.multipleSelection = [];
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 200px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
</style>
