<template>
    <div class="full">
        <el-container>
            <el-header>
                <Topbar></Topbar>
            </el-header>
                <el-container>
                    <el-aside width="15%">
                        <el-row class="tac">
                            <el-col>
<!--                                <br>-->
<!--                                <br>-->
<!--                                <el-button type="success" icon="el-icon-edit" style="margin-left: 5%;width: 60%" @click.native="GotoMarkDown">新建文档</el-button>-->
<!--                                <br>-->
<!--                                <br>-->
                                <el-menu
                                        router :default-active="$route.path"
                                        class="el-menu-vertical-demo"
                                        @open="handleOpen"
                                        @close="handleClose">
                                    <el-menu-item style="font-weight: bold">搜索结果</el-menu-item>
                                    <el-menu-item index="" @click.native="documentOrGroup = true">
                                        <i class="el-icon-document"></i>
                                        <span slot="title">我的文档</span>
                                    </el-menu-item>
                                    <el-menu-item index="" @click.native="documentOrGroup = false">
                                        <i class="el-icon-user"></i>
                                        <span slot="title">我的团队</span>
                                    </el-menu-item>
                                </el-menu>
                            </el-col>
                        </el-row>
                    </el-aside>
                    <el-container>
                        <el-main>
                            <div v-if="documentOrGroup && res.pageList.length===0">
                                <span style="font-size: 16px;color: #8492a6">这里什么都没有~</span>
                            </div>
                            <div v-if="!documentOrGroup && res.groupList.length===0">
                                <span style="font-size: 16px;color: #8492a6">这里什么都没有~</span>
                            </div>
                            <div class="block" style="line-height: normal" v-if="documentOrGroup">
                                <el-timeline>
                                    <el-timeline-item v-for="Pages in this.res.pageList" :key="Pages.date" :timestamp="Pages.dates" placement="top">
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
<!--                            <div id="doc" v-if="documentOrGroup" style="line-height: normal">-->
<!--                                <el-row :gutter="14">-->
<!--                                    <el-col :span="12" v-for="Page in pageList" :key="Page.id">-->
<!--                                        <el-card shadow="hover" :body-style="{ padding: '0px' }" style="margin-bottom: 10px" @click.native="viewmk(Page.id)">-->
<!--                                            <el-image-->
<!--                                                    style="width: 50px; height: 50px; float: left; margin-left: 10px"-->
<!--                                                    :src="require('@/assets/document-gray.png')"-->
<!--                                                    :fit="fit"></el-image>-->
<!--                                            <el-dropdown style="float: right;margin-top: -15px;margin-right: 5px">-->
<!--                                                <el-button style="border-color: white">-->
<!--                                                    <i class="el-icon-more"></i>-->
<!--                                                </el-button>-->
<!--                                                <el-dropdown-menu slot="dropdown">-->
<!--                                                    <el-dropdown-item @click.native="catwriter(Page.id)">查看协作者</el-dropdown-item>-->
<!--                                                    <el-dropdown-item @click.native="reserveId(Page.id);dialogFormVisible = true">邀请协作</el-dropdown-item>-->
<!--                                                    <el-dropdown-item @click.native="dropwrite(Page.id)" v-show="!Page.isCreator">退出协作</el-dropdown-item>-->
<!--                                                    <el-dropdown-item @click.native="delDoc(Page.id)" v-show="Page.isCreator" style="color:red">移至回收站</el-dropdown-item>-->
<!--                                                </el-dropdown-menu>-->
<!--                                            </el-dropdown>-->
<!--                                            <h4>{{Page.title}}</h4>-->
<!--                                            <p>{{Page.dates}}</p>-->
<!--                                        </el-card>-->
<!--                                    </el-col>-->
<!--                                </el-row>-->
<!--                            </div>-->
                            <div class="block" style="line-height: normal" v-if="!documentOrGroup">
                                <el-timeline>
                                    <el-timeline-item v-for="groupList in this.res.groupList" :key="groupList.date" :timestamp="Pages.dates" placement="top">
                                        <el-row :gutter="14">
                                            <el-col :span="12" v-for="Group in groupList" :key="Group.id">
                                                <el-card shadow="hover" :body-style="{ padding: '0px' }" style="margin-bottom: 10px" @click.native="GotoGroupDoc(Group.id)">
                                                    <el-image
                                                            style="width: 50px; height: 50px; float: left; margin-left: 10px"
                                                            :src="require('@/assets/group1-gray.png')"
                                                            :fit="fit"></el-image>
                                                    <el-dropdown style="float: right;margin-top: -15px;margin-right: 5px">
                                                        <el-button style="border-color: white">
                                                            <i class="el-icon-more"></i>
                                                        </el-button>
                                                        <el-dropdown-menu slot="dropdown">
                                                            <!--                                                    <el-dropdown-item @click.native="catwriter(Page.id)">查看协作者</el-dropdown-item>-->
                                                            <!--                                                    <el-dropdown-item @click.native="reserveId(Page.id);dialogFormVisible = true">邀请协作</el-dropdown-item>-->
                                                            <!--                                                    <el-dropdown-item @click.native="dropwrite(Page.id)" v-show="!Page.isCreator">退出协作</el-dropdown-item>-->
                                                            <!--                                                    <el-dropdown-item @click.native="delDoc(Page.id)" v-show="Page.isCreator" style="color:red">移至回收站</el-dropdown-item>-->
                                                        </el-dropdown-menu>
                                                    </el-dropdown>
                                                    <h4>{{Group.name}}</h4>
                                                    <p>{{Group.creator}}</p>
                                                </el-card>
                                            </el-col>
                                        </el-row>
                                    </el-timeline-item>
                                </el-timeline>
                            </div>
                            <div id="group" v-if="!documentOrGroup" style="line-height: normal">

