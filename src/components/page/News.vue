<template>
<div>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="文章名称" prop="title">
            <el-input v-model="form.title" class="item-width"></el-input>
        </el-form-item>
        <el-form-item label="文章作者" prop="author">
            <el-input v-model="form.author" class="item-width"></el-input>
        </el-form-item>
        <el-form-item label="选择板块" prop="categoryId" class="select">
            <el-select v-model="form.categoryId" placeholder="请选择" class="item-width">
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
                <!-- <img src="~assets/news_top.png" class="image"> -->
                <div class="article-box" v-html="article"></div>
                <!-- <img src="~assets/news_bottom.png" class="image bottom-img"> -->
            </el-card>
        </el-form-item>
        <el-form-item>
            <el-button :type="btnType" :disabled="btnActive" @click="onSubmit('form')">立即发布</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import mammoth from 'mammoth/mammoth.browser'

export default {
    components: {
        mammoth
    },
    data: function() {
        return {
            fileList: [],
            article: '',
            isHidden: true,
            btnText: '立即发布',
            btnType: 'primary',
            form: {
                categoryId: '',
                title: '',
                author: ''
            },
            rules: {
                title: [{
                    required: true,
                    message: '请输入文章标题',
                    trigger: 'blur'
                }],
                author: [{
                    required: true,
                    message: '请输入作者',
                    trigger: 'blur'
                }],
                categoryId: [{
                    required: true,
                    message: '请选择所属板块',
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
    computed: {
        // 登录按钮禁用控制
        btnActive: function() {
            let form = this.form;
            if (form.categoryId && form.title && form.author && this.article) {
                return false;
            } else {
                return true;
            }
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
        onSubmit(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    let _json = {
                        title: self.form.title,
                        author: self.form.author,
                        categoryId: self.form.categoryId,
                        content: self.article
                    };
                    self.$axios.post('manage/article/save', _json).then((res) => {
                        var _res = res.data;
                        if (_res.state === 'success') {
                            self.$message(_res.msg);
                            self.form = {};
                            self.article = '';
                            self.isHidden = true;
                        } else {
                            self.btnText = _res.msg;
                            self.btnType = 'danger';
                        }
                    });
                }
            });
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

.item-width {
    width: 360px;
}

.article-box {
    width: 800px;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 30px auto;
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
