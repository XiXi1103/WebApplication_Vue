export default {
    install(Vue) {
        Vue.prototype.example = function (){
            this.$http.get(this.requestUrl+"/example/1595992046862",{
                params:{
                    foo:"@ctitle"
                }
            }).then(res=>{
                console.log(res.data);
                return res;
            });
        };
        Vue.prototype.getRecentPage = function (PageList){
            this.$http.get(this.requestUrl+"/getRecentDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.pageList = res.data.PageList;
            });
        };
        Vue.prototype.getMyPage = function (PageList){
            this.$http.get(this.requestUrl+"/getMyDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.pageList = res.data.PageList;
            });
        };
        Vue.prototype.getCollectionPage = function (PageList){
            this.$http.get(this.requestUrl+"/getCollectionDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.pageList = res.data.PageList;
            });
        };
        Vue.prototype.getDelPage = function (PageList){
            this.$http.get(this.requestUrl+"/getDelDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.pageList = res.data.PageList; 
            });
        };
        Vue.prototype.getGroupPage = function (PageList){
            this.$http.get(this.requestUrl+"/getGroupDoc",{
                params:{
                    groupID:sessionStorage.getItem("groupid"),
                    userId:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.groupPage = res.data.PageList;
            });
        };
        Vue.prototype.getGroup = function (GroupList){
            this.$http.get(this.requestUrl+"/getJoinGroup",{
                params:{
                   userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                GroupList.groupList = res.data.GroupList;
            })
        };
        Vue.prototype.editmk = function editmk(DocID){
            this.$http.get(this.requestUrl+"/editDoc",{
                params:{
                    userID:sessionStorage.getItem("userId"),
                    docID:DocID
                }
            }).then(res=>{
                if (res.data.success){
                    this.$router.push({
                        path: '/markdown',
                        query:{
                            content: res.data.content,
                            html: res.data.html,
                            docID: DocID,
                            permission:res.data.userPermission,
                        }
                    })
                }
                else{
                    alert(res.data.msg);
                }
            })
        };
        Vue.prototype.viewmk = function (DocID){
            this.$http.get(this.requestUrl+"/viewDoc",{
                params:{
                    userID:sessionStorage.getItem("userId"),
                    docID:DocID
                }
            }).then(res=>{
                if (res.data.success){
                    this.$router.push({
                        path: '/ShowDoc',
                        query:{
                            isCollect: res.data.isCollect,
                            content: res.data.content,
                            permission:res.data.userPermission,
                            isTemplate:res.data.isTemplate,
                            docId:DocID,
                        }
                    })
                }
                else {
                    alert(res.data.msg);
                }
            })
        };
        Vue.prototype.GotoMarkDown = function (){
            this.$router.push({path:'/markdown'});
        };
        Vue.prototype.ArrayIndexOfByDocID = function (array, DocID) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].id == DocID) return i;
            }
            return -1;
        };
        Vue.prototype.addwriter = function(DocID){
            this.$prompt('请输入协作者用户名','添加写作者',{
                confirmButtonText: '添加',
            }).then(({value}) => {
                this.$http.post(this.requestUrl+"/addWriter",{
                    params:{
                        userID: sessionStorage.getItem("userId"),
                        username: value,
                        docID: DocID
                    }
                }).then(res =>{
                    if(res.data.success){
                        this.$message({
                            type:'success',
                            message: "添加成功"
                        });
                    }
                    else{
                        this.$message({
                            type:'info',
                            message: res.data.msg
                        });
                    }
                });
            })
         };
         Vue.prototype.addMember = function(Groupid){
            this.$prompt('请输入用户名','添加团队成员',{
                confirmButtonText: '添加',
            }).then(({value}) => {
                this.$http.post(this.requestUrl+"/addMember",{
                    params:{
                        groupID:Groupid,
                        userID: sessionStorage.getItem("userId"),
                        username: value,
                    }
                }).then(res =>{
                    if(res.data.success){
                        this.$message({
                            type:'success',
                            message: "添加成功"
                        });
                    }
                    else{
                        this.$message({
                            type:'info',
                            message: res.data.msg
                        });
                    }
                });
            })
         };
         Vue.prototype.dropwrite = function(docID){
            this.$http.post(this.requestUrl+"/exitCollaborator",{
                params:{
                    userId:sessionStorage.getItem("userId"),
                    docId:docID
                }
            }).then(res =>{
                if(res.data.success){
                    alert("退出成功");
                }
                else{
                    alert("退出失败");
                }
            })
         };
         Vue.prototype.delWriter = function(id){
            this.$http.post(this.requestUrl+"/kickCollaborator",{
                params:{
                    userId1:sessionStorage.getItem("userId"),
                    userId2:id,
                    docId:sessionStorage.getItem("docId"),
                }
            }).then(res =>{
                if(res.data.success){
                    alert("成功踢出");
                }
                else{
                    alert("权限不足");
                }
            })
        }
         Vue.prototype.getMember = function(Groupid,MemberList){
            this.$http.get(this.requestUrl+"/catMember",{
                params:{
                    groupID:Groupid,
                }
            }).then(res =>{
                console.log(res.data);
                MemberList.memberList = res.data.MemberList;
            })
         };
         Vue.prototype.getWriter = function(docid,WriterList){
            this.$http.get(this.requestUrl+"/catWriter",{
                params:{
                    docID:docid,
                }
            }).then(res =>{
                console.log(res.data);
                WriterList.writerList = res.data.WriterList;
            })
         };
         Vue.prototype.creategroup = function(){
            this.$prompt('请输入团队名称','创建团队',{
                confirmButtonText: '创建',
            }).then(({value}) => {
                this.$http.post(this.requestUrl+"/createGroup",{
                    params:{
                        userID: sessionStorage.getItem("userId"),
                        groupName: value
                    }
                }).then(res =>{
                    if(res.data.success){
                        this.$message({
                            type:'success',
                            message: "创建成功"
                        });
                    }
                    else{
                        this.$message({
                            type:'info',
                            message: res.data.msg
                        });
                    }
                });
            })
         };
         Vue.prototype.addTem = function (DocID) {//添加为我的模板
            this.$http.get(this.requestUrl+"/addMyTemplate",{
                params:{
                    userID:sessionStorage.getItem("userId"),
                    ID:DocID
                }
            }).then(res=>{
                if (res.data.success==1){
                    alert("已添加为我的模板，快去编辑吧");
                }
                else alert(res.data.msg);

            })
        };
        // Vue.prototype.delDoc = function (DocID, PageList){
        //     this.$http.post(this.requestUrl+"/delDoc",{
        //         params:{
        //             userID:sessionStorage.getItem("userId"),
        //             docID:DocID
        //         }
        //     }).then(res=>{
        //         if (res.data.success){
        //             alert("删除成功");
        //             PageList.pageList.splice(this.ArrayIndexOfByDocID(this.res.pageList, DocID),1);
        //         }
        //         else {
        //             alert("删除失败");
        //         }
        //     });
        // }
    }
    
}
