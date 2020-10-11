const {sql} = require('./mySqlClass')

const _sql = new sql('127.0.0.1','root','root','parsedate');


/*
select * from parsedate.course  where parsedate.course.nameCourse regexp 'PHP'
 or parsedate.course.typeCourse regexp 'PHP';

select * from parsedate.datafromitworld  where parsedate.datafromitworld.Title regexp 'apple' or  parsedate.datafromitworld.Content regexp 'apple' ;


 */


async function arra  (str,arr){
    //let a = arr[0];
  // let arr1 =
        _sql.sqlQuery(str,arr).then(data=>{console.log(data[0])})
    //let arr2 = _sql.sqlQuery(str,arr)
    //console.log(arr1[0])
    //console.log(arr2[0]);
}
arra("select * from parsedate.datafromitworld  where parsedate.datafromitworld.Title regexp ? or  parsedate.datafromitworld.Content regexp ? ;",['apple','apple'] )
 //   .then(data=>/{
 //       console.log(data[0])
 //   })