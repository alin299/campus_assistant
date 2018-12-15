// pages/bind/bind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_info();
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
  get_info: function (key) {
    var that = this;
    let obj = {};
    try {
      obj = wx.getStorage({
        key: 'info',
        success: function(res) {
          that.setData({
            info: res.data,
          });
        },
      })
    } catch (e) {
      // none
    }
  },
  bind: function(event) {
    let value = event.detail.value;
    wx.setStorageSync('info', value);
    wx.showToast({
      title: '绑定成功',
    })
  }
})