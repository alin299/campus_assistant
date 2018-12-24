// pages/others/book_searh/book_search.js
var self;
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
    self = this;
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
  search:function(name,page,total){
    wx.request({
      url: 'https://www.alin299.top:5000/book',
      method: 'post',
      data: {
        n: name,
        p: page,
        t: total,
      },
      success(res) {
        console.log(res);
        if (res.data.code == 1) {
          if(self.data.book_list){
            self.data.book_list = self.data.book_list.concat(res.data.result.book_list);
          }else{
            self.data.book_list = res.data.result.book_list;
          }
          self.data.total = res.data.result.total_page;
          self.setData({
            book_list: self.data.book_list,
            total:self.data.total
          })
        }
      }
    })
  },//搜索事件
  onCancel(e) {
    var name = e.detail.value;
    this.setData({
      book_list:[],
      name: name,
      page: 1,
      total:1
    })
    console.log('搜索', name);
    this.search(name,1,1);
  },
  //滚动到底部触发下一页
  next_page:function(){
    self.data.page += 1;
    if(self.data.page > self.data.total){
      wx.showToast({
        title: '没有更多啦',
        icon: 'none'
      })
      return;
    }
    self.search(self.data.name,self.data.page,self.data.total);
  },
  //处理从网络加载图片失败的问题
  errorFunction:function(e){
    var index = e.currentTarget.dataset.index;
    self.data.book_list[index].cover = '/images/library/404.jpg'
    console.log(e);
    self.setData({
      book_list: self.data.book_list
    })
  }
})