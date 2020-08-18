<template>
    <div class="block" style="line-height: normal">
        <el-timeline>
            <el-timeline-item v-for="Pages in this.res.pageList" :key="Pages.date" :timestamp=Pages.date placement="top">
                <el-row :gutter="14">
                    <el-col :span="12" v-for="Page in Pages.pageList" :key="Page.id">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }" style="margin-bottom: 10px" @click.native="viewmk(Page.id)">
                            <el-image
                                    style="width: 50px; height: 50px; float: left; margin-left: 10px"
                                    :src="require('@/assets/document-gray.png')"
                                    :fit="fit"></el-image>
                            <el-dropdown style="float: right;margin-top: -15px;margin-right: 5px">
                                <el-button style="border-color: white">
                                    <i class="el-icon-more"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="catwriter(Page.id)">查看协作者</el-dropdown-item>
                                    <el-dropdown-item @click.native="dialogFormVisible = true">邀请协作</el-dropdown-item>
                                    <el-dropdown-item @click.native="dropwrite(Page.id)" v-show="!Page.isCreator">退出协作</el-dropdown-item>
                                    <el-dropdown-item @click.native="delDoc(Page.id)" v-show="Page.isCreator" style="color:red">移至回收站</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <h4>{{Page.title}}</h4>
                            <p>{{Page.date}}</p>
                        </el-card>
                    </el-col>
                </el-row>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
    export default {
        name: "main"
    }
</script>

<style scoped>

</style>