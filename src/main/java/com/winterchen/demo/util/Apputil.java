package com.winterchen.demo.util;

public class Apputil {


    public static boolean isEmpty(String string){
        if(string==null){
            return true;
        }else if("".equals(string)){
            return true;
        }else if(string.isEmpty()){
            return true;
        }else{
            return false;
        }
    }

    public static void main(String[] args){
        String path = "rundll32 url.dll,FileProtocolHandler http://test.shellskey.com/";
        try {
            browse(path);
        }catch(Exception exe){

        }

    }
    public static void browse(String url)throws Exception {
        Runtime.getRuntime().exec(url);
    }
}
