const http = require("http");
const inec = require("./services");
const url = require("url");

const server = http.createServer(function(req, res){
    if(req.method  === 'POST' && req.url === '/create'){
        let body = '';
        req.on('data', function(data){
            body += data.toString();
        });
  
        req.on('end', function() {
            const result = JSON.parse(body);
            const vote = {
                candidate_name: result.candidate_name,
                vote: result.vote
            
            }
            if(result.candidate_name == "" || result.vote == ""){
                res.writeHead(400, {"Content-Type": "text/plain"});
                res.end("Bad Request : All Fields required");
                return;
            }
            const response = inec.createVote(`${result.name}.json`, JSON.stringify(vote))
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end(response)
        })
    }
    else if(req.method === 'GET' && req.url === '/getAllParties'){
        const files = inec.getAllVotes();      
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify({
            Parties: files
        }))
    }
    else if(req.method === 'GET' && req.url === '/'){        
            const files = inec.getAllVotes();      
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify({
                inec: files
            }))
    }
  
  
    else if (req.method === 'GET' && req.url.includes('/getOneParty')) { 
            const {query} = url.parse(req.url, true);
            const filename = query.file_name;
            const result = inec.getOneVote(filename);
            res.end(result)
    }
  
    else if (req.method === 'DELETE' && req.url.includes('/delete')) {                
        const {query} = url.parse(req.url, true);
        const filename = query.file_name;
        const result = inec.deleteOneVote(filename);
        res.end(result)
    }
    else if (req.method === 'PUT' && req.url.includes('/update')) {                
        const {query} = url.parse(req.url, true);
        const filename = query.file_name;
        const result = inec.updateVote(filename);
        res.end(result)
    }else if(req.method === "GET" && req.url === '/hello'){
        res.end("HELLO FILE")
    }
    else {
        res.statusCode = 404
        res.end('Page Not Found')
    }



});

server.listen(5000, () => {
  console.log('listening on port 5000')
})


