var requests = require('../../utils/requests.js');
var self = this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:'N/A',
    bulb:'/images/bulb.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
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

  operation: function (event) {
    let category = event.target.dataset.category;
    switch (category) {
      case "recharge":
        console.log("充值")
        //跳转到充值页面
        wx.navigateTo({
          url: '/pages/recharge/recharge',
        })
        break;
      case "query":
        console.log("查询")
        requests.get_elec_balance(self);
        break;
    }

  }
})