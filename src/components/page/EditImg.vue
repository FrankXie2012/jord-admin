<template>
<div>
    <el-alert :title="imageTitle" type="info" :closable="false" center show-icon></el-alert>
    <br>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题" prop="name">
            <el-input v-model="form.name" class="input"></el-input>
        </el-form-item>
        <el-form-item label="图片">
            <el-upload action="uploadImgNews" class="input" multiple list-type="picture" :on-preview="preview" :on-remove="handleRemove" :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
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
            fileList: []
        }
    },
    computed: {
        imageTitle: function() {
            const _imageTitle = this.$store.state.image.title;
            if (!_imageTitle) {
                return '新增图片';
            } else {
                return '修改 "' + _imageTitle + '" 图片';
            }
        }
    },
    created() {
        const self = this;
        const _image = this.$store.state.image;
        self.$axios.post('../manage/article/view', {
            id: _image.id
        }).then((res) => {
            let _res = res.data;
            if (_res.state === 'success') {
                self.fileList = _res.data.content;
                self.form.name = _res.data.title;
            } else {
                self.$message.error(_res.msg);
            }
        });
    },
    methods: {
        handleRemove(file, fileList) {
            this.$message.error('已删除' + file.name);
        },
        preview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
            this.dialogImageName = file.name;
        },
        onSubmit() {
            var self = this;
            console.info(this.form);
            this.$store.commit('setImage', '');
            this.$message({
                message: '提交成功',
                type: 'success'
            });
            setTimeout(function() {
                self.$router.push('/images');
            }, 1000);
        },
        onBack() {
            this.$store.commit('setImage', '');
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
