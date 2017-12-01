<template>
<div>
    <el-upload class="upload-demo" drag action :on-change="getData" :file-list="fileList" :accept="docx">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传docx文件，且不超过500kb</div>
    </el-upload>
    <div v-html="article"></div>
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
