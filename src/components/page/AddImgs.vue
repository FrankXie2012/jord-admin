<template>
<div>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题" prop="name">
            <el-input v-model="form.name" class="input"></el-input>
        </el-form-item>
        <el-form-item label="图片">
            <el-upload action="uploadImgNews" multiple list-type="picture-card" :on-preview="preview" :on-remove="handleRemove" :file-list="fileList">
                <i class="el-icon-plus"></i>
            </el-upload>
        </el-form-item>
        <el-dialog :title="dialogImageName" :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即发布</el-button>
            <el-button @click="onBack">返回列表</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
    data: function() {
        return {
            form: {
                name: ''
            },
            dialogImageUrl: '',
            dialogVisible: false,
            dialogImageName: '',
            fileList:  []
        }
    },
    created() {
        var self = this;
        self.$axios.post('../getImgNews').then((res) => {
            self.fileList = res.data.newsImgs;
            self.form.name = res.data.newsName;
        });
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        preview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
            this.dialogImageName = file.name;
        },
        onSubmit() {
            var self = this;
            console.info(this.form);
            this.$message({
                message: '提交成功',
                type: 'success'
            });
            setTimeout(function() {
                self.$router.push('/images');
            }, 1000);
        },
        onBack() {
            this.$router.push('/images');
        }
    }
}
</script>

<style scoped>
.input {
    width: 360px;
}
</style>
