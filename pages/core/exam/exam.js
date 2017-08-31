var app = getApp();
Page({
  data:{
    userid:'',
    name:'',
    exams:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var userid = app.globalData.userid;
    var name = app.globalData.userData.username;
    wx.request({
      url: 'https://cughqc.applinzi.com/exam/academic_year2016-2017term2.json',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        var data = res.data;
        var exams = [];
        for(var i in data){
              var exam = {};
              exam.name = data[i].name;
              exam.date = data[i].date;
              exam.time = data[i].time;
              exam.room = data[i].room;
              exam.seat = data[i].seat;
              exams.push(exam);
        };
        that.setData({
            exams : exams,
            userid : userid,
            name : name
        })
      }
    })
  },
  onShow:function(){
    // 页面显示
  }
})