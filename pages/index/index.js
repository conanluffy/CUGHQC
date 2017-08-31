//获取应用实例
var app = getApp()
Page({
  data: {
    name: '',
    userid: '',
    //时间数据
    year: '',
    month: '',
    date: '',
    //课程表数据
    academic_year: '',
    term: '',
    thisweek: '',
    theday: {
      yesterday: '',
      today: '',
      tomorrow: ''
    },
    day: '',
    week: ["日", "一", "二", "三", "四", "五", "六"],
    noclass: true,
    classInfos: [],
    thedayClasses: [],
    //借阅信息数据
    books: [],
    nobook: true,
    //一卡通
    card: {},
    //校园网
    net: {},
    //电费查询
    electric: {},
    //导航数据
    student: [{
      icon: '/icon/curriculum.png',
      src: '/pages/core/curriculum/curriculum',
      title: '课程表'
    }, {
      icon: '/icon/grade.png',
      src: '/pages/core/grade/grade',
      title: "成绩查询"
    }, {
      icon: '/icon/exam.png',
      src: '/pages/core/exam/exam',
      title: "考试安排"
    }, {
      icon: '/icon/library.png',
      src: '/pages/core/library/library',
      title: "图书馆"
    }, {
      icon: '/icon/campusCard.png',
      src: '/pages/core/campusCard/campusCard',
      title: '校园卡'
    }, {
      icon: '/icon/campusNetwork.png',
      src: '/pages/core/net/net',
      title: '校园网'
    }, {
      icon: '/icon/electric.png',
      src: '/pages/core/electric/electric',
      bindtap: 'KFZ',
      title: "电费查询"
    }, {
      icon: '/icon/finance.png',
      src: '/pages/core/finance/finance',
      title: '财务信息'
    }]
  },
  onShow: function () {
    var that = this;
    that.getNow();
    var name = app.globalData.userData.username,
        userid = app.globalData.userid,
        academic_year = app.globalData.time.academic_year,
        term = app.globalData.time.term;
    that.setData({
      name: name,
      userid: userid,
      academic_year: academic_year,
      term: term
    })
    that.getClass();
    that.getLibrary();
    that.getCardMessage();
    that.getNet();
    that.getElectric();
  },
  //获得时间数据
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
    var week = that.data.week;
    this.setData({
      time: month + '月' + date + '日' + '  ' + '第' + thisweek + '周' + '  ' + '星期' + week[day],
      year: year,
      month: month,
      date: date,
      thisweek: thisweek,
      day: day
    });
  },
  //获取课程信息
  getClass: function () {
    var that = this;
    var thisweek = that.data.thisweek,
        day = that.data.day,
        weekday = that.data.week[day],
        userid = that.data.userid,
        academic_year = that.data.academic_year,
        term = that.data.term;
    wx.request({
      url: 'https://cughqc.applinzi.com/curriculum/' + userid + '/academic_year' + academic_year + 'term' + term + '.json',
      // url:'https://cughqc.applinzi.com/kcb.json',
      data: {},
      method: 'GET',
      success: function (res) {
        that.data.classInfos = res.data;
        that.setData({
          'theday.yesterday': '',
          'theday.today': 'theday',
          'theday.tomorrow': ''
        });
        that.getThedayClass(thisweek, weekday);
      }
    });
  },
  //获得当天课程信息
  getThedayClass: function (thisweek, weekday) {
    var that = this;
    var classInfos = that.data.classInfos,
        thedayClasses = [];
    for (var i in classInfos) {
      if (classInfos[i].DSZ == (thisweek % 2)||classInfos[i].DSZ == undefined){
        if (classInfos[i].begin_week <= thisweek <= classInfos[i].end_week) {
          if (classInfos[i].weekday == weekday) {
            var thedayClass = {};
            thedayClass.begin_part = classInfos[i].begin_part;
            thedayClass.end_part = classInfos[i].end_part;
            thedayClass.name = classInfos[i].name;
            thedayClass.room = classInfos[i].room;
            thedayClass.time = classInfos[i].time;
            thedayClass.teacher = classInfos[i].teacher;
            thedayClass.KCXZ = classInfos[i].KCXZ;
            thedayClasses.push(thedayClass);
          }
        }
      }
    }
    if (thedayClasses.length != 0) {
      that.setData({
        noclass: false
      })
    } else {
      that.setData({
        noclass: true
      })
    }
    thedayClasses.sort(function (a, b) {
      return parseInt(a.begin_part) - parseInt(b.begin_part);
    });
    that.setData({
      thedayClasses: thedayClasses
    });
  },
  //前一天、今天、后一天切换
  theDay: function (e) {
    var that = this;
    var week = that.data.week,
      day = that.data.day,
      thisweek = that.data.thisweek;
    if (e.target.id == "yesterday") {
      that.setData({
        'theday.yesterday': 'theday',
        'theday.today': '',
        'theday.tomorrow': ''
      });
      if (day == 0) {
        day = 7;
        thisweek = thisweek - 1;
      }
      var weekday = that.data.week[day - 1];
      that.getThedayClass(thisweek, weekday);
    } else if (e.target.id == "today") {
      that.setData({
        'theday.yesterday': '',
        'theday.today': 'theday',
        'theday.tomorrow': ''
      });
      var weekday = that.data.week[day];
      that.getThedayClass(thisweek, weekday);
    }
    else if (e.target.id == "tomorrow") {
      that.setData({
        'theday.yesterday': '',
        'theday.today': '',
        'theday.tomorrow': 'theday'
      });
      if (day == 6) {
        day = -1;
        thisweek = thisweek + 1;
      }
      var weekday = that.data.week[day + 1];
      that.getThedayClass(thisweek, weekday);
    }
  },
  //获取借阅信息
  getLibrary: function () {
    var that = this;
    var books = [];
    var userid = that.data.userid;
    wx.request({
      url: 'https://cughqc.applinzi.com/book.json',
      data: {},
      method: 'GET',
      success: function (res) {
        var data = res.data;
        for(var i in data){
          if(data[i].userid == userid){
            if(data[i].status == 1){
              var book = {};
              book.name = data[i].name;
              book.begin_date = data[i].begin_date;
              book.end_date = data[i].back_date;
              books.push(book);
            }
          }
        }
        if (books.length == 0) {
          that.setData({
            nobook: true
          })
        } else {
          that.setData({
            nobook: false
          })
        }
        that.setData({
          books: books,
        });
        console.log("book:" + userid);
        console.log(that.data.nobook);
        console.log(that.data.books);
      }
    });
    
  },
  //获取校园卡信息
  getCardMessage: function () {
    var that = this;
    var card = {};
    var userid = that.data.userid;
    wx.request({
      url: 'https://cughqc.applinzi.com/card.json',
      data: {},
      method: 'GET',
      success: function (res) {
        var data = res.data;
        for (var i in data) {
          if (data[i].userid == userid) {
            card.balance = data[i].e_remind;
            break;
          }
        }
        that.setData({
          card: card
        });
      }
    })
  },
  //获取校园网信息
  getNet: function () {
    var that = this;
    var net = {};
    var userid = that.data.userid;
    wx.request({
      url: 'https://cughqc.applinzi.com/net.json',
      data: {},
      method: 'GET',
      success: function (res) {
        var data = res.data;
        for (var i in data) {
          if (data[i].userid == userid) {
            net.flow_used = data[i].flow_used;
          }
        }
        that.setData({
          net: net
        });
      }
    })
  },
  //获取电费信息
  getElectric: function () {
    var that = this;
    var electric = {};
    var userid = that.data.userid;
    wx.request({
      url: 'https://cughqc.applinzi.com/electric.json',
      data: {},
      method: 'GET',
      success: function (res) {
        var data = res.data;
        for (var i in data) {
          if (data[i].userid == userid) {
              electric.area = data[i].area;
              electric.building = data[i].building;
              electric.room = data[i].dorm;
              electric.e_remind = data[i].e_remind;
          }
        }
        that.setData({
          electric: electric
        });
      }
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.getClass();
    that.getLibrary();
    that.getCardMessage();
    that.getNet();
    that.getElectric();
    wx.showToast({
      title: '正在刷新',
      icon: 'loading',
      duration: 1000
    });
    wx.stopPullDownRefresh();
  },
})
