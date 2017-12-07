<template>
<div>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
            <el-upload class="upload-demo" drag action multiple :on-change="getData" :file-list="fileList">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="预览效果" :class="{ hidden: isHidden }">
            <img :src="preview" class="image">
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即发布</el-button>
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
            fileList: [],
            preview: '',
            isHidden: true
        }
    },
    methods: {
        getData(file, fileList) {
            var self = this;
            var reader = new FileReader();
            reader.onload = function(loadEvent) {
                var _src = loadEvent.target.result;
                self.preview = _src;
                self.isHidden = false;
            };
            reader.readAsDataURL(file.raw);
        },
        onSubmit() {
            console.info(this.form);
        }
    }
}
</script>

<style scoped>
.form {
    width: 360px;
}

.image {
    width: 360px;
    height: 250px;
    border: 1px solid #ccc;
}
</style>
