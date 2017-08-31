// pages/indexPages/student/curriculum/curriculum.js
var app = getApp();
Page({
  data: {
    month: '',
    showAll: false,//课程全部信息显示
    allInfo: { CK: [] },//要显示的课程全部信息
    day: '',
    colors: ['#f9bdbb', '#f8bbd0', '#e1bee7', '#ffecb3', '#ffe0b2', '#ffccbc', '#d7ccc8', '#f5f5f5'],
    curriculum: {},
    KCB: {},//优化后的课程表数据，可直接通过渲染函数渲染
    array: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周',
      '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周',
      '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周',
      '第22周', '第23周'],
    week: 1,
    form: {//第一层是y的值，第二层是x的值
      '0': {
        '0': { classInfo: {}, text0: "" },
        '1': { classInfo: {}, text0: "一" },
        '2': { classInfo: {}, text0: "二" },
        '3': { classInfo: {}, text0: "三" },
        '4': { classInfo: {}, text0: "四" },
        '5': { classInfo: {}, text0: "五" },
        '6': { classInfo: {}, text0: "六" },
        '7': { classInfo: {}, text0: "日" }
      },
      '1': {
        '0': { classInfo: {}, text: "" },
        '1': { classInfo: {}, text: "" },
        '2': { classInfo: {}, text: "" },
        '3': { classInfo: {}, text: "" },
        '4': { classInfo: {}, text: "" },
        '5': { classInfo: {}, text: "" },
        '6': { classInfo: {}, text: "" },
        '7': { classInfo: {}, text: "" }
      },
      '2': {
        '0': { classInfo: {}, text: "" },
        '1': { classInfo: {}, text: "" },
        '2': { classInfo: {}, text: "" },
        '3': { classInfo: {}, text: "" },
        '4': { classInfo: {}, text: "" },
        '5': { classInfo: {}, text: "" },
        '6': { classInfo: {}, text: "" },
        '7': { classInfo: {}, text: "" }
      },
      '3': {
        '0': { classInfo: {}, text: "" },
        '1': { classInfo: {}, text: "" },
        '2': { classInfo: {}, text: "" },
        '3': { classInfo: {}, text: "" },
        '4': { classInfo: {}, text: "" },
        '5': { classInfo: {}, text: "" },
        '6': { classInfo: {}, text: "" },
        '7': { classInfo: {}, text: "" }
      },
      '4': {
        '0': { classInfo: {}, text: "" },
        '1': { classInfo: {}, text: "" },
        '2': { classInfo: {}, text: "" },
        '3': { classInfo: {}, text: "" },
        '4': { classInfo: {}, text: "" },
        '5': { classInfo: {}, text: "" },
        '6': { classInfo: {}, text: "" },
        '7': { classInfo: {}, text: "" }
      },
      '5': {
        '0': { classInfo: {}, text: "" },
        '1': { classInfo: {}, text: "" },
        '2': { classInfo: {}, text: "" },
        '3': { classInfo: {}, text: "" },
        '4': { classInfo: {}, text: "" },
        '5': { classInfo: {}, text: "" },
        '6': { classInfo: {}, text: "" },
        '7': { classInfo: {}, text: "" }
      },
      '6': {
        '0': { classInfo: {}, text: "" },
        '1': { classInfo: {}, text: "" },
        '2': { classInfo: {}, text: "" },
        '3': { classInfo: {}, text: "" },
        '4': { classInfo: {}, text: "" },
        '5': { classInfo: {}, text: "" },
        '6': { classInfo: {}, text: "" },
        '7': { classInfo: {}, text: "" }
      }
    }
  },
  onLoad: function () {
    var that = this;
    wx.request({
      // url: 'https://cughqc.applinzi.com/curriculum/' + userid + '/academic_year' + academic_year + 'term' + term + '.json',
      url: 'https://cughqc.applinzi.com/curriculum/20131004440/academic_year2016-2017term2.json',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res.data);
      },
    })
  },

})