var requests = require('requests.js')
function load(){
  requests.load();
}
function operation(self,category) {
  switch (category) {
    case "timetable":
      console.log("跳转到课程表修改页面")
      wx.showActionSheet({
        itemList: ['更新课表', '修改课表'],
        success(res) {
          console.log(res.tapIndex)
          switch (res.tapIndex) {
            case 0:
              //更新课表
              update_timetable(self);
              break;
            case 1:
              //修改课表
              console.log('点击了'.concat(res.tapIndex))
              wx.navigateTo({
                url: '/pages/courses/courses',
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
      //跳转到成绩查询页面
      wx.navigateTo({
        url: '/pages/report/report',
      })
      break;
    case "card":
      //查询一卡通余额
      // get_balance();
      requests.get_balance();
      break;
    case "electricity":
      console.log("跳转到宿舍电费页面")
      //跳转到宿舍电费页面
      wx.navigateTo({
        url: '/pages/electricity/electricity',
      })
      break;
    case "book_search":
      console.log("跳转到图书检索页面")
      //跳转到宿舍电费页面
      wx.navigateTo({
        url: '/pages/others/book_searh/book_search',
      })
      break;
    case "news":
      wx.showToast({
        title: '敬请期待',
        icon: 'none'
      })
      break;
  }
}
//从服务器更新课程表数据
function update_timetable(self){
  requests.get_courses(self)
}
//获取一卡通余额
function get_balance() {
  var that = this;
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
      wx.hideLoading();
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
      wx.hideLoading();
      console.log('查询余额失败')
      wx.showToast({
        title: '查询余额失败',
        icon: 'none'
      })
    }
  })
}
module.exports = {
  load: load,
  operation: operation
}