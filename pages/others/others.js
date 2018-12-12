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
    // console.log(event)
    let category = event.target.dataset.category;
    // console.log(category)
    switch(category){
      case "timetable":
        console.log("跳转到课程表修改页面")
        wx.showActionSheet({
          itemList: ['更新课表', '修改课表'],
          success(res) {
            console.log(res.tapIndex)
            switch(res.tapIndex){
              case 0:
                wx.showLoading({
                  title: '更新中，请稍等',
                })
                setTimeout(function () {
                  wx.hideLoading()
                  wx.showToast({
                    title: '更新完成',
                  })
                }, 1000)
                break;
              case 1:
                console.log('点击了'.concat(res.tapIndex))
                wx.showToast({
                  title: '暂未完善',
                  icon: 'none'
                })
            }
          },
          fail(res) {
            console.log(res.errMsg)
          }
        })
        break;
      case "score":
        console.log("跳转到成绩查询页面")
        wx.navigateTo({
          url: '/pages/report/report',
        })
        break;
      case "card":
        this.get_balance();
        break;
      case "electricity":
        console.log("跳转到宿舍电费页面")
        wx.navigateTo({
          url: '/pages/electricity/electricity',
        })
        break;
    }
  },
  get_balance: function () {
    var that = this;
    wx.request({
      url: server + '/balance',
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
        if (res.data.code == 1) {
          wx.showModal({
            title: '提示',
            content: '您的一卡通余额为：'.concat(res.data.result),
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
        else if (res.data.code == -1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }

      },
      fail() {
        console.log('查询余额失败')
        wx.showToast({
          title: '查询余额失败',
          icon: 'none'
        })
      }
    })
  }
})