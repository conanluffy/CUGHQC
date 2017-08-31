var app = getApp();
Page({
  data: {
    is_bind:false,
    userInfo: {},
    userData: {}
  },
  onShow: function () {
    var that = this,
    userid = app.globalData.userid;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    that.setData({
      is_bind: app.globalData.is_bind,
      userData: app.globalData.userData
    });
  },
  onPullDownRefresh:function(){
    this.onShow();
  }
})