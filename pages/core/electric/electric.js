var app = getApp();
Page({
  data:{
    electric:'',
    elec_end:'',
    time:{},
    userid:'',
    username:'',
    area:["北区"],
    building:["25栋"],
    room:[],
    change: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.getElectric();
  },
  onShow:function(){
    // 页面显示
  },
  getElectric: function () {
    var that = this;
    var electric = {};
    var userid = app.globalData.userid;
    var username = app.globalData.userData.username;
    var time = app.globalData.time;
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
            electric.e_used = data[i].e_used;
          }
        }
        var elec_end = parseFloat(electric.e_remind) * 5 + parseFloat(electric.e_used);
        that.setData({
          electric: electric,
          username: username,
          userid: userid,
          time: time,
          elec_end: elec_end
        });
        console.log(that.data);
      }
    })
  },
  roomInput: function (e) {
    this.setData({
      room: e.detail.value
    });
  },
  bind:function(){
    var that = this;
    that.setData({
      change: true
    })
  },
  bind2:function(){
    var that = this;
    var electric = {};
    var room = that.data.room;
    var flag = true;
    wx.request({
      url: 'https://cughqc.applinzi.com/electric.json',
      data: {},
      method: 'GET',
      success: function (res) {
        var data = res.data;
        for (var i in data) {
          if (data[i].dorm == room) {
            flag = false;
            electric.area = data[i].area;
            electric.building = data[i].building;
            electric.room = data[i].dorm;
            electric.e_remind = data[i].e_remind;
            electric.e_used = data[i].e_used;
          }
        }
        if(flag){
          wx.showModal({
            title: '提示',
            content: '寝室号输入错误',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        else{
          var elec_end = parseFloat(electric.e_remind) * 5 + parseFloat(electric.e_used);
          that.setData({
            electric: electric,
            elec_end: elec_end,
            change: false
          });
        }
        
        console.log(that.data);
      }
    })
  }
})