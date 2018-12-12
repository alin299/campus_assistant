// pages/timetable/timetable.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colors: ['#FFFACD', '#D8BFD8', '#DB7093', '#B0C4DE', '#87CEFA', '#ADD8E6', '#E6E6FA', '#FF7F50', '#DCDCDC','#6495ED'],
    courses: [
      { start: 1, step: 2, day: 1, name: "计算机组成@12-505" },
      { start: 5, step: 2, day: 1, name: "操作系统@32-307" },
      { start: 3, step: 2, day: 2, name: "移动应用开发@31-402" },
      { start: 5, step: 2, day: 2, name: "单片机实验@31" },
      { start: 1, step: 2, day: 3, name: "单片机原理及应用@33-B306" },
      { start: 3, step: 2, day: 3, name: "计算机组成@32-502" },
      { start: 1, step: 2, day: 4, name: "移动应用开发@31-402" },
      { start: 1, step: 2, day: 5, name: "数据库实验@31-402" },
      { start: 3, step: 2, day: 5, name: "操作系统@8-101" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCourses();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getCourses:function(){
    var that = this;
    wx.request({
      url: 'http://www.alin299.top:5000/courses', 
      data: {
        
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data.courses)
        that.setData({
          'courses': res.data.courses
        })
      }
    })
  }
})