//***************** */
// Puerto
//***************** */

process.env.PORT = process.env.PORT || 3000


//***************** */
// entornp
//***************** */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



//***************** */
// base de datos
//***************** */

let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';

}else{
    urlDB = 'mongodb+srv://dev:MVZIvhl7ekewztXm@cluster0-bcb3g.mongodb.net/cafe';

}

process.env.URLDB = urlDB;

