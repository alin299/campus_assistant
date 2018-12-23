var requests = require('../../utils/requests.js')
var self = this;
// pages/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    term: [['2016-2017', '2017-2018'], ['1', '2']],
    multiIndex: [0, 1],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.get_score();
    self = this;
    this.setData({
      scores:[
        // { lesson_name: '数学', score: '99'},
        // { lesson_name: '语文', score: '99' },
        // { lesson_name: '英语', score: '99' },
        // { lesson_name: '数学', score: '99' }
      ]
    })
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
  bindMultiPickerChange: function (e) {
    //设置选中的学期
    this.setData({
      multiIndex: e.detail.value
    })
  },
  query: function() {
    //获取选中的学年和学期
    let term = this.data.term;
    let index = this.data.multiIndex;
    console.log(term[0][index[0]] + ' ' + term[1][index[1]]);
    requests.get_score(self,term[0][index[0]], term[1][index[1]]);
  }
})