const express = require('express');
const router = express.Router();
const fs = require('fs')
//const fetch =require('node-fetch')
const path = require('path')
const {sql} = require('../nodeSrc/mySqlClass')



const _sql = new sql('127.0.0.1','root','root','parsedate');

function nextGetter(req,res){
  if(Number(req.params.IdNext)){
    if(req.params.typeOfData==='news'){
      dataGetter((Number(req.params.IdNext)-4),Number(req.params.IdNext),req,res,req.params.typeOfData);
    }
    if(req.params.typeOfData==='courses'){
      dataGetter((Number(req.params.IdNext)-4),Number(req.params.IdNext),req,res,req.params.typeOfData);
    }
  }
}
async function searchFunction(req,res,str){
  let result=[];
  console.log(str);
  let a = await _sql.sqlQuery("select * from parsedate.course  where parsedate.course.nameCourse regexp ? or parsedate.course.typeCourse regexp ? ;",[str,str] );
  let b = await _sql.sqlQuery("select * from parsedate.datafromitworld  where parsedate.datafromitworld.Title regexp ? or  parsedate.datafromitworld.Content regexp ? ;",[str,str] )

  result=a[0].concat(b[0])
  result.sort(() => Math.random() - 0.5);
  res.send(JSON.stringify(result))
  //shuffle
  //console.log(a)


  //console.log(a[0])

}
async function dataGetter(numbFirs=0,numbEnd=0,req,res,type=''){
  try {
    //console.log(numbEnd+' '+numbFirs);
    let sql_result, str, maxIdResult, typeOfData = "";
    switch (type) {
      case "news":
        typeOfData = " parsedate.datafromitworld ";
        break;
      case "courses":
        typeOfData = " parsedate.course ";
        break;
      default:
        res.send(JSON.stringify([]))
        return;
    }
    if (numbFirs === 0 && numbEnd === 0) {
      maxIdResult = await _sql.sqlQuery("select max(id) from " + typeOfData + ";");
      str = "select * from " + typeOfData + " where id between " + (Number(maxIdResult[0][0]['max(id)']) - 5) + " and " + maxIdResult[0][0]['max(id)'] + ";";
    } else {
      if(numbFirs >=0 && numbEnd >= 0){
        str = "select * from " + typeOfData + " where id between " + numbFirs + " and " + numbEnd + ";";
      }else {
        res.send(JSON.stringify([]))
        return;
      }

    }
    sql_result = await _sql.sqlQuery(str);
    res.send(JSON.stringify(sql_result[0]))
  }catch (error) {
    console.log(error)
  }
}
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
/* GET users listing. */
router.get('/home/:typeOfData/:page',(req,res)=>  {

  if(Number(req.params.page)){
    if(req.params.typeOfData==='news'){
      dataGetter(0,0,req,res,req.params.typeOfData);
    }
    if(req.params.typeOfData==='courses'){
      dataGetter(0,0,req,res,req.params.typeOfData);
    }
  }

})
router.get('/search/search=:searchStr',    (req,res)=>{
  searchFunction(req,res,req.params.searchStr)
})
router.get(RegExp('/logo$'),(req,res)=>{
  fileGetter(res,path.join(__dirname,'../public/images/logo.png'),'img');
})
router.get('/giveMeStyle',(req,res)=>{
  fileGetter(res,path.join(__dirname,'../public/stylesheets/style.css'),'text/css').pipe(res);

})
router.get('/next/:typeOfData/:IdNext',(req, res) => {
  nextGetter(req,res)
})
router.get('/block/next/:typeOfData/:IdNext',(req, res) => {
  nextGetter(req,res)
})
router.get('/searchIco',(req,res)=>{
  fileGetter(res,path.join(__dirname,'../public/images/search.png'),'img')
})
router.get('/bundle.js',(req,res)=>{
  fileGetter(res,path.join(__dirname,'../nodeSrc/bundle.js'),'text/javascript').pipe(res)
})
//'C:\\Users\\Вадим\\WebstormProjects\\FilmSile\\dist\\bundle.js'

module.exports = router;
