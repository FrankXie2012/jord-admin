<template>
<div>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="选择板块" prop="card" class="select" >
            <el-select v-model="form.card" placeholder="请选择" style="width: 360px">
                <el-option-group v-for="group in groups" :key="group.label" :label="group.label">
                    <el-option v-for="item in group.cards" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-option-group>
            </el-select>
        </el-form-item>
        <el-form-item label="上传文件">
            <el-upload class="upload-demo" drag action :on-change="getData" :file-list="fileList">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传docx文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="预览效果" :class="{ hidden: isHidden }">
            <el-card class="box-card" :body-style="{ padding: '0px' }">
                <img src="~assets/news_top.png" class="image">
                <div class="article-box" v-html="article"></div>
                <img src="~assets/news_bottom.png" class="image bottom-img">
            </el-card>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即发布</el-button>
        </el-form-item>
    </el-form>
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
            article: '',
            isHidden: true,
            form: {
                card: ''
            },
            rules: {
                card: [{
                    required: true,
                    message: '请选择新闻板块',
                    trigger: 'change'
                }]
            },
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
                        self.isHidden = false;
                        self.article = result.value;
                    })
                    .done();
            };
            reader.readAsArrayBuffer(file.raw);
        },
        onSubmit() {
            console.info(this.form);
        }
    }
}
</script>

<style>
.hidden {
    display: none;
}
.box-card {
    width: 1000px;
}
.bottom-img {
    margin-bottom: -15px;
}

.article-box {
    width: 800px;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0 auto;
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
