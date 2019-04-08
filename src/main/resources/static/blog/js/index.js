var app = new Vue({
    el: "#app",
    data: {
        jpg:'../common/img/diaplay.gif',
        user:{},

    },
    methods: {
       init:function(){
           var that = this;
           that.getuser();
       },
        getuser:function(){
           var that = this;
           Web.post(Web.host+'/user/getUser.do',{id:'1'},function(res){
               if(res.status){
                 that.user = res.data;
               }
           })
        },
        saveHtmlToImage : function(id) {
            var w = $(id).width();
            var h = $(id).height();
            var scale = 2;
            var canvas = document.createElement("canvas");
            canvas.width = w * scale;
            canvas.height = h * scale;
            canvas.style.width = w + "px";
            canvas.style.height = h + "px";
            var context = canvas.getContext("2d");
            context.scale(scale, scale);
            html2canvas(document.getElementById(id), {
                canvas : canvas,
                scale : scale,

                useCORS : true, // 使用跨域(当allowTaint为true时这段代码没什么用,下面解释)
                background: "#fff",
                width : w,
                height : h,

            }).then(function(canvas){
                console.log('11111111111111');
                document.body.appendChild(canvas);
            });
        },
        gobook:function(){
            location.href=Web.host+'/book/book.html';
        }
    }

});
app.init();





$(".slide-btn li").click(function () {
    $(this).addClass("active").siblings().removeClass();
    var _index = $(this).index()
    $(".main02-slide-div").eq(_index).addClass("active").siblings().removeClass("active");
})
