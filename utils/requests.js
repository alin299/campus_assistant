/*
将小程序中的所有请求整理到这
*/
import {DB} from 'db.js';
var server = getApp().globalData.server;
var info;
var dormitory;
var account;
var password;
var spassword;
var area;
var floor;
var room;
//重新获取账号数据
function load(){
  info = wx.getStorageSync('info');
  dormitory = wx.getStorageSync('dormitory');
  account = info.a;
  password = info.p;
  spassword = info.sp;
  area = dormitory.area;
  floor = dormitory.floor;
  room = dormitory.room;
  console.log('重新获取账号数据');
}
//向服务器获取一卡通余额
function get_balance() {
  if (account == null || spassword == null) {
    wx.showModal({
      title: '提示',
      content: '尚未绑定账号',
      confirmText: '绑定',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/bind/bind',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    return;
  }
  wx.showLoading({
    title: '查询中',
  })
  wx.request({
    url: server + '/balance',
    method: 'POST',
    data: {
      a: account,
      p: spassword
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
  if(account==null || password==null){
    wx.showModal({
      title: '提示',
      content: '尚未绑定账号',
      confirmText: '绑定',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/bind/bind',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    return;
  }
  wx.showLoading({
    title: '查询中，请稍等',
  })
  wx.request({
    url: server + '/score',
    method: 'POST',
    data: {
      a: account,
      p: password,
      year: year,
      term: term
    },
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      wx.hideLoading();
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
  if (account == null || spassword == null) {
    wx.showModal({
      title: '提示',
      content: '尚未绑定账号',
      confirmText: '绑定',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/bind/bind',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    return;
  }
  if (area == null || floor == null || room == null) {
    wx.showModal({
      title: '提示',
      content: '尚未选择寝室',
      confirmText: '确定',
      showCancel: '',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } 
      }
    })
    return;
  }
  wx.request({
    url: server + '/electricity',
    method: 'POST',
    data: {
      a: account,
      p: spassword,
      area: area,
      floor: floor,
      room: room
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
//从服务器获取课程
function get_courses(self) {
  wx.showLoading({
    title: '更新中，请稍等',
  })
  wx.request({
    url: server + '/courses',
    method: 'POST',
    data: {
      a: account,
      p: password
    },
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      wx.hideLoading();
      if (res.data.courses){
        console.log(res.data.courses)
      }
      if (res.data.code == 1){
        var db = new DB();
        db.set_storage(res.data.result)
        wx.showToast({
          title: '更新完成',
        })
      }else{
        wx.showToast({
          title: '课表获取失败，请检查账号密码等',
          icon: 'none',
          duration: 2000
        });
      }
    },
    fail(res) {
      wx.hideLoading();
    }
  })
}
module.exports = {
  load: load,
  get_balance: get_balance,
  get_score: get_score,
  get_elec_balance:get_elec_balance,
  get_courses: get_courses
}