new Vue({
    el: "#app",
    data: {
       
    },
    methods: {
        //整体样式
        font_style:function(){
            $(".right-style").slideDown();
        },
        show_btn:function(){
            var node = event.currentTarget;
            var _parents = $(node).parents(".box-left");
            $(node).toggleClass("active");
            $(_parents).toggleClass("active");
            $(_parents).siblings(".box-right").toggleClass("active");
        },
        return_top:function(){
            $("body,html").animate({
                scrollTop: 0
            });
        },
        font_size01:function(){
            var a = $('.right-main-inner h2').css("font-size");
            var a1 = $('.right-main-inner h3').css("font-size");
            var a2 = $('.right-main-inner h4').css("font-size");
            var a3 = $('.right-main-inner h5').css("font-size");
            var a4 = $('.right-main-inner p').css("font-size");
            var a5 = $('.right-main-inner li').css("font-size");
            var a6=$(".right-main-inner *").css("line-height");
            a = parseInt(a.substring(0, a.length + 2)) - 2 + "px";
            a1 = parseInt(a1.substring(0, a1.length + 2)) - 2 + "px";
            a2 = parseInt(a2.substring(0, a2.length + 2)) - 2 + "px";
            a3 = parseInt(a3.substring(0, a3.length + 2)) - 2 + "px";
            a4 = parseInt(a4.substring(0, a4.length + 2)) - 2 + "px";
            a5 = parseInt(a5.substring(0, a5.length + 2)) - 2 + "px";
            a6 = parseInt(a6.substring(0, a6.length + 2)) - 4 + "px";
            $(".right-main-inner h2").css({
                "font-size": a
            });
            $(".right-main-inner h3").css({
                "font-size": a1
            });
            $(".right-main-inner h4").css({
                "font-size": a2
            });
            $(".right-main-inner h5").css({
                "font-size": a3
            });
            $(".right-main-inner p").css({
                "font-size": a4
            });
            $(".right-main-inner li").css({
                "font-size": a5
            });
            $(".right-main-inner *").css({
                "line-height": a6
            });
            
        },
        font_size02:function(){
            var a = $('.right-main-inner h2').css("font-size");
            var a1 = $('.right-main-inner h3').css("font-size");
            var a2 = $('.right-main-inner h4').css("font-size");
            var a3 = $('.right-main-inner h5').css("font-size");
            var a4 = $('.right-main-inner p').css("font-size");
            var a5 = $('.right-main-inner li').css("font-size");
            var a6=$(".right-main-inner *").css("line-height");
            a = parseInt(a.substring(0, a.length + 2)) + 2 + "px";
            a1 = parseInt(a1.substring(0, a1.length + 2)) + 2 + "px";
            a2 = parseInt(a2.substring(0, a2.length + 2)) + 2 + "px";
            a3 = parseInt(a3.substring(0, a3.length + 2)) + 2 + "px";
            a4 = parseInt(a4.substring(0, a4.length + 2)) + 2 + "px";
            a5 = parseInt(a5.substring(0, a5.length + 2)) + 2 + "px";
            a6 = parseInt(a6.substring(0, a6.length + 2)) + 4 + "px";
            $(".right-main-inner h2").css({
                "font-size": a
            });
            $(".right-main-inner h3").css({
                "font-size": a1
            });
            $(".right-main-inner h4").css({
                "font-size": a2
            });
            $(".right-main-inner h5").css({
                "font-size": a3
            });
            $(".right-main-inner p").css({
                "font-size": a4
            });
            $(".right-main-inner li").css({
                "font-size": a5
            });
            $(".right-main-inner *").css({
                "line-height": a6
            });
        },
        font_family01:function(){
            $(".right-main-inner *").css("font-family", "Microsoft YaHei")
        },
        font_family02:function(){
            $(".right-main-inner *").css("font-family", "宋体")
        },
        Sepia:function(){
            $("#white").attr('href','css/sepia.css');
        },
        night:function(){
            $("#white").attr('href','css/night.css');
        },
        white:function(){
            $("#white").attr('href','css/white.css');
        },
        close:function(){
           $(".box-left-search input").val("")
        }

    },
    created:function(){
        $(".file-tree").css("height", $(window).height() - $(".box-left-search").height());
    }
})

//树形展开关闭
$(".tree-li-default").click(function () {
    var _parent = $(this).parent(".tree-li");
    var _find = $(_parent).siblings(".tree-li").find(".tree-li-default");
   
    $(".tree-li-default").removeClass("active");
    $(this).addClass("active");
    $(this).siblings(".tree-ul").slideToggle(300);
});

$(window).scroll(function () {
    var bodyheight = document.documentElement.scrollTop || document.body.scrollTop;
    if (bodyheight > 100) {
        $(".fa-arrow-up").fadeIn(300);
    } else {
        $(".fa-arrow-up").fadeOut(300);
    }
});

$(document).mouseup(function(e){
  var _con = $('.right-style');   // 设置目标区域
  if(!_con.is(e.target) && _con.has(e.target).length === 0){ 
    $(".right-style").fadeOut()   // 功能代码
  }
});

$(".box-left-search input").focus(function(){
       $(".fa-close").css("opacity","1")                            
})
