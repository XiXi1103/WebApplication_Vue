<template>
    <div>
        <el-container>
            <el-header>
                <Topbar></Topbar>
            </el-header>
            <el-container>
                <GroupAside></GroupAside>
                <el-container>
                    <el-main>
                        <div id="doc">
                            <el-row :gutter="12" style="margin-bottom: 50px">
                                <el-col :span="8">
                                    <el-card shadow="hover">
                                        <el-button type="info" @click.native="creategroup">新建团队</el-button>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Topbar from "../components/Topbar";
    import GroupAside from "../components/GroupAside";
    export default {
        name: "GroupSpace",
        data(){
            return{

            }
        },
        components: {
            Topbar,
            GroupAside
        },
        methods:{

        },
        created() {

        }
    }

</script>

<style scoped>

</style>