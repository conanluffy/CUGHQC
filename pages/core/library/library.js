var app = getApp();
Page({
  data: {
    userid: '',
    books: [],
    tobooks: [],
    nobook: true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onShow: function () {
    // 页面显示
    this.getLibrary();
  },
  getLibrary: function () {
    var that = this;
    var books = [];
    var tobooks = [];
    var userid = app.globalData.userid;
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    wx.request({
      url: 'https://cughqc.applinzi.com/book.json',
      data: {},
      method: 'GET',
      success: function (res) {
        var data = res.data;
        for (var i in data) {
          if (data[i].userid == userid) {
            if (data[i].status == 1) {
              var book = {};
              book.name = data[i].name;
              book.begin_date = data[i].begin_date;
              book.end_date = data[i].back_date;
              tobooks.push(book);
            }
            else {
              var book = {};
              book.name = data[i].name;
              book.begin_date = data[i].begin_date;
              book.end_date = data[i].back_date;
              books.push(book);
            }
          }
        }
        if (books.lenth != 0) {
          that.setData({
            nobook: false
          })
        } else {
          that.setData({
            nobook: true
          })
        }
        that.setData({
          books: books,
          tobooks: tobooks,
          userid: userid
        });
        wx.hideLoading();
      }
    });
  },
})