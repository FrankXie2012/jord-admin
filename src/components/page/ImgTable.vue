<template>
<div>
    <div class="table">
        <div class="handle-box">
            <el-select v-model="select_status" placeholder="筛选状态" class="handle-select">
                <el-option v-for="state in status" :key="state.value" :label="state.label" :value="state.value">
                </el-option>
            </el-select>
            <el-select v-model="select_cate" placeholder="筛选板块" class="handle-select">
                <el-option-group v-for="group in groups" :key="group.label" :label="group.label">
                    <el-option v-for="item in group.cards" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-option-group>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input"></el-input>
            <el-button icon="el-icon-close" @click="clear">清空条件</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="addImgs">新增图片新闻</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="selectChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="createDate" label="日期" sortable width="120">
            </el-table-column>
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column prop="categoryName" label="所属板块" width="110">
            </el-table-column>
            <el-table-column prop="hits" label="点击量" width="70">
            </el-table-column>
            <el-table-column prop="author" label="作者" width="80">
            </el-table-column>
            <el-table-column label="状态" width="100">
                <template slot-scope="scope">
                    <el-tag size="small" type="success" v-if="scope.row.delFlag == 0">已发布</el-tag>
                    <el-tag size="small" type="danger" v-if="scope.row.delFlag == 1">已删除</el-tag>
                    <el-tag size="small" type="info" v-if="scope.row.delFlag == 2">待审核</el-tag>
                    <el-tag size="small" type="warning" v-if="scope.row.delFlag == 3">审核不通过</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" :width="isPublish ? 180 : 280">
                <template scope="scope">
                    <el-button size="small" type="info"
                    @click="viewImages(scope.$index, scope.row)">查看图片</el-button>
                    <el-button type="primary" size="small"
                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <!-- 只有当用户不是发布员 且 状态不是删除 时，才可以删除 -->
                    <el-button size="small" type="danger" :class="isPublish || scope.row.delFlag === 1 ? 'hidden' : ''"
                    @click="delOne(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
            </el-pagination>
        </div>
    </div>

    <!-- 查看图片弹窗 -->
    <!-- TODO -->
    <el-dialog title="查看图片新闻" :visible.sync="dialogVisible" fullscreen>
        <el-card class="box-card margin-auto" :body-style="{ padding: '0px' }">
            <img src="~assets/news_top.png" class="image">
            <div class="article-box">
                <div class="news-box">
                    <h2 class="news-title" v-html="images.title"></h2>
                    <div class="news-detail">
                        <span><b>作者：</b><span v-html="images.author"></span></span>
                        <span><b>更新时间：</b><span>当前时间</span></span>
                    </div>
                    <!-- <pre class="news-text" v-html="article.content"></pre> -->
                </div>
            </div>
            <img src="~assets/news_bottom.png" class="image bottom-img">
        </el-card>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        const _role = this.$store.state.role;
        return {
            tableData: [],
            multipleSelection: [],
            isPublish: _role === 'publish' ? true : false,
            btnDisabled: true,
            dialogVisible: false,
            images: [],
            select_status: 1,
            select_cate: '',
            select_word: '',
            del_list: [],
            cur_page: 1,
            total: 0,
            pageSize: 15,
            status: [{
                value: 0,
                label: '删除'
            }, {
                value: 1,
                label: '审核发布'
            }, {
                value: 2,
                label: '待审核'
            }],
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
    watch: {
        select_status() {
            this.getData();
        },
        select_cate() {
            this.getData();
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        getData() {
            const self = this;
            self.$axios.post('../manage/article/list', {
                page: self.cur_page,
                status: self.select_status,
                categoryId: self.select_cate,
                title: self.select_word,
                size: self.pageSize,
                cat: 1 // 图片新闻
            }).then((res) => {
                self.tableData = res.data.list;
                self.total = res.data.total;
            });
        },
        searchWord() {
            this.getData();
        },
        clear() {
            this.select_status = '';
            this.select_word = '';
            this.select_cate = '';
        },
        selectChange(val) {
            this.multipleSelection = val;
            if (this.multipleSelection.length > 0) {
                this.btnDisabled = false;
            } else {
                this.btnDisabled = true;
            }
        },
        handleEdit(index, row) {
            this.$message('设置第' + (index + 1) + '行');
            this.$router.push('addImgs');
        },
        delOne(index, row) {
            const self = this;
            self.$alert('确定删除 "' + row.title + '" ？', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    self.$axios.post('../manage/article/delete', {
                        articleIds: row.id
                    }).then((res) => {
                        let _res = res.data;
                        if (_res.state === 'success') {
                            self.$message({
                                type: 'success',
                                message: _res.msg
                            });
                            self.getData();
                        } else {
                            self.$message.error(_res.msg);
                        }
                    });
                }
            });
        },
        addImgs() {
            this.$router.push('/addImgs');
        },
        // 查看图片
        viewImages(index, row) {
            const self = this;
            self.dialogVisible = true;
            self.$axios.post('../manage/article/view', {
                id: row.id
            }).then((res) => {
                let _res = res.data;
                if (_res.state === 'success') {
                    self.images = _res.data;
                } else {
                    self.$message.error(_res.msg);
                }
            });
        }
    }
}
</script>

<style scoped>
.hidden {
    display: none;
}

.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 150px;
}

.handle-input {
    width: 150px;
    display: inline-block;
}
</style>
