export default {
    install(Vue) {
        Vue.prototype.example = function (){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/example/1595992046862",{
                params:{
                    foo:"@ctitle"
                }
            }).then(res=>{
                console.log(res.data);
                return res;
            });
        };
        Vue.prototype.getRecentPage = function (PageList){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/getRecentDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.pageList = res.data.PageList;
            });
        };
        Vue.prototype.getMyPage = function (PageList){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/getMyDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.pageList = res.data.PageList;
            });
        };
        Vue.prototype.getCollectionPage = function (PageList){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/getCollectionDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.pageList = res.data.PageList;
            });
        };
        Vue.prototype.getDelPage = function (PageList){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/getDelDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.pageList = res.data.PageList;
            });
        };
        Vue.prototype.getGroupPage = function (PageList){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/getGroupDoc",{
                params:{
                    groupid:sessionStorage.getItem("groupid")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.groupPage = res.data.PageList;
            });
        };
        Vue.prototype.getGroup = function (GroupList){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/getJoinGroup",{
                params:{
                   userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                GroupList.groupList = res.data.GroupList;
            })
        };
        Vue.prototype.editmk = function editmk(DocID){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/editDoc",{
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
                        }
                    })
                }
                else{
                    alert(res.data.msg);
                }
            })
        };
        Vue.prototype.viewmk = function (DocID){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/viewDoc",{
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
                this.$http.post("http://rap2.taobao.org:38080/app/mock/262266/addWriter",{
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
         Vue.prototype.creategroup = function(){
            this.$prompt('请输入团队名称','创建团队',{
                confirmButtonText: '创建',
            }).then(({value}) => {
                this.$http.post("http://rap2.taobao.org:38080/app/mock/262266/createGroup",{
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
        // Vue.prototype.delDoc = function (DocID, PageList){
        //     this.$http.post("http://rap2.taobao.org:38080/app/mock/262266/delDoc",{
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
