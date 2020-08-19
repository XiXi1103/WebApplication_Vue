<template>
    <el-aside width="15%">
        <el-row class="tac">
            <el-col>
                <br>
                <br>
                <el-button type="success" icon="el-icon-edit" style="margin-left: 5%;width: 60%" @click.native="GotoMarkDown(false)">新建文档</el-button>
                <br>
                <br>
                <el-menu
                        router :default-active="$route.path"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
<!--                                <el-submenu index="1">-->
<!--                                    <template slot="title">-->
<!--                                        <i class="el-icon-location"></i>-->
<!--                                        <span>导航一</span>-->
<!--                                    </template>-->
<!--                                    <el-menu-item-group>-->
<!--                                        <template slot="title">分组一</template>-->
<!--                                        <el-menu-item index="1-1">选项1</el-menu-item>-->
<!--                                        <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--                                    </el-menu-item-group>-->
<!--                                    <el-menu-item-group title="分组2">-->
<!--                                        <el-menu-item index="1-3">选项3</el-menu-item>-->
<!--                                    </el-menu-item-group>-->
<!--                                    <el-submenu index="1-4">-->
<!--                                        <template slot="title">选项4</template>-->
<!--                                        <el-menu-item index="1-4-1">选项1</el-menu-item>-->
<!--                                    </el-submenu>-->
<!--                                </el-submenu>-->
                    <el-menu-item index="/homepage">
                        <i class="el-icon-time"></i>
                        <span slot="title">最近使用</span>
                    </el-menu-item>
                    <el-menu-item index="/Mycreate">
                        <i class="el-icon-document"></i>
                        <span slot="title">我的文档</span>
                    </el-menu-item>
                    <el-menu-item index="/mycollection">
                        <i class="el-icon-menu"></i>
                        <span slot="title">我的收藏</span>
                    </el-menu-item>
                    <el-menu-item index="/RecycleBin">
                        <i class="el-icon-delete"></i>
                        <span slot="title">  回  收  站  </span>
                    </el-menu-item>
<!--                                <el-menu-item index="5" disabled>-->
<!--                                    <i class="el-icon-document"></i>-->
<!--                                    <span slot="title">导航三</span>-->
<!--                                </el-menu-item>-->
<!--                                <el-menu-item index="6">-->
<!--                                    <i class="el-icon-setting"></i>-->
<!--                                    <span slot="title">导航四</span>-->
<!--                                </el-menu-item>-->
                </el-menu>
            </el-col>
        </el-row>
    </el-aside>    
</template>

<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>
    .el-header, .el-footer {
        background-color: white;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: white;
        color: #333;
        text-align: center;
        /*line-height: 200px;*/
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>