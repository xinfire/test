function getHost(){
    var s=location.href;
    var i=s.indexOf('/',10);
    if(i!=-1){
        s=s.substring(0,i);
    }
    return s;
}

function isArray(o){
	return typeof(o)==='object'&&!isNaN(o.length);
}

function getValue(s,v){
	if(typeof(s)=="undefined"||!s){
		s=v;
	}
	return s;
}

function isNull(s) {
    return typeof (s) == 'undefined' || !s || s == null || s == '';
}

function trim(s) {
	return s.replace(/^\s*|\s*$/g, "");
}

function getRandString(len){
    var a = "",b = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", c=b.length;
    for( var i=0; i < len; i++ ){
          a += b.charAt(Math.floor(Math.random() * c));
        }
    return a;
}

function getId(len){
	if(typeof(len)=='undefined'||!len||len<1){
		len=30;
	}
	var s=''+new Date().getTime();
	var len2=len-13;
	if(len-13>0){
		s+=getRandString(len-13);
	}
	return s;
}

var Web={

    // host: getHost(),
    //  host:"http://test.shellskey.com",
    host:"http://127.0.0.1:8080",

    getData:function(){
        var data=this.getValue("data");
        // console.log("data", typeof(data), data);
        return data;
    },

    getHost:function() {
        var s=location.href;
        var i=s.indexOf('/',10);
        if(i!=-1){
            s=s.substring(0,i);
        }
        return s;
    },

    getUser: function () {
        var user = this.getValue("user");
        console.log("*** user1",user);
        return user;
    },
    
    getToken:function(){
    	var user = this.getValue("user");
    	return user && user.token;
    },

    getLastPage:function(){
    	return this.getValue("lastpage");
    },
    
    setLastPage:function(url){
    	this.setValue("lastpage", url);
        console.log("*** url",url);
    },
    
    saveUser: function (user) {
        this.setValue("user", user);
        console.log("*** user2",user);
    },
    
    get:function(url,data,success){
        var data2="";
        if(data){
            for(var key in data){
                data2+="&"+key+"="+encodeURIComponent(data[key]);
            }
        }
        jQuery.ajax({
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            url:url,
            data:data2,
            dataType: "json",
            success: success
        });
    },

    post:function(url,data,success){
        jQuery.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            url:url,
            data:JSON.stringify(data),
            dataType: "json",
            success: success
        });
    },

    post1:function(url,data,success,error){
        jQuery.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            async: false,
            dataType: 'json',
            cache: false,
            success: success,
            error: error
        });
    },

    getSrc:function(s){
        if(s && s.indexOf("http")==-1){
            if(s.indexOf("/f/")!=0){
                s="/f/"+s;
            }
            s=this.host+s;
        }else{
        	s='/f/_.gif';
        }
        return s;
    },
    
    getImg:function(o, key, defaultValue){
    	var s='';
    	if(typeof(key)=='undefined'||!key){
    		key='imgSrc';
    	}
    	if(typeof(defaultValue)=='undefined'||!defaultValue){
    		defaultValue='/f/_.gif';
    	}
    	if(o){
    		if(isArray(o)){
    			if(o.length>0){
    				s=o[0][key];
    			}
    		}else{
    			s=o[key];
    		}
    	}
        if(s){
        	if(s.indexOf("http")==-1){
        		if(s.indexOf("/f/")!=0){
                    s="/f/"+s;
                }
                s=this.host+s;
        	}
        }else{
        	s=this.host+defaultValue;
        }
        return s;
    },
    
    setValue:function(key, value){
        store.set(key, value);
    },

    getValue:function (key) {
        return store.get(key);
    },

    getParam: function (url, name, defaultValue) {
        if (typeof (url) == 'undefined' || !url) {
            url = window.location.search.substr(1);
        }
        var i = url.indexOf('#');
        if (i != -1) {
            url = url.substring(0, i);
        }
        i = url.indexOf('?');
        if (i != -1) {
            url = url.substring(i + 1);
        }
        url = '&' + url + '&';
        var key = '&' + name + '=';
        var i = url.indexOf(key);
        if (i != -1) {
            var j = url.indexOf('&', i + key.length);
            if (j != -1) {
                return url.substring(i + key.length, j);
            }
        }
        return defaultValue;
    },

    showMessage: function(msg, duration) {
        duration = isNaN(duration) ? 3000 : duration;
        var m = document.createElement('div');
        m.innerHTML = msg;
        m.style.cssText = "width:50%; min-width:9.4rem; background:#000; opacity:0.5; height:2.5rem; color:#fff; line-height:2.5rem; text-align:center; border-radius:5px; position:fixed; top:40%; left:25%; z-index:999999; font-weight:bold;";
        document.body.appendChild(m);
        setTimeout(function () {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function () {
                document.body.removeChild(m)
            }, d * 1000);
        }, duration);
    },

    reload:function(){
        var s=location.href;
        var i=s.lastIndexOf("#");
        if(i!=-1){
            s=s.substring(0,i);
        }
        i=s.lastIndexOf("&_=");
        if(i!=-1){
            s=s.substring(0,i)+"&_="+Math.random();
        }else{
            var j=s.indexOf("?");
            if(j!=-1){
                s=s+"&_="+Math.random();
            }else{
                s=s+"?&_="+Math.random();
            }
        } 
        location.href=s;
    },

    goBack:function(){
        window.history.go(-1);
    },

    go:function (url) {
        location.href=url;
    },
    
    login: function (username, password, callback) {
		Web.post(Web.host + "/api/web/login.do", {username:username,password:password}, function (res) {
            if(callback) callback(res);
			if (res.status && res.data) {
            	res.data.photo=Web.getSrc(res.data.photo);
                Web.saveUser(res.data);
                if(Web.getValue('go-url')){
                    Web.go(Web.host+Web.getValue('go-url'));
                }else{
                    Web.go('grade.html');
                }
                // var go=Web.getLastPage();
                // if(!go || go.indexOf("login.html")!=-1){
                // 	go=Web.getParam(location.href,"go","grade.html");
                // }
                // location.href=Web.addUrlParam(go);
            }else{
			    $(".error").show();
                // alert("登录失败！请检查您的用户名和密码");
                return false;
            }
        });
    },
    
    addUrlParam:function(url, param){
    	if(typeof(param)=="undefined" || param==null){
    		param=""+Math.random();
    	}
    	if(typeof(url)=="string"){
        	var i=url.indexOf("?");
        	if(i==-1){
        		url=url+"?"+param;
        	}else{
        		i=url.indexOf("&");
        		if(i==url.length-1){
        			url=url+param;
        		}else{
        			url=url+"&"+param;
        		}
        	}
    	}
    	return url;
    },
    
    logout:function(go, lastPage){
    	if(typeof(go)=='undefined' || !go){
    		go=Web.host;
    	}
    	if(typeof(lastPage)!='undefined' && lastPage){
    		Web.setLastPage(lastPage);
    	}
    	var user=Web.getUser();
        if(user && user.token){
        	Web.post(Web.host + "/api/web/logout.do", {token:user.token}, function (res) {
        		Web.saveUser(null);
            	Web.go(Web.host)
        	});
        }else{
        	Web.saveUser(null);
            Web.go(Web.host)
        }
    },
    
    checkLogin:function(){
    	var token=Web.getToken();
    	if(!token){
    		Web.setLastPage(location.href);
    		parent.location.href=Web.addUrlParam("/");
    	}
    },

    showToast:function(message, show_icon, duration, callback){
        var o=$(".toast")[0];
        if(!o){
            $(document.body).append('<div class="toast"><p></p></div>');
        }
        $(".toast p").html(message);
        if(typeof(show_icon)!='undefined' && show_icon){
            $(".toast div").show();
        }else{
            $(".toast div").hide();
        }
        $(".toast").show();
        if(typeof(duration)=='undefined'){
            duration=2;
        }
        if(duration<1000){
            duration=duration*1000;
        }
        if(typeof(callback)=='function'){
            $(".toast").fadeOut(duration,callback);
        }else{
            $(".toast").fadeOut(duration);
        }
    },
    
    loadHeaderFooter:function(module){
    	$(function(){
    		$(".header").load("/common/"+module+"/header.html");
    		$(".footer").load("/common/"+module+"/footer.html");
    	})
    },
    
    initWechatLogin:function(id,type,user_id){
    	type=getValue(type,"");
    	id=getValue(id,"");
    	user_id=getValue(user_id,"");
    	var css="";
    	if(type=="2"){
    		css="data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZXt3aWR0aDoxODJweDtib3JkZXI6MDttYXJnaW46MDt9IC5pbXBvd2VyQm94IC50aXRsZXtkaXNwbGF5Om5vbmU7fSAqe3BhZGRpbmc6MDttYXJnaW46MDt9IC5pbXBvd2VyQm94e3RleHQtYWxpZ246bGVmdDtsaW5lLWhlaWdodDoxfSBib2R5e3dpZHRoOjE4MnB4O2hlaWdodDoxODJweDt9IC5pbmZve2Rpc3BsYXk6bm9uZTt9";
    	}else{
    		css="data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZXt3aWR0aDoxODJweDtib3JkZXI6MDttYXJnaW46MDt9IC5pbXBvd2VyQm94IC50aXRsZXtkaXNwbGF5Om5vbmU7fSAqe3BhZGRpbmc6MDttYXJnaW46MDt9IC5pbXBvd2VyQm94e3RleHQtYWxpZ246bGVmdDtsaW5lLWhlaWdodDoxfSBib2R5e3dpZHRoOjE4MnB4O2hlaWdodDoxODJweDt9";
    	}
        var obj = new WxLogin({
            id:"wechat-login",//div的id
            appid: "wxc0a4cc870fbd8d74",
            scope: "snsapi_login",//写死
            redirect_uri: encodeURIComponent("http://wechat.shellskey.com/api/wechat/pcLogin.do?id="+id+"&user_id="+user_id) ,
            state: "",
            style: "black",//二维码黑白风格        
            href: css
            	//样式base64:  .impowerBox .qrcode{width:160px;}
        });
    }

};

