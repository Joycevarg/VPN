var http = require('http');
var request=require('request');

function extractHostname(url) {
  var hostname="";

  if (url.indexOf("//") > -1) {
      hostname = url.split('/')[2];
  }
  else {
      hostname = url.split('/')[0];
  }

  hostname = hostname.split(':')[0];
  hostname = hostname.split('?')[0];
  if((hostname.toString().indexOf(".com")>-1))
  return hostname;
  else 
  return null;
}

var curhost="";

http.createServer(function (requ, resp) {

  try{
  var fin = requ.url.substring(1);
  var host=extractHostname(fin);
  if(host==null)
  {
    fin="https://"+curhost+"/"+fin;
  }
  else
  {
    console.log("her");
    curhost=host;
  }
  console.log("host is "+curhost.toString());
  console.log(fin);
  request(fin.toString(), function (error, response, body) {
  //   console.log('error:', error); // Print the error if one occurred
  //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //   console.log('body:', body); // Print the HTML for the Google homepage.
    try{
    resp.write(body);
    resp.end();}
    catch(e)
    {

    }
  });}
  catch(e)
  {
    console.log(e);
  }
  // resp.write("rel");
  // resp.end();
  }).listen(8090);