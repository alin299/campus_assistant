const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//   计算日期为当年的第几周   
function weekOfYear(year, month, day) {
  //   year       年   
  //   month     月   
  //   day         日   
  //   每周从周日开始   
  var date1 = new Date(year, 0, 1);
  var date2 = new Date(year, month - 1, day-1, 1);
  var dayMS = 24 * 60 * 60 * 1000;
  var firstDay = (7 - date1.getDay()) * dayMS;
  var weekMS = 7 * dayMS;
  date1 = date1.getTime();
  date2 = date2.getTime();
  return Math.ceil((date2 - date1 - firstDay) / weekMS) + 1;
}
//   
//   通过周数和星期计算日期   
function dateFromWeek(year, week, day) {
  //   year       年   
  //   week       周   
  //   day         星期   (0-6,   0代表周日)   
  var date1 = new Date(year, 0, 1);
  var dayMS = 24 * 60 * 60 * 1000;
  var firstDay = (7 - date1.getDay()) * dayMS;
  var weekMS = (week - 2) * 7 * dayMS;
  var result = date1.getTime() + firstDay + weekMS + day * dayMS;
  date1.setTime(result);
  return date1.toLocaleDateString();
}   
module.exports = {
  weekOfYear: weekOfYear,
  formatTime: formatTime
}
