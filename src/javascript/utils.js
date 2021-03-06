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
                    userId:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.pageList = res.data;
            });
        };
        Vue.prototype.getMyPage = function (PageList){
            this.$http.get(this.requestUrl+"/getMyDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                 console.log(res.data);
                PageList.pageList = res.data;
            });
        };
        Vue.prototype.getCollectionPage = function (PageList){
            this.$http.get(this.requestUrl+"/getCollectionDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.pageList = res.data;
            });
        };
        Vue.prototype.getDelPage = function (PageList){
            this.$http.get(this.requestUrl+"/getDelDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.pageList = res.data; 
            });
        };
        Vue.prototype.getSearchPage = function (PageList){
            this.$http.get(this.requestUrl+"/searchDoc",{
                params:{
                    userId:sessionStorage.getItem("userId"),
                    text:sessionStorage.getItem("text"),
                }
            }).then(res=>{
                console.log(res.data);
                PageList.pageList = res.data;
                // console.log("aaaaaaaaa");
            });
            // console.log("ccc");
        };
        Vue.prototype.getSearchGroup = function (PageList){
            this.$http.get(this.requestUrl+"/searchGroup",{
                params:{
                    userId:sessionStorage.getItem("userId"),
                    text:sessionStorage.getItem("text"),
                }
            }).then(res=>{
                console.log(res.data);
                PageList.groupList = res.data;
                // console.log("aaaaaaaaa");
            });
            // console.log("ccc");
        };
        Vue.prototype.getGroupPage=function(id,PageList){
            this.$http.get(this.requestUrl+"/getGroupDoc",{
                params:{
                    groupID:id,
                    userId:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.groupPage=res.data;
            });
        };
        Vue.prototype.getGroup = function (GroupList){
            this.$http.get(this.requestUrl+"/getJoinGroup",{
                params:{
                   userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(1);
                console.log(res.data);
                GroupList.groupList = res.data;
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
                    if (res.data.isTemplate){//模板编辑不传ID
                        this.$router.push({
                            path: '/markdown',
                            query:{
                                content: res.data.content,
                                permission:res.data.userPermission,
                                currentPermission:res.data.currentPermission,
                                title:res.data.title,
                            }
                        })
                    }
                    else{
                        this.$router.push({
                            path: '/markdown',
                            query:{
                                content: res.data.content,
                                html: res.data.html,
                                docID: DocID,
                                permission:res.data.userPermission,
                                currentPermission:res.data.currentPermission,
                                title:res.data.title,
                            }
                        })
                    }

                }
                else{
                    alert(res.data.msg);
                }
            })
        };
        Vue.prototype.viewmk = function (docId){
            this.$http.get(this.requestUrl+"/viewDoc",{
                params:{
                    userId:sessionStorage.getItem("userId"),
                    docId:docId
                }
            }).then(res=>{
                if (res.data.success){
                    this.$router.push({
                        path: '/ShowDoc',
                        query:{
                            isCollect: res.data.isCollect,
                            content: res.data.content,
                            permission: res.data.permission,
                            isTemplate:res.data.isTemplate,
                            docId:docId,
                        }
                    })
                }
                else {
                    alert(res.data.msg);
                }
            })
        };
        Vue.prototype.GotoMarkDown = function (tem){
            this.$router.push({
                path:'/markdown',
                query:{
                    isTemplate: tem,
                }
            });
        };
        Vue.prototype.ArrayIndexOfByDocID = function (array, DocID) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].id == DocID) return i;
            }
            return -1;
        };
        Vue.prototype.addWriter = function(docID,username){
            this.$http.get(this.requestUrl+"/addWriter",{
                params:{
                    docID:docID,
                    userID: sessionStorage.getItem("userId"),
                    username: username,
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
        };
         Vue.prototype.addMember = function(groupId,username){
            this.$http.get(this.requestUrl+"/addMember",{
                params:{
                    groupID:groupId,
                    userID: sessionStorage.getItem("userId"),
                    username: username,
                }
            }).then(res =>{
                if(res.data.success){
                    this.$message({
                        type:'success',
                        message: "发送邀请成功"
                    });
                }
                else{
                    this.$message({
                        type:'info',
                        message: res.data.msg
                    });
                }
            });
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
                    location.reload();
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
                    location.reload();
                }
                else{
                    alert("权限不足");

                }
            })
        };
         Vue.prototype.getMember = function(Groupid,MemberList){
            this.$http.get(this.requestUrl+"/catMember",{
                params:{
                    groupID:Groupid,
                }
            }).then(res =>{
                console.log(res.data);
                MemberList.memberList = res.data;
            })
         };
         Vue.prototype.getWriter = function(docId,WriterList){
            this.$http.get(this.requestUrl+"/catWriter",{
                params:{
                    docId:docId,
                }
            }).then(res =>{
                // console.log(res.data);
                WriterList.writerList = res.data;
            })
         };
         Vue.prototype.creategroup = function(){
            this.$prompt('请输入团队名称','创建团队',{
                confirmButtonText: '创建',
            }).then(({value}) => {
                this.$http.get(this.requestUrl+"/createGroup",{
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
                        location.reload();
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
                    docID:DocID
                }
            }).then(res=>{
                console.log(res.data);
                if (res.data.success==1){
                    alert("已添加为我的模板，快去编辑吧");
                }
                else alert(res.data.msg);

            })
        };
        Vue.prototype.changePermission = function(id,permission){
            this.$http.get(this.requestUrl+"/changePermission",{
                params:{
                    userID1:sessionStorage.getItem("userId"),
                    groupID:sessionStorage.getItem("groupId"),
                    permission:permission,
                    userID2:id,
                }
            }).then(res=>{
                console.log(res.data);
                if(res.data.success){
                    alert(res.data.msg);
                    location.reload();
                }
                else alert("权限不足");
            })
        };
        Vue.prototype.writerPermission = function(docId,id,permission){
            this.$http.get(this.requestUrl+"/writerPermission",{
                params:{
                    userId1:sessionStorage.getItem("userId"),
                    docId:docId,
                    permission:permission,
                    userId2:id,
                }
            }).then(res=>{
                console.log(res.data);
                if(res.data.success){
                    alert(res.data.msg);
                    location.reload();
                }
                else alert("权限不足");
            })
        };
        // Vue.prototype.getOtherInfo = function(id){
        //     // this.$http.get(this.requestUrl+"/personalInfo",{
        //     //     params:{
        //     //         userId:sessionStorage.getItem("userId"),
        //     //         id:id,
        //     //     }
        //     // }).then(res=>{
        //     //     console.log(res.data);
        //     //     if(res.data.success){
        //     //         this.$router.push({
        //     //             path:'/personalinfo',
        //     //             query:{
        //     //                 data:res.data
        //     //             }
        //     //         })
        //     //     }
        //     //     else alert("查看失败");
        //     // })
        // };
        Vue.prototype.GotoPersonalInfo = function(id){
            if(id == sessionStorage.getItem("userId")){
                this.$router.push({path:'/PersonalInfo',query:{id:id}});
            }
            else{
                this.$router.push({path:'/otherPersonalInfo',query:{id:id}});
            }
        };
                    // this.user.username = res.data.username;
                    // this.user.passwd = res.data.password;
                    // this.user.email = res.data.email;
                    // this.user.phoneNum = res.data.phoneNum;
                    // this.user.create_time = res.data.create_time;
                    // this.isOther = res.data.isOther;
                // } else {
                //     // alert(res.data.msg);
                //     this.$message.error(res.data.msg);
                // }
            // })
        // };



        // Vue.prototype.addCollection=function(docId){
        //     this.$http.get(this.requestUrl+"/collection",{
        //         params:{
        //             docId:docId,
        //             userId:sessionStorage.getItem("userId"),
        //         }
        //     }).then(res=>{
        //         if (!res.data.success){
        //             alert(res.data.msg)
        //         }
        //     })
        // }

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
