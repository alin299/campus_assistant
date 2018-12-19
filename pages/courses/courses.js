// pages/courses/courses.js
import { DB } from '../../utils/db.js'
var db;
var self; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: ['一', '二', '三', '四', '五', '六', '日']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    db = new DB(this)
    db.get_all_courses();
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
  delete: function(event){
    //删除课程
    self.data.courses.pop(event.currentTarget.dataset.id);
    console.log(self.data.courses);
    //更新课表缓存
    db.set_storage(self.data.courses);
    //重新加载页面中课表数据
    this.setData({
      courses: self.data.courses
    })
  }
})