Web.Form = {
	iframeId : "_iframe",
	submit : function(p) {
		var that = this;
		that.getIframe();
		var o = $(p.formId);
		o.attr("action", p.url);
		o.attr("target", that.iframeId);
		o[0].submit();
	},
	getIframe : function() {
		var that = this, o = $('#' + that.iframeId);
		if (o.length == 0) {
			$(document.body)
					.after(
							"<iframe id="
									+ that.iframeId
									+ " name="
									+ that.iframeId
									+ " src='' style='width:1px;height:1px;display:none'></iframe>");
			o = $('#' + that.iframeId);
		}
		return o;
	},
	clear : function(id) {
		$(id).form('clear');
	},
	check : function(divId, name, value, flag) {
		var o = $(divId + " input[name='" + name + "']");
		if (o && o.length > 0) {
			for (var i = 0; i < o.length; i++) {
				if (o[i].val() == value) {
					if (flag) {
						o[i].attr("checked", "true");
					} else {
						o[i].removeAttr("checked");
					}
					break;
				}
			}
		}
	},
	getFormParams : function(formId, needEncode) {
		var p = {};
		if (typeof (needEncode) == 'undefined' || !needEncode) {
			needEncode = false;
		}
		$("#" + formId).find("input,select").each(function(i) {
			var o = $(this);
			if (o.val() != '') {
				if (needEncode) {
					p[o.attr("name")] = encodeURIComponent(o.val());
				} else {
					p[o.attr("name")] = o.val();
				}
			}
		});
		return p;
	},
	checkFormField : function(f, name, msg) {
		var o = $(f + " [name='" + name + "']");
		if ($.trim(o.val()).length == 0) {
			if (typeof (msg) != 'undefined')
				o.attr('placeholder', msg);
			o.focus();
			return false;
		}
		return true;
	},
	checkField : function(o, msg) {
		if ($.trim(o.val()).length == 0) {
			if (typeof (msg) == 'undefined'){
				msg=o.attr('msg');
			}
			if (typeof (msg) != 'undefined'){
				o.attr('placeholder', msg);
			}
			o.addClass("invaid");	
			o.focus();
			return false;
		}else{
			o.removeClass("invaid");	
		}
		return true;
	},
	checkFields : function(f) {
		var that = this, objs = $(f + ' [data-options="required:true"]'), r = 0, m = objs.length;
		for (var i = 0; i < m; i++) {
			if (that.checkField($(objs[i]))) {
				++r;
			} else {
				break;
			}
		}
		return m == r;
	}
};

