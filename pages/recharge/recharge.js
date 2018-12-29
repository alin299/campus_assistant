var self;
var db;
import { DB } from '../../utils/db.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiIndex: [0, 0, 0],
    dormitory_array: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    db = new DB(self);
    db.load_dormitory();
    wx.getStorage({
      key: 'dormitory',
      success: function(res) {
        if(res){
          console.log(res.data.multiIndex)
          self.setData({
            multiIndex: res.data.multiIndex
          })
        }
      },
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
  bindblur: function (e) {
    self.setData({
      sum: e.detail.value
    })
  },
  bindcolumnchange: function (event) {
    if (event.detail.column == 1) {
      var j = event.detail.value + 1;
      for (let i = 1; i <= 26; i++) {
        if (i > 9)
          self.data.dormitory_array[2][i - 1] = j + '' + i;
        else
          self.data.dormitory_array[2][i - 1] = j + '' + 0 + i;
      }
      self.setData({ dormitory_array: self.data.dormitory_array })
    }
  },
  bindMultiPickerChange: function (event) {
    console.log(event.detail.value)
    //设置选中的寝室
    this.setData({
      multiIndex: event.detail.value
    });
  },
  recharge: function () {
    var area = self.data.dormitory_array[0][self.data.multiIndex[0]];
    var room = self.data.dormitory_array[2][self.data.multiIndex[2]];
    var sum = self.data.sum;
    if(!sum){
      wx.showToast({
        title: '请先输入充值金额',
        icon: 'none'
      })
      return;
    }
    wx.showModal({
      title: '充值确认',
      content: '确定为'+area+'栋'+room+'充值'+sum+'元?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '暂未开放',
            icon: 'none'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})