var app = getApp();
Page({
  data:{
    list: {
      status: false,  //是否显示列表
      count: 0,   //次数
      data: [],    //列表内容
      open: 0      //被展示的序号
    }
  },
  openList:function(){
    var that = this;
    if(!that.data.list.status){
      that.setData({
        'list.status':true
      });
    }else{
      that.setData({
        'list.status': false
      });
    }
  },
  submit:function(){
    var that = this;
    var userid = app.globalData.userid;
    if(userid != ''){
      that.setData({
        'list.count':that.data.list.count++
      });
      wx.showModal({
        title: '提交成功',
        content: '您的反馈将被尽快处理！',
      });
    }else{
      wx.showModal({
        title: '提交失败',
        content: '无有效学号！',
      })
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})