Web.Ajax = {
    post: function(o){
        $.ajax({
            url: o.url,
            type: 'POST',
            data: o.data,
            dataType: o.dataType,
            timeout: 5000,
            error: o.error,
            success: o.success
        });
    },
    get: function(o){
        $.ajax({
            url: o.url,
            type: 'GET',
            data: o.data,
            dataType: o.dataType,
            timeout: 5000,
            error: o.error,
            success: o.success
        });
    }
};

Web.Iframe={
    setHeight:function(iframe){
    	if (iframe) {
    		var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
    		if (iframeWin && iframeWin.document.body) {
    			iframe.height = 200;
    			iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
    			console.log('iframe.height='+iframe.height);
    		}
    	}
    },
    reload:function(id){
    	var o=document.getElementById(id);
    	if(o){
    		o.contentWindow.location.reload(true);  
    	}
    }
}

Web.Image = {
    saveHtmlToImage : function(id, callback) {
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
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        html2canvas($(id)[0], {
            canvas : canvas,
            scale : scale,
            // allowTaint: true, //允许污染
            // taintTest: true, //在渲染前测试图片(没整明白有啥用)
            useCORS : true, // 使用跨域(当allowTaint为true时这段代码没什么用,下面解释)
            // background: "#fff",
            width : w,
            height : h,
        }).then(function(canvas) {
            // var dataURL = canvas.toDataURL("image/png");
            var dataURL = canvas.toDataURL('image/jpeg', 1.0);
            var data = {
                token : Web.getToken(),
                image : dataURL
            }
            Web.post(Web.host + "/api/web/uploadImage.do", data, function(res) {
                if (callback) {
                    callback(res);
                }
            });
        });
    }
}

