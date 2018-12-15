function get_info(){
  return wx.getStorageSync('info');
}
module.exports = {
  get_info: get_info
}