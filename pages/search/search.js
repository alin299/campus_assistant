// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[
      {
        imgsrc: '/images/1.jpg',
        name:'武动乾坤'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // that.search()
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
  search: function(n){
    var that = this;
    console.log('搜索')
    wx.request({
      url: 'http://127.0.0.1:8000/book/',
      data: {
        name:n
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        that.setData({
          books: res.data.books
        })
      }
    })
  }, 
  formSubmit: function (e) {
    console.log(e.detail.value.input)
    this.search(e.detail.value.input)
  }
})