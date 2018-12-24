var requests = require('../../utils/requests.js');
import { DB } from '../../utils/db.js'
var self = this;
var db;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:'N/A',
    bulb:'/images/bulb.jpg',
    multiIndex: [0,0,0],
    dormitory_array: [[1,2,3],[4,5,6],[7,8,9]]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    db = new DB(self);
    db.load_dormitory();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    requests.get_elec_balance(self);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    requests.load();
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
  bindcolumnchange: function (event){
    if (event.detail.column == 1) {
      var j = event.detail.value + 1;
      for (let i = 1; i <= 26; i++) {
        if (i > 9)
          self.data.dormitory_array[2][i - 1] = j + '' + i;
        else
          self.data.dormitory_array[2][i - 1] = j + '' + 0 + i;
      }
      self.setData({ dormitory_array: self.data.dormitory_array})
    }
  },
  bindMultiPickerChange: function (event) {
    console.log(event.detail.value)
    //设置选中的寝室
    this.setData({
      multiIndex: event.detail.value
    });
    //将寝室数据缓存
    var dormitory = {
      area: self.data.dormitory_array[0][event.detail.value[0]],
      floor: self.data.dormitory_array[1][event.detail.value[1]],
      room: self.data.dormitory_array[2][event.detail.value[2]],
      multiIndex: event.detail.value
    }
    db.set_dormitory(dormitory);
  },
  operation: function (event) {
    let category = event.target.dataset.category;
    switch (category) {
      case "recharge":
        console.log("充值")
        //跳转到充值页面
        wx.showToast({
          title: '敬请期待',
          icon: 'none'
        })
        break;
        // wx.navigateTo({
        //   url: '/pages/recharge/recharge',
        // })
        // break;
      case "query":
        console.log("查询")
        requests.load();
        requests.get_elec_balance(self);
        break;
    }

  }
})