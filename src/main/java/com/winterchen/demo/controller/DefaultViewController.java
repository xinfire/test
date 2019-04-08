package com.winterchen.demo.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class DefaultViewController implements WebMvcConfigurer {

        @Override
        public void addViewControllers( ViewControllerRegistry registry ) {
            registry.addViewController( "/" ).setViewName( "forward:/index.html" );
            registry.addViewController( "/index.do" ).setViewName( "forward:/index/login.html" );
            registry.addViewController( "/login.do" ).setViewName( "forward:/index/login.html" );

            registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
        }
        public void addResourceHandlers(ResourceHandlerRegistry registry){
            registry.addResourceHandler("/image/**").addResourceLocations("file:D:/temp-rainy/");
        }
    }
