// pages/bind/bind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip:['学号', '一卡通密码','教务密码'],
    t: ['学号', '一卡通密码', '教务密码']
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
  },
  //淡入
  fadeIn: function (event) {
    var index = event.currentTarget.dataset.index;
    this.setData({
      tip1: ''
    })
    this.translate(index, 1);
  },
  //淡出
  fadeOut: function (event) {
    var index = event.currentTarget.dataset.index;
    this.translate(index,0);
  },
  translate: function(index,mode){
    var systemInfo = wx.getSystemInfoSync();
    var tip1 = this.data.t;
    var tip = tip1.concat([]);
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear'
    })
    var param1 = 'animationData' + index;
    var param2 = 'tip';
    var json = '{"' + param1 + '":"","' + param2 + '":""}';
    json = JSON.parse(json);
    if(mode==0){
      animation.opacity(0).translateY(0 / 750 * systemInfo.windowWidth).step();
      json[param2] = tip1;
    }
    else{
      animation.opacity(1).translateY(-40 / 750 * systemInfo.windowWidth).step();
      tip[index] = '';
      json[param2] = tip;
    }
    json[param1] = animation.export()
    this.setData(json);
  }
})