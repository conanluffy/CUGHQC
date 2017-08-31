var app = getApp();
Page({
  data:{
    net:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var net = {};
    var userid = app.globalData.userid;
    wx.request({
      url: 'https://cughqc.applinzi.com/net.json',
      data: {},
      method: 'GET',
      success: function (res) {
        var data = res.data;
        for (var i in data) {
          if (data[i].userid == userid) {
            net.flow_used = data[i].flow_used;
            net.userid = data[i].userid;
            net.e_remind = data[i].e_remind;
            net.e_owned = data[i].e_owned;
            net.date = data[i].date;
            net.kind = data[i].kind;
            net.max_link = data[i].max_link;
          }
        }
        that.setData({
          net: net
        });
        console.log(net);
      }
    })
  },
  onShow:function(){
    // 页面显示
  }
})