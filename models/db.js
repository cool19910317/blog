/**
 * Created by Administrator on 2016/4/19.
 */
var settings = require('../settings'),
  Db = require('mongodb').Db,
  Connection=require('mongodb').Connection,
  Server = require('mongodb').Server;
module.exports = new Db(settings.db,new Server(settings.host,settings.port),{safe:true});