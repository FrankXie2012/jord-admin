<template>
<div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" unique-opened router>
        <template v-for="item in items">
            <template v-if="item.subs">
                <el-submenu :index="item.index">
                    <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                    <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                    </el-menu-item>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :class="item.class" :index="item.index">
                    <i :class="item.icon"></i>{{ item.title }}
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</div>
</template>

<script>
export default {
    data() {
        let _role = localStorage.getItem('role');
        return {
            items: [{
                    icon: 'el-icon-menu',
                    index: 'newsList',
                    title: '文章列表'
                },
                {
                    icon: 'el-icon-picture',
                    index: 'images',
                    title: '图片新闻'
                },
                {
                    icon: 'el-icon-edit',
                    index: 'news',
                    title: '发布文章',
                    class: (_role === 'audit' ? 'hidden' : '')
                },
                {
                    icon: 'el-icon-view',
                    index: 'newsAudit',
                    title: '文章审阅',
                    class: (_role === 'publish' ? 'hidden' : '')
                },
                {
                    icon: 'el-icon-star-off',
                    index: 'users',
                    title: '用户管理',
                    class: (_role !== 'admin' ? 'hidden' : '')
                },
                {
                    icon: 'el-icon-setting',
                    index: 'person',
                    title: '账号信息',
                }
            ]
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    }
}
</script>

<style scoped>
.hidden {
    display: none;
}

.sidebar {
    display: block;
    position: absolute;
    width: 250px;
    left: 0;
    top: 70px;
    bottom: 0;
    background: #2E363F;
}

.sidebar>ul {
    height: 100%;
}
</style>
