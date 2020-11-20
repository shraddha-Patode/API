const http =require('http');
var request= require('request');
const dotenv = require('dotenv').config();
const address= process.argv[2]
//const city='London';
var today=new Date()
var day=today.getDate();
//var month=today.getMonth()+1
//var yr=today.getFullYear()
const PORT=process.env.PORT || 3000
function getPrime(n){
    if (n==1) {
        return false;
    }
    
    else if (n==2) {
        return true
    }
    else{
        var sqrt = Math.sqrt(n);
        for (var x=2;x<=sqrt;x++){
            if (n%x==0) {
                return false
            }
        }
        return true
    }   
}

 var server=http.createServer(function(req,response){
    if (!address){
        return response.write('please enter the name of the city while run the nodejs code..');
    }
 
 request.get({url : `http://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${process.env.API_KEY}`
 }
    ,(err,res,body)=>{
        if (getPrime(day)==true){
     const data=JSON.parse(JSON.stringify(body));

     response.writeHead(200,{"content-type":"application/json"}) 
    response.write(data)    
    response.end()
        }
        else{
            response.write('Date is not prime so no Date')
                response.end()

        }
 })

})
 server.listen(PORT)



