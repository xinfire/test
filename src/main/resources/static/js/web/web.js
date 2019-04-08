var web = {
    host:"http://127.0.0.1:8080",

    post:function(url,data,success){
        jQuery.ajax({
            type:'post',
            contentType: "application/json; charset=utf-8",
            url:url,
            data:JSON.stringify(data),
            dataType: "json",
            success: success
        });
    },

}