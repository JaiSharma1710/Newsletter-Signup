const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {

  var firstname = req.body.firstName;
  var lastname = req.body.lastName;
  var email = req.body.email;

var data = {
  members: [
    {
      email_address : email,
      status : "subscribed",
      merge_fields:{
        FNAME : firstname,
        LNAME : lastname
      }
    }
  ]
}

var jasonData = JSON.stringify(data);

const url = "https://us5.api.mailchimp.com/3.0//lists/5995338368"

const option = {
  method : "POST",
  auth : "jai1710:84f0597decc1e8fb262e1b372c5af666-us5"
}

const request = https.request(url,option,function(response){

if(response.statusCode === 200){
  res.sendFile(__dirname + "/success.html");
}else{
  res.sendFile(__dirname + "/failure.html");
}


response.on("data",function(data){
  console.log(JSON.parse(data));
})

})

request.write(jasonData);
request.end();

})

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.post("/success",function(req,res){
  res.redirect("/");
})

app.listen(3000, function() {
  console.log("SERVER IS LIVE AND WORKING");
})


// API KEY
// 84f0597decc1e8fb262e1b372c5af666-us5

// LIST ID
// 5995338368
