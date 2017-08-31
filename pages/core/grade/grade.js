var app = getApp();
Page({
  data:{
    userid:'',
    name:'',
    academicYears:['2013-2014','2014-2015','2015-2016','2016-2017'],
    terms:['1','2'],
    terms_index:1,
    years_index:1,
    grades:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var userid = app.globalData.userid;
    var name = app.globalData.userData.username;
    that.setData({
      userid: userid,
      name: name
    })
    that.getGrades();
  },
  //获取成绩
  getGrades:function(){
    var that = this;
    wx.request({
      url: 'https://cughqc.applinzi.com/grades/academic_year2015-2016term1.json',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data)
        if(res.data){
            var data = res.data,
              grades = [];
            for(var i in data){
              var grade = {};
              grade.name = data[i].KCMC;
              grade.kind = data[i].KCXZ;
              grade.credit = data[i].KCXF;
              grade.grade = data[i].KCCJ;
              grade.KCJD=data[i].KCJD;
              grades.push(grade);
            };
            that.setData({
              grades:grades
            })
          }else{
              that.setData({
                grades:null
              })
             wx.showToast({
              title:'该学年/学期暂无成绩数据',
              duration:1500,
              icon:'loading'
            })
          }  
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  //选择学年
  choseYears:function(res){
    console.log(res);
    console.log('picker发送选择改变，携带值为', res.detail.value);
    var that = this;
        academicYears = that.data,
        index = res.detail.value;
    that.setData({
      academic_year:academicYears[index],
      years_index:index
    });
    that.getGrades();
  },
  //选择学期
  choseTerms:function(res){
    console.log(res);
    console.log('picker发送选择改变，携带值为', res.detail.value);
    var that = this;
        // terms = that.data.terms,
        // index = res.detail.value[0];
    that.setData({
      terms:res.data,
      terms_index:res.detail.value
    });
    that.getGrades();
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