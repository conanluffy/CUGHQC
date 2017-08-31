//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    var that = this,
    s_userid = wx.getStorageSync('userid');
    that.getNow();
    // console.log("app.js的数据1：");
    // console.log(this.globalData);
    if(s_userid == ''){
      wx.navigateTo({
        url: '/pages/more/login/login'
      });
      // console.log("调转到登录界面有没有做")
      that.getUserInfo();
    }else{
      that.globalData.is_bind = true;
      that.getData();
      // that.getClass();
      // console.log("app.js:你到底到没到过这里");
      // console.log("app.js的数据2：");
      // console.log(this.globalData);
    }
  },
  //获得现在相关的时间数据
  getNow: function () {
    var that = this;
    var date = new Date();
    var day = date.getDay(),//这里可以改哪一天，用于测试或者以后可以添加一个查看明天的功能
        time = date.getTime(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        date = date.getDate(),
        time1 = new Date(Date.parse("February 20, 2017")),//本学期第一周开始时间
        thisweek = Math.floor((time - time1) / 604800000) + 1;
    that.globalData.time.year = year;
    that.globalData.time.month = month;
    that.globalData.time.date = date;
    that.globalData.time.thisweek = thisweek;
    that.globalData.time.day = day;
  },
  //获得课程信息
  // getClass: function () {
  //   var that = this;
  //   var academic_year = that.globalData.time.academic_year,
  //       term = that.globalData.time.term,
  //       userid = that.globalData.userid,
  //       thisweek = that.globalData.time.thisweek,
  //       day = that.globalData.time.day,
  //       week = ["日", "一", "二", "三", "四", "五", "六"],
  //       weekday = week[day];
  //   var classInfos = [];
  //   wx.request({
  //     url: 'https://cughqc.applinzi.com/curriculum/' + userid + '/academic_year' + academic_year + 'term' + term + '.json',
  //     // url:'https://cughqc.applinzi.com/kcb.json',
  //     data: {},
  //     method: 'GET',
  //     success: function (res) {
  //       that.globalData.classInfos = res.data;
  //       console.log("app.js:你到底有没有到这来获得课表信息");
  //       console.log(res.data);
  //     },
  //     fail: function (res) {
  //       // fail
  //     },
  //     complete: function (res) {
  //       // complete
  //     }
  //   });
  //   wx.setStorage({
  //     key: 'classInfos',
  //     data: 'classInfos',
  //   });
  // },
  //获取用户微信资料
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo);
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  //缓存数据
  saveData:function() {
    var that = this,
    userid = that.globalData.userid,
    userData = that.globalData.userData;
    //缓存userid
    wx.setStorage({
      key: 'userid',
      data: userid
    });
    wx.setStorage({
      key: 'userData',
      data: userData
    });
    console.log("缓存数据");
  },
  //从缓存获取数据
  getData:function(){
    var that = this;
    that.globalData.userid = wx.getStorageSync('userid');
    that.globalData.userData = wx.getStorageSync('userData');
  },
  util: require('./utils/util'),
  globalData:{
    userInfo:'',//用户的微信资料
    userid:'',
    is_bind: false,
    userData:{},
    // classInfos:[],
    time:{
      academic_year:'2016-2017',
      term:'2',
      year:'',
      month:'',
      date:'',
      thisweek:'',//当前周
      day:'',//当前工作日
    }
  }
})