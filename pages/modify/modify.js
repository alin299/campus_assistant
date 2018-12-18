// pages/modify/modify.js
import {DB} from '../../utils/db.js';
var db;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: [['周一', '周二', '周三', '周四', '周五', '周六', '周日',], 
      ['1', '2', '3', '4', '5', '6', '7', '8'],
      ['1', '2', '3', '4', '5', '6', '7', '8']],
    multiIndex: [0, 0,0],
    week: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
    [ '正常', '单周', '双周']],
    multiIndex2: [0, 0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db = new DB();
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
  jump: function () {
    wx.navigateTo({
      url: '/pages/courses/courses',
    })
  },
  bindTimeChange: function (e) {
    //设置选中的时间
    if (e.detail.value[2]<e.detail.value[1])
    {
      e.detail.value[2] = e.detail.value[1];
    }
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindWeekChange: function (e) {
    //设置选中的周
    if (e.detail.value[1] < e.detail.value[0]) {
      e.detail.value[1] = e.detail.value[0];
    }
    this.setData({
      multiIndex2: e.detail.value
    })
  },
  add: function(event) {
    var time = this.data.time;
    var multiIndex = this.data.multiIndex;
    var week = this.data.week[0];
    var multiIndex2 = this.data.multiIndex2;
    var data = event.detail.value;
    data.day = multiIndex[0]+1;
    data.start = multiIndex[1]+1;
    data.step = multiIndex[2]-multiIndex[1]+1;
    data.weeks = [];
    for(var i in week){
      if (i <= multiIndex2[1]&&i>= multiIndex2[0]){
        //单周
        if (multiIndex2[2]==1&&i%2==0){
          data.weeks.push(parseInt(i) + 1);
        }
        //双周
        else if (multiIndex2[2] == 2 && i % 2 == 1) {
          data.weeks.push(parseInt(i) + 1);
        }
        else if (multiIndex2[2] == 0){
          data.weeks.push(parseInt(i)+1);
        }
      }
    }
    db.add_courses(data);
    wx.showToast({
      title: '添加成功',
    })
  }
})