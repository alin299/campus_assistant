var requests = require('requests.js')
class DB{
  constructor(self){
    this.that = self;
  }
  //读取所有课程
  get_all_courses(){
    var data = wx.getStorageSync('timetable');
    this.that.setData({
      courses:data
    })
  }
  //选取该周课程
  get_timetable(){
    var data = wx.getStorageSync('timetable');
    if(!data){
      requests.get_courses(this.that);
    }
    var week = this.get_week();
    // console.log('获取第'+week+'周的课表')
    var weeks;
    var courses = [];
    for(var key in data){
      weeks = data[key].weeks
      for(var i in weeks)
        if(weeks[i] == week){
          courses.push(data[key])
        }
    }
    console.log(courses);
    this.that.setData({
      courses: courses,
      week: week
    })
  }
  //设置课表缓存
  set_storage(data){
    console.log('设置缓存');
    wx.setStorageSync('timetable', data)
  }
  //设置当前周
  set_week(week){
    wx.setStorageSync('week', week);
  }
  //获取当前周
  get_week(){
    var data = wx.getStorageSync('week');
    if (!data) {
      data = 1;
    }
    return data;
  }
  add_courses(value){
    var data = wx.getStorageSync('timetable');
    console.log(data);
    if(!data)
      data = [];
    data.push(value);
    this.set_storage(data);
  }
}
export{DB}