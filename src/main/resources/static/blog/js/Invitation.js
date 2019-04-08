var app = new Vue({
    el: "#app",
    data: {
        token:Web.getToken(),
        forum_id:'',
        forum:{},
        time:'',
        order_by:'create_at',
        page_info:{
            currentPage:1,
            first:true,
            last:true,
            previous:false,
            next:false,
            totalPage:1
        },
        show_all_forum:true,
        hot_topic_list:[],
        topic_list:[],
        hot_index:0,
        time_text:'最近一天',
        time_type:'1',
        filters01: [{
            type:1,
            text:'最近一天'
        },{
            type:2,
            text:'最近一周'
        },{
            type:3,
            text:'最近一月'
        },{
            type:4,
            text:'最近一年'
        }],
        filters02: [{
            val:'create_at',
            text:'发布时间'
        },{
            val:'good',
            text:'点赞数'
        },{
            val:'read_num',
            text:'浏览量'
        },{
            val:'thread_num',
            text:'讨论数'
        }],
        pageindex:1,
        key:'',
        tags: []
    },
    methods: {
        init:function(){
            var that = this;
            if(!that.token){
                that.token='20181102213900edz03l';
            }
            that.time = that.getTimeByfilters01Type(1);
            that.forum_id = Web.getParam(location.href,'id','');
            var from = Web.getParam(location.href,'from','');
            if(from == 'invite'){
                Web.showToast('加入成功');
            }
            that.load();
        },
        load:function(){
            var that = this;
            that.getTopColumnInfo();
            Web.post(Web.host + "/api/community/getAnswerTags.do", {token:that.token,type:'3'}, function (res) {
                if(res.status){
                    that.tags = res.data;
                }
            });
            that.getInvitationHotTopics();
        },
        getTopColumnInfo:function(){
            var that = this;
            var data = {
                token:that.token,
                forum_id:that.forum_id
            }
            Web.post(Web.host + "/api/community/getTopColumnInfo.do", data, function (res) {
                if(res.status){
                    that.forum = res.data;
                    if(that.forum.type != '3'){
                        Web.showToast('改板块不属于专栏','',2000,function () {
                            Web.go('index.html');
                        })
                    }
                }
            });
        },
        getInvitationHotTopics:function(page){
            var that = this;
            if(page){
                that.page_info.currentPage = page;
            }
            var data = {
                token:that.token,
                time:that.time,
                order_by:that.order_by,
                forum_id:that.show_all_forum?'':that.forum_id,
                key:that.key,
                page:that.page_info.currentPage
            }
            Web.post(Web.host + "/api/community/getInvitationHotTopics.do", data, function (res) {
                if(res.status){
                    if(res.data.hot&&res.data.hot.length>0){
                        that.hot_topic_list = res.data.hot;
                    }else{
                        that.hot_topic_list = [];
                    }
                    if(res.data.sortList){
                        that.page_info = res.data.sortList;
                        if(res.data.sortList.data&&res.data.sortList.data.length>0){
                            that.topic_list = res.data.sortList.data;
                        }
                    }else{
                        that.page_info = {
                            currentPage:1,
                            first:true,
                            last:true,
                            previous:false,
                            next:false,
                            totalPage:1
                        };
                        that.topic_list = [];
                    }
                }else{
                    that.hot_topic_list = [];
                    that.page_info = {
                        currentPage:1,
                        first:true,
                        last:true,
                        previous:false,
                        next:false,
                        totalPage:1
                    };
                    that.topic_list = [];
                }
            });
        },
        addFollow:function(){
            var that = this;
            var data = {
                token:that.token,
                data:{
                    forum_id:that.forum_id,
                    obj_type:'1',
                    obj_id:that.forum_id
                }
            }
            Web.post(Web.host + "/api/community/addFollow.do", data, function (res) {
                if (res.status) {
                    if(res.message == 'add_success'){
                        Web.showToast('关注成功');
                    }else if(res.message == 'cancel_success'){
                        Web.showToast('取消关注成功');
                    }
                    that.getTopColumnInfo();
                }
            });
        },
        slide: function (event) {
            var node = event.currentTarget;
            $(node).siblings("ul").slideToggle();
            $(node).parent().siblings().find("ul").slideUp()
        },
        filter_slide: function (event,type,val) {
            var that = this;
            var node = event.currentTarget;
            if(type == '1'){ // 时间范围筛选条件
                that.time_text = that.filters01[val-1].text;
                that.time_type = val;
                that.time = that.getTimeByfilters01Type(val);
            }else if(type == '2'){ // 排序条件
                that.order_by = val;
            }
            that.getInvitationHotTopics();
            // $(node).addClass("active").siblings().removeClass();
            $(node).parent().slideUp();
        },
        getTimeByfilters01Type: function (type) {
            var now = new Date();
            var day = now.getDate();
            var month = now.getMonth();
            var year = now.getFullYear();
            if (type == '1') {  // 最近一天
                day = day - 1;
            } else if (type == '2') {   // 最近一周
                day = day - 7;
            } else if (type == '3') {   // 最近一月
                month = month - 1;
            } else if (type == '4') {   // 最近一年
                year = year - 1;
            }
            return year + '-' + (month + 1) + '-' + day + ' 00:00:00';
        },
        filter_check: function () {
            var that = this;
            that.show_all_forum = !that.show_all_forum;
            that.getInvitationHotTopics();
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
        blog: function () {
            window.location.href = 'Invitation.html';
        },
        new_build: function () {
            window.location.href = 'new-build.html?forum_id='+this.forum_id;
        },
        getTimeBefore:function (time) {
            // time格式:    2018-10-31 11:11:11
            var minute = 1000 * 60;
            var hour = minute * 60;
            var day = hour * 24;
            var halfamonth = day * 15;
            var month = day * 30;
            var now = new Date().getTime();
            var diffValue = now - new Date(Date.parse(time.replace(/-/g,"/")));
            if(diffValue < 0){return;}
            var monthC =diffValue/month;
            var weekC =diffValue/(7*day);
            var dayC =diffValue/day;
            var hourC =diffValue/hour;
            var minC =diffValue/minute;
            if(monthC>=1){
                result="" + parseInt(monthC) + "月前";
            }
            else if(weekC>=1){
                result="" + parseInt(weekC) + "周前";
            }
            else if(dayC>=1){
                result=""+ parseInt(dayC) +"天前";
            }
            else if(hourC>=1){
                result=""+ parseInt(hourC) +"小时前";
            }
            else if(minC>=1){
                result=""+ parseInt(minC) +"分钟前";
            }else
                result="刚刚";
            return result;
        },
        prePage:function () {
            var that = this;
            if(that.page_info.currentPage>1){
                that.page_info.currentPage--;
                if(that.page_info.totalPage > 5 && that.page_info.currentPage < 5*(that.pageindex-1)+1){
                    that.pageindex--;
                }
                that.getInvitationHotTopics();
            }
        },
        nextPage:function () {
            var that = this;
            if(that.page_info.currentPage< that.page_info.totalPage){
                that.page_info.currentPage++;
                if(that.page_info.totalPage > 5 && that.page_info.currentPage > 5*that.pageindex){
                    that.pageindex++;
                }
                that.getInvitationHotTopics();
            }
        },
        goPage:function(page){
            var that = this;
            if(!page){
                page = 1;
            }
            if(page > that.page_info.totalPage){
                Web.showToast("超出范围");
                $("#inputPage").val("");
                return;
            }
            if(page <=1){
                that.pageindex = 1;
                that.page_info.currentPage = page;
            }else if(page <= that.page_info.totalPage){
                that.pageindex = Math.ceil(page/5);
                that.page_info.currentPage = page;
            }
            that.getInvitationHotTopics();
        },
        searchScroll:function () {
            document.documentElement.scrollTop = 850;
        }
    }

});
app.init();
