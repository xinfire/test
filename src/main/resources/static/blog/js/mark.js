var app = new Vue({
    el:'#app',
    data:{},
    methods:{
        compile:function() {
            console.log('11111')
            var text = document.getElementById("content").value;
            var converter = new showdown.Converter();
            var html = converter.makeHtml(text);
            document.getElementById("result").innerHTML = html;
        }
    }
})