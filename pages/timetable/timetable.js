var requests = require('../../utils/requests.js');
import {DB} from '../../utils/db.js'
var self = this;
var db;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colors: ['#FFFACD', '#D8BFD8', '#DB7093', '#B0C4DE', '#87CEFA', '#ADD8E6', '#E6E6FA', '#FF7F50', '#DCDCDC','#6495ED'],
    array: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    index: 0,
  //   courses: [
  //     { start: 1, step: 2, day: 1, name: "计算机组成@12-505" },
  //     { start: 5, step: 2, day: 1, name: "操作系统@32-307" },
  //     { start: 3, step: 2, day: 2, name: "移动应用开发@31-402" },
  //     { start: 5, step: 2, day: 2, name: "单片机实验@31" },
  //     { start: 1, step: 2, day: 3, name: "单片机原理及应用@33-B306" },
  //     { start: 3, step: 2, day: 3, name: "计算机组成@32-502" },
  //     { start: 1, step: 2, day: 4, name: "移动应用开发@31-402" },
  //     { start: 1, step: 2, day: 5, name: "数据库实验@31-402" },
  //     { start: 3, step: 2, day: 5, name: "操作系统@8-101" }
  //   ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    db = new DB(self);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // requests.get_courses(self);
    //改为从缓存加载课表
    // db = new DB(self);
    // var data = db.get_timetable();
    // if(!data){
    //   console.log('缓存中无数据')
    //   requests.get_courses(self);
    // }else{
    //   this.setData({
    //     courses: data
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    db.get_timetable();
    // console.log(db);
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
  set_week: function(week){
    // console.log('设置当前周')
    db.set_week(week);
    db.get_timetable(self);
  },
  bindPickerChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.set_week(self.data.array[self.data.index])
  },
  modify: function(){
    wx.vibrateShort({
      complete(){
        wx.navigateTo({
          url: '/pages/modify/modify',
        })
      }
    })
  }
})