var app = getApp();
Page({
  data:{
    time:'',
    balance:'',
    userid:'',
    card:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var userid = app.globalData.userid;
    var date = new Date();
    var year = date.getFullYear(),
      month = date.getMonth() + 1,
      date = date.getDate();
    var time = year+'/'+month+'/'+date;
    that.setData({
      userid: userid,
      time:time
    })
    wx.request({
      url: 'https://cughqc.applinzi.com/card.json',
      data: [],
      method: 'GET',
      success: function (res) {
        var data = res.data;
        var card = [];
        var balance = '';
        var count = 0;
        for (var i in data) {
          if (data[i].userid == userid) {
            var item = {};
            if(count == 0){
              balance = data[i].e_remind;
              count = 1;
              console.log(balance);
            }
            item.time = data[i].time;
            item.userid = data[i].userid;
            item.name = data[i].name;
            item.kind = data[i].kind;
            item.where = data[i].where;
            item.e_used = data[i].e_used;
            item.e_remind = data[i].e_remind;
            item.times = data[i].times;
            card.push(item);
          }
        }
        that.setData({
          card: card,
          balance: balance
        });
      }
    })
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