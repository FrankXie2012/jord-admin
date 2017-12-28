<template>
<div class="table">
    <div class="handle-box">
        <el-input v-model="select_name" placeholder="昵称搜索" class="handle-input" @change="searchName"></el-input>
        <el-input v-model="select_username" placeholder="用户名搜索" class="handle-input" @change="searchUsername"></el-input>
        <el-button icon="el-icon-close" @click="clear">清空条件</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="newUser">人员新增</el-button>
        <el-button type="danger" icon="el-icon-delete" :disabled="btnDisabled" @click="delMulti">批量删除</el-button>
        <el-button type="info" icon="el-icon-refresh" :disabled="resetDisabled" @click="resetPwd">重置密码</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="selectChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="用户名" width="120">
        </el-table-column>
        <el-table-column prop="name" label="昵称" width="100">
        </el-table-column>
        <el-table-column prop="role" label="角色" width="130">
        </el-table-column>
        <el-table-column prop="lasttime" label="上次登录时间" width="120">
        </el-table-column>
        <el-table-column prop="desc" label="描述">
        </el-table-column>
        <el-table-column label="操作" width="180">
            <template scope="scope">
                <el-button size="small"
                        @click="updateRole(scope.$index, scope.row)">设置权限</el-button>
                <el-button size="small" type="danger"
                        @click="delOne(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
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
            select_name: '',
            select_username: '',
            btnDisabled: true,
            resetDisabled: true,
            total: 0,
            pageSize: 10
        }
    },
    created() {
        this.getData();
    },
    methods: {
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        searchName() {
            this.getData();
        },
        searchUsername() {
            this.getData();
        },
        clear() {
            this.select_name = '';
            this.select_username = '';
        },
        selectChange(val) {
            this.multipleSelection = val;
            if (this.multipleSelection.length > 0) {
                this.btnDisabled = false;
            } else {
                this.btnDisabled = true;
            }
            if (this.multipleSelection.length === 1) {
                this.resetDisabled = false;
            } else {
                this.resetDisabled = true;
            }
        },
        getData() {
            const self = this;
            self.$axios.post('manage/user/list', {
                page: self.cur_page,
                name: self.select_name,
                username: self.select_username,
                size: self.pageSize
            }).then((res) => {
                self.tableData = res.data.list;
                self.total = res.data.total;
            });
        },
        updateRole() {},
        delOne() {},
        newUser() {},
        delMulti() {},
        resetPwd() {
            const self = this;
            let _row = this.multipleSelection[0];
            this.$alert('重置用户 "'+_row.username+'" 的密码为：123456', '重置密码', {
                confirmButtonText: '确定',
                callback: action => {
                    self.$axios.post('manage/user/resetPwd', {
                        username: _row.username
                    }).then((res) => {
                        let _res = res.data;
                        if (_res.state === 'success') {
                            self.$message({
                                type: 'success',
                                message: _res.msg
                            });
                        } else {
                            self.$message.error(_res.msg);
                        }
                    });
                }
            });
        }
    }
}
</script>

<style scoped>
.handle-input {
    width: 200px;
}
</style>
