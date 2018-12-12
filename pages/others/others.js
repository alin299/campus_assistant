var server = getApp().globalData.server
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
      console.log(server)
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
  operation: function (event) {
    console.log(event)
    let category = event.target.dataset.category;
    console.log(category)
    switch(category){
      case "timetable":
        console.log("跳转到课程表修改页面")
        wx.navigateTo({
          url: '/pages/others/others',
        })
        break;
      case "score":
        console.log("跳转到成绩查询页面")
        wx.navigateTo({
          url: '/pages/others/others',
        })
        break;
      case "card":
        console.log("跳转到一卡通页面")
        wx.navigateTo({
          url: '/pages/others/others',
        })
        break;
      case "electricity":
        console.log("跳转到宿舍电费页面")
        wx.navigateTo({
          url: '/pages/electricity/electricity',
        })
        break;
    }
    
  }
})