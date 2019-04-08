var app = new Vue({
    el: "#app",
    data: {
        token:Web.getToken(),
        topic_id:'',
        topicObj:{},
        topicPageList:[],
        threadList:[],
        remark:'',
        interestTopics:[],
        author:{},


        title: "前端插拔式SPA应用架构实现方案",
        tags: ["java", "vue.js", "Android"],
        time: "2018-08-08 18:88",
        adress: "ES2049",
        article_src: "images/index-img01.png",
        article: "随着互联网云的兴起，一种将多个不同的服务集中在一个大平台上统一对外开放的概念逐渐为 人熟知，越来越多与云相关或不相关的中后台管理系统或企业级信息系统曾经或开始采用了这 种「统一平台」的形式。同时，前端领域保持着高速发展，早期的 jQuery+Backbone+Bootstrap 的 MVC 解决方案支撑起了业务相当长的一段时间；后来，Angular、Ember 等 MVVM 框架开始 崭露头角，前后端分离和前端组件化的思想在此时达到了鼎盛期。而在国内，Vue 框架凭着其 简洁易懂的 API 和出色的周边生态支持独领鳌头，越来越多的中小型企业和开发者们开始转向 Vue 阵营；与此同时，在设计上独树一帜的纯 View 层框架 React 开始兴起，其充满技术感的 Di ff DOM 思想吸引了大批开发者，成为各大技术社区最火爆的话题，其周边生态也随之快速发展， 成为了各大公司搭建技术栈时的首选框架。",
        lists: [
            {
                text: "背景"
            },
            {
                text: "产品模型"
            },
            {
                text: "架构方案"
            },
            {
                text: "资源权限管理"
            },
            {
                text: "实现方案",
                items: ["动态路由", "脚本加载和调度", "应用视图渲染",
               "应用生命周期管理", "构建配置"]
            },
            {
                text: "总结"
            },
            {
                text: "参考"
            },
        ]
    },
    methods: {
        init:function(){
            var that = this;
            that.topic_id = Web.getParam(location.href,"topic_id","9")
            if(!that.token){
                that.token='20181105130209TVN8ym';
            }
            that.load();
        },
        load:function(){
          var that =this;
          that.getTopicPages();
          that.getInterestTopic();

        },
        getInterestTopic:function(){
            var that =this;
            var data = {
                token:that.token,
            }
            $.post(Web.host+"/api/community/getInterestTopic.do",JSON.stringify(data),function(res){
                if(res.status){
                    that.interestTopics = res.data;
                }
            });
        },
        getTopicPages:function(){
          var that = this;
          var data={
              token:that.token,
              topic_id:that.topic_id,
          }
          $.post(Web.host+'/api/community/getTopicPages.do',JSON.stringify(data),function(res){
               if(res.status){
                 that.topicObj = res.data;
                 that.topicPageList = res.data.topicPageList;
                 if(res.data.tag){
                     that.tags = res.data.tag.split(',');
                 }
                 that.author = res.data.createUser;
               }
          },'json');

          Web.post(Web.host+'/api/community/getThreads.do',data,function(res){
              if(res.status){
                  that.threadList = res.data;
              }
          });
        },
        submit:function(id){
          var that = this;
          var data ={
              token:that.token,
              data:{
                  id:'',
                  forum_id:that.topicObj.forum_id,
                  topic_id:that.topic_id,
                  parent_id:'0',
                  status:'3',
                  remark:that.remark,
              }
          }
            Web.post(Web.host+'/api/community/addThread.do',data,function(res){
                if(res.status){
                    Web.showToast('评论成功',2000);
                    that.remark ='';
                    that.getTopicPages();
                }
            });
        },

        getThreadTime:function(obj){
            var create = obj.create_at;
            var dateString='';
            var seconds = new Date().getTime() - new Date(create).getTime();
            if (seconds<10*1000) {
                dateString ="刚刚";
            }else if (seconds<60*1000) {
                dateString = Math.round(seconds/1000)+"秒前";
            }else if (seconds<60*60*1000) {
                dateString = Math.round(seconds/1000/60)+"分钟前";
            }else if (seconds<60*60*24*1000) {
                dateString = Math.round(seconds/1000/60/60)+"小时前";
            }else if (seconds<60*60*24*1000*30) {
                dateString =Math.round(seconds/1000/60/60/24)+ "天前";
            }else if (new Date(create).getFullYear()===new Date().getFullYear()) {//今年并且大于30天显示具体月日
                dateString = create;
            }else if (new Date(create).getFullYear()!==new Date().getFullYear()) {//大于今年显示年月日
                dateString =  new create;
            }else{
                dateString =  create;
            }
            return dateString;
        },

        detail: function (obj) {
            var that = this;
            var data = {
                token:that.token,
                topic_id:obj.id
            }
            Web.post(Web.host + "/api/community/updateTopicReadNum.do", data, function (res) {
                if(obj.isCurrentUserCreate){
                    Web.go('blog-detail.html?topic_id='+obj.id);
                }else{
                    Web.go('blog-detail2.html?topic_id='+obj.id);
                }
            });
        },
        continue_edit: function () {
            window.history.go(-1);
        },
        tip_null: function () {
            $(".tip-wrap").fadeOut();
        },
        wrap_show: function () {
            $(".tip-wrap").fadeIn()
        },
        copy_url: function () {
            var copyobject = document.getElementById("copy-content");
            copyobject.select();
            document.execCommand("Copy");
            alert("已复制成功哦~");
        },
        comment: function () {
            $(".top-comment").slideToggle()
        },
        submit_comment: function () {
            $(".top-comment").slideUp()
        },
        comment_show: function () {
            if ($(".top-comment-div img").attr("src") == "images/icon-01.png") {
                $(".top-comment-div img").attr("src", "images/icon-02.png")
            } else {
                $(".top-comment-div img").attr("src", "images/icon-01.png")
            }
        },
        list_item: function () {
            var node = event.currentTarget;
            $(node).siblings("ul").slideToggle()
        },
        menu: function () {
            $(".top-menu").slideToggle()
        },
        return_top: function () {
            $("body,html").animate({
                scrollTop: 0
            });
        },

    }
})
app.init();

$.event.add(window, "scroll", function () {
    var p = $(window).scrollTop();
    if (p > 300) {
        $(".fixed-top").fadeIn();
        $(".header").css("opacity", 0);
    } else {
        $(".fixed-top").fadeOut();
        $(".header").css("opacity", 1);
    }
});
