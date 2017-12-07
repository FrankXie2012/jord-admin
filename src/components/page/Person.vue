<template>
<div>
    <el-tabs v-model="activeName" @tab-click="tabClick" type="border-card">
        <el-tab-pane label="修改用户名" name="first">
            <div class="form-box">
                <el-form ref="form1" :model="form1" :rules="rules1" label-width="80px">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="form1.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="form1.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form1')">提交</el-button>
                        <el-button @click="resetForm('form1')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
            <div class="form-box">
                <el-form ref="form2" :model="form2" :rules="rules2" label-width="100px">
                    <el-form-item label="原密码" prop="old">
                        <el-input type="password" v-model="form2.old" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="new">
                        <el-input type="password" v-model="form2.new" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="重复新密码" prop="repeat">
                        <el-input type="password" v-model="form2.repeat" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form2')">提交</el-button>
                        <el-button @click="resetForm('form2')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
    </el-tabs>

</div>
</template>

<script>
export default {
    data: function() {
        return {
            activeName: 'first',
            form1: {
                name: '',
                pass: ''
            },
            rules1: {
                name: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 8,
                        message: '长度在 3 到 8 个字符',
                        trigger: 'blur'
                    }
                ],
                pass: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }]
            },
            form2: {
                old: '',
                new: '',
                repeat: ''
            },
            rules2: {
                old: [{
                    required: true,
                    message: '请输入原密码',
                    trigger: 'blur'
                }],
                new: [{
                        required: true,
                        message: '请输入新密码',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '长度在 6 到 10 个字符',
                        trigger: 'blur'
                    }
                ],
                repeat: [{
                    required: true,
                    message: '请重复密码',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        tabClick() {
            console.info(this);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }

}
</script>
