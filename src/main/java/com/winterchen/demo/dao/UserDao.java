package com.winterchen.demo.dao;

import com.winterchen.demo.pojo.User;

public interface UserDao {

    User selectByPrimaryKey(String id);
}
