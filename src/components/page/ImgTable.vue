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
        <el-button icon="el-icon-close" @click="clear">清空条件</el-button>
        <el-button type="danger" :disabled="btnDisabled" icon="el-icon-delete" @click="delAll">批量删除</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="addImgs">新增图片新闻</el-button>
    </div>
    <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="日期" sortable width="150">
        </el-table-column>
        <el-table-column prop="name" label="标题">
        </el-table-column>
        <el-table-column prop="typeName" label="所属板块" width="150">
        </el-table-column>
        <el-table-column prop="num" label="图片数量" width="100">
        </el-table-column>
        <el-table-column label="操作" width="180">
            <template scope="scope">
                    <el-button type="primary" size="small"
                            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
            tableData: [],
            cur_page: 1,
            multipleSelection: [],
            btnDisabled: true,
            select_cate: '',
            select_word: '',
            del_list: [],
            is_search: false,
            total: 0,
            groups: [{
                label: '人大概览',
                cards: [{
                    value: '1_1',
                    label: '人大简介'
                }, {
                    value: '1_2',
                    label: '组织机构'
                }, {
                    value: '1_3',
                    label: '组成人员名单'
                }, {
                    value: '1_4',
                    label: '代表名单'
                }]
            }, {
                label: '图片新闻',
                cards: [{
                    value: '2_1',
                    label: '图片新闻'
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
        clear() {
            this.select_word = '';
            this.select_cate = '';
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            if (this.multipleSelection.length > 0) {
                this.btnDisabled = false;
            } else {
                this.btnDisabled = true;
            }
        },
        getData() {
            let self = this;
            self.$axios.post('getImgList', {
                page: self.cur_page
            }).then((res) => {
                self.tableData = res.data.list;
                self.total = res.data.total;
            });
        },
        handleEdit(index, row) {
            this.$message('设置第' + (index + 1) + '行');
            this.$router.push('addImgs');
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
        addImgs() {
            this.$router.push('/addImgs');
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
