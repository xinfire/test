package com.winterchen.demo.service.impl;

import com.winterchen.demo.dao.BlogDao;
import com.winterchen.demo.pojo.Blog;
import com.winterchen.demo.service.Blogservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value="blogService")
public class BlogServiceimpl implements Blogservice {

    @Autowired
    private BlogDao blogDao;

    public int saveBlog(Blog blog){
        return blogDao.saveBlog(blog);
    }

    public Blog getBlog(long id){
        return blogDao.getBlog(id);
    }


}
