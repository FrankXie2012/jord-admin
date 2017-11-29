<template>
<el-button type="primary" @click="getData">读取doc文件</el-button>
</template>

<script>
import mammoth from 'mammoth/mammoth.browser.js'

export default {
    components: {
        mammoth
    },
    methods: {
        getData() {
            console.info(mammoth);
            mammoth.convertToHtml({
                    path: "./static/demo.doc"
                })
                .then(function(result) {
                    console.info(result)
                    var html = result.value; // The generated HTML
                    var messages = result.messages; // Any messages, such as warnings during conversion
                })
                .done();
        }
    }
}
</script>
