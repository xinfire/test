var app = new Vue({
    el: "#app",
    data: {
        // token:Web.getToken(),
        token:'20181105130209TVN8ym',
        data:{
            name:'',
            brief:'',
            img:'',
            img_ids:'',
            remark:'',
            content1:[
                {
                    name:'',
                    remark:'',
                    seq:'0',
                    content1:[],
                }
            ],
        },
        image:[],
        id:'',
        forum_id:'',
        is_new:0,
        url:''
    },
    methods: {
        init:function(){
          this.load();
        },
        load:function(){
            var that = this;
            that.forum_id = Web.getParam(location.href,'forum_id','');
            // that.forum_id = '1543138579552W3DaWHNSI7ysEYBED';
            that.id = Web.getParam(location.href,'id','');
            var is_new = Web.getParam(location.href,'is_new','');
            if(is_new){
             that.is_new = is_new;
            }
            var data = {
                token:that.token,
                id:that.id,
            }
            if(that.id){
                Web.post(Web.host+"/api/community/getTopicData.do",data,function (res) {
                    if(res.status){
                        console.log(JSON.parse(res.data.remark))
                        that.data = JSON.parse(res.data.remark);
                    }
                })
            }
        },
        wrap_show: function () {
            var that = this;
            if(that.data.name.length>26){
                Web.showToast('标题字数过长',2000);
            }else{
                that.data.remark = JSON.stringify(that.data);
                var data = {
                    token:that.token,
                    data:that.data,
                    forum_id:that.forum_id,
                    id:that.id,
                    is_new:that.is_new,
                }
                if(that.data.name==''||that.data.brief==''||that.data.img_ids==''||that.data.brief.length>200){
                    Web.showToast('发布失败',2000);
                    $(".tip-wrap1").fadeOut();
                }else{
                    Web.post(Web.host+"/api/community/addTopicPage.do",data,function (res) {
                        if(res.status){
                            $(".tip-wrap1").fadeIn()
                            if(that.id==''){
                                that.id = res.data.id;
                                that.is_new =false;
                            }
                        }else{
                            Web.showToast('发布失败',2000);
                            $(".tip-wrap1").fadeOut();
                        }
                    })
                }
            }
        },
        share: function () {
            $(".tip-wrap1").fadeOut();
            $(".copy-wrap").fadeIn();
        },
        copy_url: function () {
            var copyobject = document.getElementById("copy-content");
            copyobject.select();
            document.execCommand("Copy");
            Web.showToast('已复制成功哦~',2000)
        },
        tip_null:function(){
          this.goback();
        },
        preview: function () {
            var that = this;
            var json = JSON.stringify(that.data);
            var data ={
                token:that.token,
                json:json,
                id:that.id,
                forum_id:that.forum_id
            }
            if(that.data.name!=''){
                Web.post(Web.host+"/api/community/setTopicData.do",data,function (res) {
                    if(res.status){
                        if(res.data.id){
                            that.id = res.data.id;
                            Web.go('blog-detail.html?id='+res.data.id);
                        }
                    }else{
                        Web.showToast('预览失败',2000)
                    }
                })
            }else {
                Web.showToast('预览失败',2000)
            }
        },
        addLine1:function () {
            var that = this;
            var length = that.data.content1.length
            var data = {
                name:'',
                remark:'',
                seq:length,
                content1:[],
            }
            that.data.content1.push(data)
            that.$forceUpdate();
        },
        addLine2:function (index) {
            var that = this;
            var length = that.data.content1[index].content1.length;
            var data = {
                name:'',
                remark:'',
                seq:length,
                content1:[],
            }
            that.data.content1[index].content1.push(data)
        },
        addLine3:function (index1,index2) {
            var that = this;
            var length = that.data.content1[index1].content1[index2].content1.length;
            var data = {
                name:'',
                remark:'',
                seq:length,
                content1:[],
            }
            that.data.content1[index1].content1[index2].content1.push(data)
        },
        uploadCallback: function (obj) {
            var that = this;
            if (obj) {
                var data = {
                    id: obj.id,
                    imgSrc: obj.imgSrc,
                    name:obj.fileNameOld
                };
                if (obj.tableId == 'UploadImg') {
                    that.image.push(data);
                    that.data.img_ids = obj.id;
                    that.data.img = obj.imgSrc;
                }
            }
            $(".wrap").fadeOut(300);
        },
        goback:function () {
            Web.go('Invitation.html?id=1543138579552W3DaWHNSI7ysEYBED');
        },
        give_up:function () {
            var that=this;
            if(that.is_new==0&&that.id){
                var data={
                    id:that.id,
                    token:that.token,
                }
                Web.post(Web.host+"/api/community/deleteAddTopic.do",data,function (res) {
                    if(res.status){
                        Web.showToast("放弃成功，跳转回首页",2000);
                        that.goback();
                    }
                })
            }else{
                that.goback();
            }
        },
    }
});
app.init();
