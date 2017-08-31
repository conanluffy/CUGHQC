var app = getApp();
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  onShow: function () {
  
  },
  clearStorage:function(){
    wx.clearStorage();
    wx.showToast({
      title: '所有缓存已清除',
      duration: 1500
    })
  }
})