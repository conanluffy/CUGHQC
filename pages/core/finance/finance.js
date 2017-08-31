// pages/core/finance/finance.js
var app = getApp();
Page({
  data: {
    xueza: [],
    award: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getXueza();
    this.getAward();
  },
  onShow: function () {
    // 页面显示
  },
  getXueza: function () {
    var that = this;
    var userid = app.globalData.userid;
    var xueza = [];
    wx.request({
      url: 'https://cughqc.applinzi.com/finance/finance1.json',
      method: 'GET',
      success: function (res) {
        var data = res.data;
        for (var i in data) {
          if (userid == data[i].userid) {
            var item = {};
            item.project = data[i].project;
            item.year = data[i].year;
            item.e1 = data[i].e1;
            item.e2 = data[i].e2;
            xueza.push(item);
          }
        }
        that.setData({
          xueza: xueza
        });
      }
    })
  },
  getAward: function () {
    var that = this;
    var userid = app.globalData.userid;
    var award = [];
    wx.request({
      url: 'https://cughqc.applinzi.com/finance/finance' + userid + '.json',
      method: 'GET',
      success: function (res) {
        var data = res.data;
        for (var i in data) {
          var item = {};
          item.why = data[i].why;
          item.type = data[i].type;
          item.date = data[i].date;
          item.e2 = data[i].e2;
          award.push(item);
        }
        that.setData({
          award: award
        })
      }
    })
  }
})