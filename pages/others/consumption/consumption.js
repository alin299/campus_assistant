var self;
var requests = require('../../../utils/requests.js');
Page({
  data: {
    records: []
  },
  
  onLoad: function (options) {
    self = this;
    requests.load();
    requests.get_records(self);
  }
})