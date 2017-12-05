<template>
<div>
    <el-select v-model="value7" placeholder="请选择">
        <el-option-group v-for="group in options3" :key="group.label" :label="group.label">
            <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-option-group>
    </el-select>
    <el-upload class="upload-demo" drag action :on-change="getData" :file-list="fileList" :accept="docx">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传docx文件，且不超过500kb</div>
    </el-upload>
    <el-tag><i class="el-icon-view"></i> 预览效果</el-tag>
    <el-card class="box-card article-box" v-html="article">
    </el-card>
</div>
</template>

<script>
import mammoth from 'mammoth/mammoth.browser.js'

export default {
    components: {
        mammoth
    },
    data: function() {
        return {
            fileList: [],
            article: ''
        }
    },
    methods: {
        getData(file, fileList) {
            var self = this;
            var reader = new FileReader();
            reader.onload = function(loadEvent) {
                var arrayBuffer = loadEvent.target.result;
                mammoth.convertToHtml({
                        arrayBuffer: arrayBuffer
                    })
                    .then(function(result) {
                        self.article = result.value;
                    })
                    .done();
            };
            reader.readAsArrayBuffer(file.raw);
        }
    }
}
</script>

<style>
.article-box {
    width: 800px;
    height: 500px;
    overflow-y: auto;
    padding: 30px;
}

.article-box h1,
.article-box h2,
.article-box h3,
.article-box h4,
.article-box h5,
.article-box h6 {
    text-align: center;
    margin-bottom: 50px;
}

.article-box img {
    display: block;
    margin: 10px;
    margin-left: auto;
    margin-right: auto;
}

.article-box>p,
.article-box li {
    line-height: 30px;
    font-size: 14px;
}

.article-box ol li {
    margin-left: 15px;
}
</style>
