package com.winterchen.demo.pojo;


public class ResultObj {
    protected boolean status;
    protected String message;
    protected Object data;

    public ResultObj() {

    }

    public ResultObj(boolean status,Object data) {
        this.status=status;
        this.data=data;
    }

    public ResultObj(boolean status,String message, Object data) {
        this.status=status;
        this.message=message;
        this.data=data;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String toString() {
        return  com.alibaba.fastjson.JSON.toJSONString(this) ;
    }
}
