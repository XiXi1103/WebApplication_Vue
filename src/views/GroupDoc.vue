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
                        <div class="block" style="line-height: normal">
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
                                                        <el-dropdown-item @click.native="dialogFormVisible = true">邀请协作</el-dropdown-item>
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
                        <!--                        <el-timeline :reverse="reverse">-->
                        <!--                            <el-timeline-item-->
                        <!--                                    v-for="Page in res.pageList"-->
                        <!--                                    :key="Page.id"-->
                        <!--                                    :timestamp="2020-12-1">-->
                        <!--                                {{Page.title}}-->
                        <!--                            </el-timeline-item>-->
                        <!--                        </el-timeline>-->
                        <!--                        <div id="doc">-->
                        <!--                            <el-row :gutter="14">-->
                        <!--&lt;!&ndash;                                <el-col :span="6">&ndash;&gt;-->
                        <!--&lt;!&ndash;                                    <el-card shadow="hover" @click.native="GotoMarkDown" style="font-size: 20px; font-weight: bold; height: 210px;">&ndash;&gt;-->
                        <!--&lt;!&ndash;                                        新建<i class="el-icon-plus"></i>&ndash;&gt;-->
                        <!--&lt;!&ndash;                                        &lt;!&ndash;                                        <el-button type="info" @click="GotoMarkDown" style="width: 100%; height: 100%; background-color: white"><i class="el-icon-plus" style="size: auto"></i>新建</el-button>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;                                    </el-card>&ndash;&gt;-->
                        <!--&lt;!&ndash;                                </el-col>&ndash;&gt;-->
                        <!--                                <el-col :span="10" v-for="Page in res.pageList" :key="Page.id">-->
                        <!--                                    <el-card shadow="hover" @click.native="viewmk(Page.id)" style="margin-bottom: 20px; width: 100%;height: 140px">-->
                        <!--                                        &lt;!&ndash;                                        <el-button icon="el-icon-more" circle style="float: right"></el-button><br>&ndash;&gt;-->
                        <!--                                        &lt;!&ndash;                                        <el-dropdown trigger="hover" style="float: right;">&ndash;&gt;-->
                        <!--                                        &lt;!&ndash;&lt;!&ndash;                                            <el-button type="primary" style="border-color: white;background-color: white">&ndash;&gt;&ndash;&gt;-->
                        <!--                                        &lt;!&ndash;&lt;!&ndash;                                            </el-button>&ndash;&gt;&ndash;&gt;-->
                        <!--                                        &lt;!&ndash;                                            <i class="el-icon-more"></i>&ndash;&gt;-->
                        <!--                                        &lt;!&ndash;                                            &lt;!&ndash;                                            <el-button icon="el-icon-more" circle style="float: right" type="info"></el-button>&ndash;&gt;&ndash;&gt;-->
                        <!--                                        &lt;!&ndash;                                            <el-dropdown-menu slot="dropdown" style="margin-top: -55px">&ndash;&gt;-->
                        <!--                                                <el-dropdown-item @click.native="editmk(0)">修改文章</el-dropdown-item>-->
                        <!--                                                <el-dropdown-item @click.native="editmk(0)">分享</el-dropdown-item>-->
                        <!--                                                                                        <el-dropdown-item @click.native="catwriter(Page.id);drawer = true">查看协作者</el-dropdown-item>-->
                        <!--                                                                                        <el-dropdown-item @click.native="dialogFormVisible = true">邀请协作</el-dropdown-item>-->
                        <!--                                                                                        <el-dropdown-item @click.native="dropwrite(Page.id)" v-show="!Page.isCreator">退出协作</el-dropdown-item>-->
                        <!--                                                                                        <el-dropdown-item @click.native="delDoc(Page.id)" v-show="Page.isCreator" style="color:red">移至回收站</el-dropdown-item>-->
                        <!--                                                                                        &lt;!&ndash;                                                <el-dropdown-item @click.native="editmk(0)">收藏</el-dropdown-item>&ndash;&gt;-->
                        <!--                                                                                        <el-dropdown-item @click.native="cancelCollection(Page.id)" style="color:red">取消收藏</el-dropdown-item>-->
                        <!--                                        &lt;!&ndash;                                            </el-dropdown-menu>&ndash;&gt;-->
                        <!--                                        &lt;!&ndash;                                        </el-dropdown>&ndash;&gt;-->
                        <!--                                        <div  style="float: left; margin-top: -57px">-->
                        <!--                                            <div style="margin-bottom: 0; height: 50px; margin-left: -40px">-->
                        <!--                                                <i class="el-icon-document" style="margin-right: 5px"></i>-->
                        <!--                                                &lt;!&ndash;                                            <span >{{Page.title}}</span>&ndash;&gt;-->
                        <!--                                                <span style="font-size: 20px; font-weight: bold">标题</span><br>-->
                        <!--                                            </div>-->
                        <!--                                            <el-button type="primary" style="float: right;margin-right: -300px">主要按钮</el-button>-->
                        <!--                                            <div style="float: right">-->
                        <!--                                                <el-tag type="info" style=" font-size: 15px;">2020-12-2 廉皓然</el-tag>-->
                        <!--                                            </div>-->
                        <!--                                        </div>-->
                        <!--                                    </el-card>-->
                        <!--                                </el-col>-->
                        <!--                            </el-row>                            -->
                        <!--                        </div>-->
                    </el-main>
<!--                    <el-footer>Footer</el-footer>-->
                </el-container>
            </el-container>
        </el-container>
        <el-drawer
            title="协作者列表"
            :visible.sync="drawer"
            :direction="direction">
            <ul>
                <li v-for="writer in res.writerList" :key="writer.id" style="padding:20px 0 20px 0;border:0.5px solid black">
                    <span>{{writer.name}}</span>
                    <el-button type="danger" style="float:right;margin-top:-10px" @click="delWriter(writer.id)" v-show="writer.permission!=5">移除</el-button> 
                    <el-dropdown style="float:right;margin-top:-10px"  v-show="writer.permission!=5">
                        <el-button type="primary">{{permission[writer.permission-1]}}</el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="writerPermission(writer.id,1)">查看</el-dropdown-item>
                            <el-dropdown-item @click.native="writerPermission(writer.id,2)">评论</el-dropdown-item>
                            <el-dropdown-item @click.native="writerPermission(writer.id,3)">分享</el-dropdown-item>
                            <el-dropdown-item @click.native="writerPermission(writer.id,4)">修改</el-dropdown-item>
                            <el-dropdown-item @click.native="writerPermission(writer.id,5)">管理</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </ul>
        </el-drawer>
        <el-dialog title="添加协作者" :visible.sync="dialogFormVisible">
            <el-select
             v-model="value"
             placeholder="输入用户名"
             filterable
             remote
             :remote-method="remoteMethod">
             <el-option
                v-for="user in searchList"
                 :key="user.id"
                 :label="user.name">
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
                docId:sessionStorage.getItem("docId")
            }
        },
        components: {
            Topbar,
            GroupAside
        },
        methods:{
            catwriter:function(id){
                sessionStorage.setItem("docId",id);
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
