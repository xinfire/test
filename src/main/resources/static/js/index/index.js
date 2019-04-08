var app = new Vue({
   el:'#app',
   data:{
      who:'',
       color:'',
   } ,
    methods:{
        check:function(){
          var that =this;
          var data={
              who:that.who,
              color:that.color,
          }
          web.post(web.host+'/user/check',data,function(res){
              if(res.status){
                  location.href='blog/index.html';
              }
          })
        },

    }
});


