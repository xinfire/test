package com.winterchen.demo.service;

import com.winterchen.demo.pojo.User;

public interface Userservice {

    User selectByPrimaryKey(String id);
}
