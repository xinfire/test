var app = new Vue({
    el: "#app",
    data: {
        // token:Web.getToken(),
        token:'20181105130209TVN8ym',
        filters: ["金币", "活跃度"],
        msg: "ES2049",
        topic:{
            name:'',
            remark:'',
            img_ids:'',
            follow_money:0,
            follow_status:'0',
        },
        image:[],
    },
    methods: {
        reduce: function () {
            this.topic.follow_money--
            if (this.topic.follow_money <= 0) {
                this.topic.follow_money = 0
            }
        },
        add: function () {
            this.topic.follow_money++
        },
        slide: function () {
            var node = event.currentTarget;
            $(node).siblings("ul").slideToggle();
        },
        filter_slide: function () {
            var node = event.currentTarget;
            $(node).addClass("active").siblings().removeClass();
            $(node).parent().slideUp()
        },
        tip_null: function () {
            $(".tip-wrap").fadeOut()
        },
        tip_show: function () {
            if(this.topic.name.length<=7){
                $(".tip-wrap1").fadeIn()
            }else{
                Web.showToast('标题字数过长',2000)
            }
        },
        check_img: function () {
            var that = this;
            var node = event.currentTarget;
            if ($(node).children().attr("src") == "../common/img/icon-02.png") {
                $(node).children().attr("src", "../common/img/icon-01.png")
                $(node).siblings().children().attr("src", "../common/img/icon-02.png")
            } else {
                $(node).children().attr("src", "../common/img/icon-02.png")
                $('.ask-price').css('display','none');
                that.topic.follow_status = '0';
            }
            if($('#close').children().attr("src") == "../common/img/icon-01.png"){
                that.topic.follow_status = '1';
                $('.ask-price').css('display','none');
            }else if($('#open').children().attr("src") == "../common/img/icon-01.png"){
                that.topic.follow_status = '2';
                $('.ask-price').css('display','block');
            }
        },
        tip_submit: function () {
            var that = this;
            that.createTopic();
        },
        createTopic:function () {
            var that = this;
            var data={
                token:that.token,
                data:that.topic,
            }
            if(that.topic.name==''||that.topic.remark==''||that.topic.img_ids==''){
                Web.showToast("创建申请失败，请填写完整",2000)
                $(".tip-wrap1").fadeOut()
            }else{
                Web.post(Web.host+"/api/community/createTopic2.do",data,function (res) {
                    if(res.status){
                        Web.showToast("创建申请成功",2000)
                        $(".tip-wrap1").fadeOut()
                        $(".tip-wrap2").fadeIn()
                    }else{
                        Web.showToast("创建申请失败,金币不足",2000)
                        $(".tip-wrap1").fadeOut()
                        return;
                    }
                })
            }
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
                    that.topic.img_ids = obj.id;
                }
            }
            $(".wrap").fadeOut(300);
        },
        goback:function () {
            Web.go('index.html');
        }
    }
})
