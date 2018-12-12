Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:'N/A'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getBalance()
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
  getBalance: function () {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:5000/balance',
      method: 'POST',
      data: {
        a: '2016283414',
        p: '166236'
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        if(res.data.code==1){
          that.setData({
            balance: res.data.result
          });
        }
        else if(res.data.code==-1){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
        
      },
      fail(){
        console.log('查询余额失败')
      }
    })
  }
})