var UploadImg = {

		doCallback : function(o, app) {
			if (o.status == '1') {
                var index = o.img;
                var modalIndex = o.tableId;
			    if(o.imgIds == 'name_imgs'){
                    app.data.name_imgs[index].id = o.id;
                    app.data.name_imgs[index].imgSrc = o.imgSrc;
                    Web.Iframe.reload('previewIframe');
                }else if(o.imgIds=='name2_imgs'){
                    app.data.name2_imgs[index].id = o.id;
                    app.data.name2_imgs[index].imgSrc = o.imgSrc;
                }else if(o.imgIds == 'data.question_data_imgs'){
                    app.data.question_data[modalIndex].imgs[index].id = o.id;
                    app.data.question_data[modalIndex].imgs[index].imgSrc = o.imgSrc;
                }else if(o.imgIds == 'question_data_imgs'){
                    app.data.question_data[modalIndex].imgs[index].id=o.id;
                    app.data.question_data[modalIndex].imgs[index].imgSrc=o.imgSrc;
                }else if(o.imgIds == 'data.question_data_left_imgs'){
			        app.data.question_data.left[modalIndex].imgs[index].id=o.id;
			        app.data.question_data.left[modalIndex].imgs[index].imgSrc=o.imgSrc;
                }else if(o.imgIds == 'data.question_data_right_imgs'){
                    app.data.question_data.right[modalIndex].imgs[index].id=o.id;
                    app.data.question_data.right[modalIndex].imgs[index].imgSrc=o.imgSrc;
                }else if(o.imgIds == 'data.question_data_tip_imgs'){
                    app.data.question_data.tip.imgs[index].id=o.id;
                    app.data.question_data.tip.imgs[index].imgSrc=o.imgSrc;
                }else if(o.imgIds == 'data.question_data_left_imgs'){
                    app.data.question_data.left[modalIndex].imgs[index].id=o.id;
                    app.data.question_data.left[modalIndex].imgs[index].imgSrc=o.imgSrc;
                }else if(o.imgIds == 'data.question_data_right_imgs'){
                    app.data.question_data.right[modalIndex].imgs[index].id=o.id;
                    app.data.question_data.right[modalIndex].imgs[index].imgSrc=o.imgSrc;
                }else if(o.imgIds == 'data.question_data_other_imgs'){
			        var modalIndexs = modalIndex.split(',');
			        modalIndex = modalIndexs[0];
			        var modalIndex2 = modalIndexs[1];
                    app.data.question_data.left[modalIndex].correct_answer[modalIndex2].imgs[index].id=o.id;
                    app.data.question_data.left[modalIndex].correct_answer[modalIndex2].imgs[index].imgSrc=o.imgSrc;
                }
			    app.$forceUpdate();
			}
		},
		
		initUpload:function(img,imgIds,objName){
			if(typeof(objName)=='undefined'||!objName) {
				objName='UploadImg';
			}
			s='img='+encodeURIComponent(img)+'&imgIds='+encodeURIComponent(imgIds)+'&objName='+encodeURIComponent(objName); 
			var s='<iframe style="width:200px;border:0;height:30px;padding-left:20px;" frameborder=0 src="/admin/page/fileupload.jsp?'+s+'"></iframe>';
			$(img).parent().append(s);
		}
		
}

