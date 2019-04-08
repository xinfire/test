package com.winterchen.demo.controller;

import com.winterchen.demo.pojo.Blog;
import com.winterchen.demo.pojo.ResultObj;
import com.winterchen.demo.pojo.User;
import com.winterchen.demo.service.Blogservice;
import com.winterchen.demo.service.Userservice;

import com.winterchen.demo.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@Controller
@RequestMapping(value="/user")
@CrossOrigin
public class UserController {

    @Autowired
    private Userservice userService;
    @Autowired
    private Blogservice blogService;

    @RequestMapping(value= "/check", method = RequestMethod.POST)
    @ResponseBody
    public ResultObj check(@RequestBody Map<String,String> map) {
    	ResultObj res = new ResultObj();
        String  who = map.get("who");
        String  color = map.get("color");
        UserServiceImpl.check(res,who,color);
        return res;
    }
    @RequestMapping(value = "/getBlog", method = RequestMethod.POST)
    @ResponseBody
    public ResultObj getBlog(@RequestBody Map<String,String> map){
        ResultObj resultObj = new ResultObj();
        long id = Long.parseLong(map.get("id"));
        System.out.println(id);
         Blog blog= blogService.getBlog(id);
           resultObj.setData(blog);
           resultObj.setStatus(true);
        return resultObj;
    }

    @RequestMapping(value = "/share", method = RequestMethod.POST)
    @ResponseBody
    public ResultObj share(@RequestBody Map<String,String> map){
        ResultObj resultObj = new ResultObj();
        String text = map.get("text");
        Blog blog = new Blog();
//        Random rm = new Random();
//        blog.setId(rm.nextInt(1000)+"");
        blog.setName(text);
        blog.setTitle("1111");
        System.out.println("1234321");
         int i=blogService.saveBlog(blog);
        if(i!=0){
            resultObj.setData(i);
        }else{
            resultObj.setMessage("滚");
        }
        return resultObj;
    }
    @RequestMapping(value = "/getUser", method = RequestMethod.POST)
    @ResponseBody
    public User selectByPrimaryKey(@RequestBody Map<String,String> map){
        ResultObj resultObj = new ResultObj();
        String id = map.get("id");
        User user = userService.selectByPrimaryKey(id);
        if(user!=null){
            resultObj.setData(user);
        }else{
            resultObj.setMessage("滚");
        }
        return user;
    }
}
