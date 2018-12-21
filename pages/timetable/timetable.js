var requests = require('../../utils/requests.js');
import {DB} from '../../utils/db.js'
var self = this;
var db;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    day: ['一', '二', '三', '四', '五', '六', '日'],
    colors: ['#FFFACD', '#D8BFD8', '#DB7093', '#B0C4DE', '#87CEFA', '#ADD8E6', '#E6E6FA', '#FF7F50', '#DCDCDC','#6495ED'],
    array: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    index: 0,
    week: 1
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
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    db.get_timetable();
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
    this.set_week(self.data.array[self.data.index]);
  },
  //长按跳转到添加课程界面
  modify: function(){
    wx.vibrateShort({
      complete(){
        wx.navigateTo({
          url: '/pages/modify/modify',
        });
      }
    });
  }
})