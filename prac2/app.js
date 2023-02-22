

const http = require("http");
const url = require("url"); 
const path = require("path"); 
const fs = require("fs"); 



function serve(FilePath, port) {

let filetext = fs.readFileSync(FilePath, 'utf8');


let fileJson;
fs.readFile('JSON.txt', (err, data) => {
    
    fileJson = JSON.parse(data);
    console.log(fileJson);
});

 let server = new http.Server(); 

 server.listen(port); 

 console.log("Listening on port", port);


 server.on("request", (request, response) => {
   
    let endpoint = url.parse(request.url).pathname;
    
    if (endpoint === "/name") {
        response.setHeader("Content-Type", "application/json");
    
        response.writeHead(200);

        response.write(fileJson.name);
        response.end();
        console.log(fileJson.name);
     

    }
    else if (endpoint === "/age") {
        response.setHeader("Content-Type", "application/json");
    
        response.writeHead(200);

        response.write(fileJson.age);
        response.end();
        console.log(fileJson.age);
     

    }
    else if (endpoint === "/gender") {
        response.setHeader("Content-Type", "application/json");
    
        response.writeHead(200);

        response.write(fileJson.gender);
        response.end();
        console.log(fileJson.gender);
     

    }
    else if (endpoint === "/all") {
        response.setHeader("Content-Type", "application/json");
    
        response.writeHead(200);

        response.write(JSON.stringify(fileJson));
        response.end();
        console.log(fileJson);
     

    }
    
    
    
    else {
        response.setHeader("Content-Type", "application/json");
    
        response.writeHead(200);
        response.write("to check HW add to the end of link:\n1)/name\n2)/age\n3)gender\n4)/all");
        response.end();
    
    }
 });
}

serve("text.txt",8000);