package com.winterchen.demo.service;

import com.winterchen.demo.pojo.Blog;

public interface Blogservice {

    int saveBlog(Blog blog);

    Blog getBlog(long id);
}
