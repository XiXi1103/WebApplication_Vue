<template>
<div>
    <el-container>
        <el-header>
            <Topbar></Topbar>
        </el-header>
        <el-container>
            <el-aside width="200px">
<!--                <el-row class="tac">-->
<!--                    <el-col :span="12">-->
<!--                        <h5>默认颜色</h5>-->
<!--                        <el-menu-->
<!--                                default-active="2"-->
<!--                                class="el-menu-vertical-demo"-->
<!--                                @open="handleOpen"-->
<!--                                @close="handleClose">-->
<!--                            <el-submenu index="1">-->
<!--                                <template slot="title">-->
<!--                                    <i class="el-icon-location"></i>-->
<!--                                    <span>导航一</span>-->
<!--                                </template>-->
<!--                                <el-menu-item-group>-->
<!--                                    <template slot="title">分组一</template>-->
<!--                                    <el-menu-item index="1-1">选项1</el-menu-item>-->
<!--                                    <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--                                </el-menu-item-group>-->
<!--                                <el-menu-item-group title="分组2">-->
<!--                                    <el-menu-item index="1-3">选项3</el-menu-item>-->
<!--                                </el-menu-item-group>-->
<!--                                <el-submenu index="1-4">-->
<!--                                    <template slot="title">选项4</template>-->
<!--                                    <el-menu-item index="1-4-1">选项1</el-menu-item>-->
<!--                                </el-submenu>-->
<!--                            </el-submenu>-->
<!--                            <el-menu-item index="2">-->
<!--                                <i class="el-icon-menu"></i>-->
<!--                                <span slot="title">导航二</span>-->
<!--                            </el-menu-item>-->
<!--                            <el-menu-item index="3" disabled>-->
<!--                                <i class="el-icon-document"></i>-->
<!--                                <span slot="title">导航三</span>-->
<!--                            </el-menu-item>-->
<!--                            <el-menu-item index="4">-->
<!--                                <i class="el-icon-setting"></i>-->
<!--                                <span slot="title">导航四</span>-->
<!--                            </el-menu-item>-->
<!--                        </el-menu>-->
<!--                    </el-col>-->
<!--                </el-row>-->
            </el-aside>
            <el-container>
                <el-main>
<!--                    <el-row :gutter="20">-->
<!--                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
<!--                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
<!--                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
<!--                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
<!--                    </el-row>-->
                </el-main>
                <el-footer>
                    <el-button type="info" style="float:right" @click="GotoMarkDown">新建</el-button>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</div>
</template>


<script>
  import Topbar from "../components/Topbar";
  export default {
    methods: {
      GotoMarkDown:function(){
        this.$router.push({path:'/markdown'});
      },
      handleOpen(key, keyPath) {
          console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
          console.log(key, keyPath);
      }
    },
    components:{
      Topbar
    }
  }
</script>

<style>
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
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