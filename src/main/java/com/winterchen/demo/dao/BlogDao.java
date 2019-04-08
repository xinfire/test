package com.winterchen.demo.dao;

import com.winterchen.demo.pojo.Blog;

public interface BlogDao {

    int saveBlog(Blog blog);
    Blog getBlog(long id);
}
