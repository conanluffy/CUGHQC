var app = getApp();
Page({
  data: {
    help_status: false,
    userid: '',
    passwd: ''
  },
  //获取用户输入的账号
  useridInput: function (e) {
    this.setData({
      userid: e.detail.value
    });
  },
  //获取用户输入的密码
  passwdInput: function (e) {
    this.setData({
      passwd: e.detail.value
    })
  },
  //登录、检查账号密码正确性并绑定userid
  bind: function () {
    var that = this;
    var userid = that.data.userid;
    var passwd = that.data.passwd;
    var idInData = false;
    wx.clearStorage();
    wx.clearStorageSync();
    wx.request({
      url: 'https://cughqc.applinzi.com/user.json',
      data: {
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        var data = res.data;
        for (var i in data) {
          if (userid == data[i].userid) {
            idInData = true;
            if (passwd == data[i].passwd) {
              app.globalData.userid = userid;
              app.globalData.is_bind = true;
              app.globalData.userData = data[i];
              app.saveData();
              app.onLaunch();
              wx.switchTab({
                url: '/pages/more/more',
                success: function (res) {
                  // success
                },
                fail: function (res) {
                  // fail
                },
                complete: function (res) {
                  // complete
                }
              })
            } else {
              wx.showModal({
                title: '绑定失败',
                content: '账号或密码错误',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              });
            }
          }
        }
        if (!idInData) {
          wx.showModal({
            title: '绑定失败',
            content: '账号不存在'
          });
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  bind2: function () {
    var userid = "20131004440";
    wx.request({
      url: 'https://cughqc.applinzi.com/user.json',
      data: {
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        var data = res.data;
        for (var i in data) {
          if (userid == data[i].userid) {
            app.globalData.userid = userid;
            app.globalData.is_bind = true;
            app.globalData.userData = data[i];
            app.saveData();
            app.onLaunch();
            wx.switchTab({
              url: '/pages/more/more',
            })
          }
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  }
})