<!--                                <el-row :gutter="12">-->
<!--                                    <el-col :span="6" v-for="Group in groupList" :key="Group.id">-->
<!--                                        <el-card shadow="hover" @click.native="GotoGroupDoc(Group.id)" style="font-size: 20px; font-weight: bold; height: 210px;">-->
<!--                                            &lt;!&ndash;                                        <el-button icon="el-icon-more" circle style="float: right"></el-button><br>&ndash;&gt;-->
<!--                                            <span style="text-align: center; display: block">{{Group.name}}</span>-->
<!--                                        </el-card>-->
<!--                                    </el-col>-->
<!--                                </el-row>-->
                            </div>
                        </el-main>
                    </el-container>

<!--                    <el-footer>Footer</el-footer>-->
                </el-container>
            </el-container>
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
        <el-dialog
                title="协作者"
                :visible.sync="dialogVisible"

                style="overflow-x: hidden;overflow-y: scroll"
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
                                    @click="handleEdit(scope.$index, scope.row)">改变权限</el-button>
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
                                @click="delWriter(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import Topbar from "../components/Topbar";
    import "@/css/myCSS.css"

    export default {
        name: "GroupDoc",
        data(){
            return{
                pageList:[],
                groupList:[],
                text:sessionStorage.getItem("text"),
                res : {
                    pageList : [],
                    writerList:[],
                    groupList:[]
                },
                permission:["查看","评论","分享","修改","管理"],
                drawer:false,
                direction:"rtl",
                searchList: [],
                value:"",
                dialogFormVisible: false,
                dialogVisible: false,
                docId:0,
                dialogTableVisible: false,
                documentOrGroup: true
            }
        },
        components: {
            Topbar,
        },
        methods:{
            catwriter:function(id){
                this.docId = id;
                // sessionStorage.setItem("docId",id);
                this.getWriter(id,this.res);
                this.dialogVisible = true;
                // this.drawer = true;
                // this.openDialog();
            },
            GotoGroupDoc:function(id){
                sessionStorage.setItem("groupid",id);
                this.$router.push({path: '/groupdoc'});
            }
        },
        created() {
           this.$http.get(this.requestUrl + "/searchDoc",{
                    params:{
                        text:this.text,                        
                        userId:sessionStorage.getItem("userId"),
                    }
                }).then(res => {
                    console.log(res.data);
                    this.res.pageList = res.data;
            });
           this.$http.get(this.requestUrl + "/searchGroup",{
                    params:{
                        text:this.text,   
                        userId:sessionStorage.getItem("userId"),                     
                    }
                }).then(res => {
                    console.log(res.data);
                    this.res.groupList = res.data;
            })             
            sessionStorage.setItem("type",4);
            this.getGroupPage(this.res);
        }
    }

</script>

<style scoped>

</style>