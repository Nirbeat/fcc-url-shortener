// const dns = require('dns');

// async function validateUrl(paramUrl) {

//     let validate = paramUrl.slice(paramUrl.indexOf("w"));

//     if(!validate.startsWith("www.")||paramUrl===""){
//         return {
//             instancia : 'no es formato',
//             error : 'invalid url'}
//     }else{
//         dns.lookup(validate,(err, address, family)=>{
//             if(err){
//                 return err 
//             }
//         })
//     }
// }

// module.exports = { validateUrl}