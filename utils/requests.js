/*
将小程序中的所有请求整理到这
*/
var server = getApp().globalData.server;
//向服务器获取一卡通余额
function get_balance() {
  wx.showLoading({
    title: '查询中',
  })
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
        wx.hideLoading();
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
//请求成绩
function get_score(self,year, term) {
  var that = this;
  console.log('test');
  wx.request({
    url: server + '/score',
    method: 'POST',
    data: {
      a: '2016283414',
      p: '166236',
      year: year,
      term: term
    },
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      console.log(res.data)
      if (res.data.code == 1) {
        self.setData({ 
          scores: res.data.result
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
      console.log('查询成绩失败')
      wx.showToast({
        title: '查询成绩失败',
        icon: 'none'
      })
    }
  })
}
//查电费
function get_elec_balance(self) {
  wx.request({
    url: server + '/electricity',
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
        self.setData({
          balance: res.data.result
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
      console.log('查询电费余额失败')
      wx.showToast({
        title: '查询余额失败',
        icon: 'none'
      })
    }
  })
}
module.exports = {
  get_balance: get_balance,
  get_score: get_score,
  get_elec_balance:get_elec_balance
}