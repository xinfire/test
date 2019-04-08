package com.winterchen.demo.service.impl;

import com.winterchen.demo.dao.UserDao;
import com.winterchen.demo.pojo.ResultObj;
import com.winterchen.demo.pojo.User;
import com.winterchen.demo.service.Userservice;

import java.awt.image.RescaleOp;

import com.winterchen.demo.util.Apputil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value="userService")
public class UserServiceImpl implements Userservice {

    @Autowired
    private UserDao userDao;

    public User selectByPrimaryKey(String id){
        return userDao.selectByPrimaryKey(id);
    }
    
    public static void check(ResultObj result,String who,String color) {
    	if(!Apputil.isEmpty(who)){
             if("xinxin".equals(who) && "zise".equals(color)){
                 result.setStatus(true);
             }
        }
    }
}
