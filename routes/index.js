var express = require('express');
var router = express.Router();
const fs = require('fs')
const history = require('connect-history-api-fallback')
const fetch =require('node-fetch')
const path = require('path')
const {sql} = require('../nodeSrc/mySqlClass')


const _sql = new sql('127.0.0.1','root','root','parsedate');


function fileGetter(res,PathStr,type){
  try {
    if (type !== 'img') {
      res.writeHead(200, {'Content-Type': type + '; charset=utf-8'});
      return fs.createReadStream(PathStr, 'utf-8');//(__dirname+PathStr,'utf-8');
    } else {
      fs.readFile(PathStr, function (err, data) {
        if (err) {
          console.log(err)
        } else {
          res.send(data);
        }
      })
    }
  }
  catch (error) {
    console.log(error)
  }
}
/* GET home page. */


//router
//router.use(
router.get(RegExp(/^\/.*/),function(req, res,) {
  fileGetter(res,path.join(__dirname,'../index.html'),'text/html').pipe(res)

});
/*router.get('/:sdfsdfsd',function(req, res,) {
  fileGetter(res,path.join(__dirname,'../index.html'),'text/html').pipe(res)

});
router.get('/:sdfsdfsd/:sdfsdfsdfsd:',function(req, res,) {
  fileGetter(res,path.join(__dirname,'../index.html'),'text/html').pipe(res)

});*/


module.exports = router;
