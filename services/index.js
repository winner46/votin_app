const path = require('path');
const fs = require('fs')
const baseDir = path.join('_dirname', '../parties');

class inecService {

    // utlities
    readDirectory () {
        const files  = fs.readdirSync(baseDir);
        return files  
    }

    filesExits (_filename) {
        const files = this.readDirectory();
        const found = files.find((filename) => filename === _filename);
        if(!found) {
            return false
        }else {
            return true
        }
    }

    createVote (name, data) {
        let res;
        const isFound = this.filesExits(name);
        const dirLength = this.readDirectory().length
        if(dirLength < 3){
            if(isFound === false) {

                const filepath = path.join('_baseDir, name');
                fs.appendFileSync('filepath, data,' ,'utf-8')
                    
                        res = "Party created successfully"
                 
            }else {
                res = "Party already exists"
            }
        }else{
            res = "Maximum number of Parties reached"
        }

        return res
    };

    getAllVotes () {
        const filesContents = [];
        const files  = this.readDirectory();
        files.forEach(function(file) {
            const filePath = path.join(baseDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            
            const fullFile = `${file} : ${fileContent}`
            filesContents.push(fullFile)
        });
        console.log(filesContents)
        return filesContents
    }

    getOneVote (_filename) {
       const isFound = this.filesExits(_filename);
       if(isFound) {
        const filePath = path.join(baseDir, _filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return fileContent
       }else {
        return "File not found"
       }
    }

    deleteOneVote (_filename) {
        const isFound = this.filesExits(_filename);
        if(isFound){
            const filePath = path.join(baseDir, _filename);
            fs.unlinkSync(filePath);
            return "file deleted successfully"
        }else {
             return "File not found"
            }
     }
     updateVote (_filename){
        const isFound = this.filesExits(_filename);
        if(isFound){
            const filePath = path.join(baseDir, _filename);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const file_json = JSON.parse(fileContent);
            file_json.vote += 1;
            const file_string = JSON.stringify(file_json)
            fs.writeFileSync(filePath, file_string, 'utf-8')
                
                    return "File Updated Successfully"
                
                
         
           
        }else{
            return "File Not Found"
        }
     }

 

};


const vote = new inecService()
module.exports = vote