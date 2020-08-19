<template>
    <div class="full">
        <el-container>
            <el-header>
                <Topbar></Topbar>
            </el-header>
            <el-container>
                <GroupAside></GroupAside>
                <el-container>
                    <el-main>
<!--                        <div id="doc">-->
<!--                            <el-row :gutter="12">-->
<!--                                <el-col :span="6" v-for="Page in res.groupPage" :key="Page.id">-->
<!--                                    <el-card shadow="hover" @click.native="viewmk(Page.id)" style="font-size: 20px; font-weight: bold; height: 210px;">-->
<!--&lt;!&ndash;                                        <el-button icon="el-icon-more" circle style="float: right"></el-button><br>&ndash;&gt;-->
<!--                                        <el-dropdown trigger="hover" style="float: right;">-->
<!--                                            <i class="el-icon-more"></i>-->
<!--&lt;!&ndash;                                            <el-button icon="el-icon-more" circle style="float: right" type="info"></el-button>&ndash;&gt;-->
<!--                                            <el-dropdown-menu slot="dropdown" style="float: right">-->
<!--&lt;!&ndash;                                                <el-dropdown-item @click.native="editmk(0)">修改文章</el-dropdown-item>&ndash;&gt;-->
<!--&lt;!&ndash;                                                <el-dropdown-item @click.native="editmk(0)">分享</el-dropdown-item>&ndash;&gt;-->
<!--                                                <el-dropdown-item @click.native="editmk(Page.id)">收藏</el-dropdown-item>-->
<!--                                                <el-dropdown-item @click.native="catwriter(Page.id);drawer = true">查看协作者</el-dropdown-item>-->
<!--                                                <el-dropdown-item @click.native="dialogFormVisible = true">邀请协作</el-dropdown-item>-->
<!--                                                <el-dropdown-item @click.native="delDoc(Page.id)" style="color:red" v-show="Page.isCreator">移至回收站</el-dropdown-item>-->
<!--                                            </el-dropdown-menu>-->
<!--                                        </el-dropdown>-->

<!--                                        <span style="text-align: center; display: block">{{Page.title}}</span>-->
<!--                                    </el-card>-->
<!--                                </el-col>-->
<!--                            </el-row>-->
<!--                        </div>-->
                        <div class="block" style="line-height: normal">
                            <el-timeline>
                                <el-timeline-item v-for="Pages in res.groupPage" :key="Pages.date" :timestamp="Pages.dates" placement="top">
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
                                                        <el-dropdown-item @click.native="reserveId(Page.id);dialogFormVisible = true">邀请协作</el-dropdown-item>
                                                        <el-dropdown-item @click.native="dropwrite(Page.id)" v-show="!Page.isCreator">退出协作</el-dropdown-item>
                                                        <el-dropdown-item @click.native="delDoc(Page.id)" v-show="Page.isCreator" style="color:red">移至回收站</el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </el-dropdown>
                                                <h4>{{Page.title}}</h4>
                                                <p>{{Page.dates}}</p>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                    </el-main>
<!--                    <el-footer>Footer</el-footer>-->
                </el-container>
            </el-container>
        </el-container>

        <el-dialog
                title="协作者"
                :visible.sync="dialogVisible"

                style="overflow-x: hidden"
                :before-close="handleClose">
            <el-table
                    :data="res.writerList"
                    style="width: 100%">
                <el-table-column
                        label="用户名"
                        width="180">
                    <template slot-scope="scope">
                        <!--                        <i class="el-icon-time"></i>-->
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="权限"
                        width="180">
                    <template slot-scope="scope">
                        <!--                        <el-popover trigger="hover" placement="top">-->
                        <!--                            <p>姓名: {{ scope.row.name }}</p>-->
                        <!--                            <p>住址: {{ scope.row.address }}</p>-->
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ permission[scope.row.permission-1] }}</el-tag>
                        </div>
                        <!--                        </el-popover>-->
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-dropdown style="margin-right: 5px">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)"  v-show = "scope.row.permission!=5">改变权限</el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="writerPermission(scope.row.id,1)">查看</el-dropdown-item>
                                <el-dropdown-item @click.native="writerPermission(scope.row.id,2)">评论</el-dropdown-item>
                                <el-dropdown-item @click.native="writerPermission(scope.row.id,3)">分享</el-dropdown-item>
                                <el-dropdown-item @click.native="writerPermission(scope.row.id,4)">修改</el-dropdown-item>
                                <el-dropdown-item @click.native="writerPermission(scope.row.id,5)">管理</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <!--                        <el-button-->
                        <!--                                size="mini"-->
                        <!--                                @click="handleEdit(scope.$index, scope.row)">改变权限</el-button>-->
                        <el-button
                                size="mini"
                                type="danger"
                                @click="delWriter(scope.row.id)"  v-show = "scope.row.permission!=5">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="添加协作者" :visible.sync="dialogFormVisible">
            <el-select
                    v-model="value"
                    placeholder="输入用户名"
                    reserve-keyword
                    filterable
                    remote
                    :remote-method="remoteMethod">
                <el-option
                        v-for="user in searchList"
                        :key="user.id"
                        :label="user.name"
                        :value="user.name">
                </el-option>
            </el-select>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="addWriter(docId,value);dialogFormVisible = false">添 加</el-button>
            </div>
        </el-dialog>             
    </div>
</template>

<script>
    import Topbar from "../components/Topbar";
    import GroupAside from "../components/GroupAside";
    import "@/css/myCSS.css"

    export default {
        name: "GroupDoc",
        data(){
            return{
                res:{
                    groupPage:[],
                    writerList:[]
                },
                permission:["查看","评论","分享","修改","管理"],
                drawer:false,
                direction:"rtl",
                searchList: [],
                value:"",
                dialogFormVisible: false,
                dialogVisible: false,
                docId:0,
            }
        },
        components: {
            Topbar,
            GroupAside
        },
        methods:{
            reserveId:function(id){
                this.docId = id;
                // sessionStorage.setItem("groupId",id);
            },            
            catwriter:function(id){
                this.docId = id;
                this.getWriter(id,this.res);
            },
            remoteMethod(query){
                if(query !== ''){
                    this.$http.get(this.requestUrl+"/searchUser",{
                            params:{
                                text:query,
                            }
                        }).then(res => {
                            console.log(res.data);
                            this.searchList = res.data;
                            /*this.searchList = res.data.filter(user =>{
                                return user.name.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                            });*/
                    })                                   
                }
                else{
                    this.searchList = [];
                }
            },
        },
        created() {
            sessionStorage.setItem("type",4);
            this.getGroupPage(this.res);
        }
    }

</script>

<style scoped>

</style>