var TextUtil={
    getText:function(txt){
        var s=txt.replace(/<[^>].*?>/g,"");
        return s;
    },
    setText:function(obj){
        var txt=document.getElementById(obj.txt).value;
        var s=this.getText(txt);
        s=s.replace(/[  \r\n\t ]/g,"");
        var len=s.length;
        if(len>obj.count){
            s=s.substring(0,obj.count-1)+"...";
        }
        document.getElementById(obj.id).value=s;
    }
};

// const MY_STR='__yQEXn7rmf5EpsrmXWhn5DNnFExANjFhF4__';


var VideoUploadObj={
    doCallback:function(o){
        //alert("rs===="+JSON.stringify(rs));
        // var s=o.uploadPath+o.fileName+'.'+o.fileExt;
        // $('#'+o.img).attr("href",'/f/'+s);
        // $('#'+o.imgIds).children('.imgSrc').val(s);
        // $('#'+o.imgIds).children('.id').val(o.id);
        app.data.audio = o.id;
        app.imgSrc = o.imgSrc;
        data={
            token:Web.getToken(),
            file:app.imgSrc
        }
        Web.post("http://wechat.shellskey.com/api/wechat/getMp3Duration.do", data, function (res) {
            console.log("******",res);
            if (res.status) {
                app.data.audio_time=res.data;
            }
        });
        // $('#'+o.imgIds).siblings('.preview-img').attr('src','/f/'+s).show();
        // $('#'+o.imgIds).siblings('.glyphicon-remove').show();
        // $('#'+o.imgIds).val(s);
        // $('#'+o.imgIds).val(o.id);
        // $('#'+o.img).show();
        // $('#'+o.tableId).show();
    }
}

var Audio={
		play:function(id, type,video_pause,icon_video){
            if('more' == type){
                $(id).siblings('audio')[0].play();
            }else{
                $(id)[0].play();
            }
			$(icon_video).hide();
			$(video_pause).show();
		},
		stop:function(id,video_pause,icon_video){
			if($(id)[0]){
				$(id)[0].pause();
				$(video_pause).hide();
				$(icon_video).show();
			}
		},
		clear:function(input_id,icon_video,icon_delete,audio_id){
		    app.imgSrc = '';
		    app.data.audio = '';
			// $(input_id).val('');
			// $(icon_video).hide();
			// $(icon_delete).hide();
			this.stop(audio_id);
		}
}
