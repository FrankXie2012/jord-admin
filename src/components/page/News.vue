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
        <el-form-item label="封面图片">
            <el-upload class="avatar-uploader" action="../manage/article/uploadImage" :show-file-list="false" :on-change="imageSuccess" :before-upload="beforeImageUpload">
                <img v-if="form.image" :src="form.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="上传文件">
            <el-upload class="upload-demo" :before-upload="hintUpload" drag action :on-change="getData" :file-list="fileList">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传docx文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button :disabled="previewActive" @click="onPreview">预览文章</el-button>
            <el-button type="primary" :disabled="btnActive" @click="onSubmit('form')">立即发布</el-button>
        </el-form-item>
    </el-form>

    <el-dialog title="预览文章" :visible.sync="dialogVisible" fullscreen>
        <el-card class="box-card margin-auto" :body-style="{ padding: '0px' }">
            <img src="~assets/news_top.png" class="image">
            <div class="article-box">
                <div class="news-box">
                    <h2 class="news-title" v-html="form.title"></h2>
                    <div class="news-detail">
                        <span><b>作者：</b><span v-html="form.author"></span></span>
                        <span><b>更新时间：</b><span>当前时间</span></span>
                    </div>
                    <pre class="news-text" v-html="article"></pre>
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
import mammoth from 'mammoth/mammoth.browser'

export default {
    components: {
        mammoth
    },
    data: function() {
        return {
            fileList: [],
            article: '',
            previewActive: true,
            dialogVisible: false,
            form: {
                categoryId: '',
                title: '',
                author: '',
                image: ''
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
                    value: '1222',
                    label: '代表大会会议'
                }, {
                    value: '1221',
                    label: '常委会会议'
                }]
            }, {
                label: '政务公开',
                cards: [{
                    value: '1211',
                    label: '决定决议'
                }, {
                    value: '1214',
                    label: '监督公开'
                }, {
                    value: '1215',
                    label: '一府两院'
                }, {
                    value: '1213',
                    label: '代表工作'
                }]
            }, {
                label: '队伍建设',
                cards: [{
                    value: '1231',
                    label: '自身建设'
                }, {
                    value: '1232',
                    label: '基层人大'
                }]
            }]
        }
    },
    computed: {
        // 按钮禁用控制
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
        imageSuccess(file, fileList) {
            this.form.image = file.url;
        },
        beforeImageUpload(file) {
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        hintUpload(file) {
            const form = this.form;
            const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            const isLt = (file.size / 1024 / 1024 < 10);
            const isFilled = !!form.categoryId && !!form.title && !!form.author;
            if (!isFilled) {
                this.$message.error('请先填写标题、作者、板块');
            }
            if (!isDocx) {
                this.$message.error('文件格式不正确');
            }
            if (!isLt) {
                this.$message.error('文件超过大小限制');
            }
            return (isDocx && isLt && isFilled);
        },
        onPreview() {
            this.dialogVisible = true;
        },
        getData(file, fileList) {
            var self = this;
            var reader = new FileReader();
            reader.onload = function(loadEvent) {
                var arrayBuffer = loadEvent.target.result;
                mammoth.convertToHtml({
                        arrayBuffer: arrayBuffer
                    })
                    .then(function(result) {
                        self.previewActive = false;
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
                        content: self.article,
                        image: self.form.image
                    };
                    self.$axios.post('../manage/article/save', _json).then((res) => {
                        var _res = res.data;
                        if (_res.state === 'success') {
                            self.$message({
                                type: 'success',
                                message: _res.msg
                            });
                            self.form = {};
                            self.article = '';
                            self.previewActive = true;
                            self.$refs[formName].resetFields();
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

<style>
.item-width {
    width: 360px;
}

.avatar {
    width: 100%;
    height: 100%;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
</style>
