let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");
// import { dir } from "console";

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
// import types from "./utility";
// console.log(inputArr);

// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help

let command = inputArr[0];
switch(command){
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("Please 🙏 correct command");
}

function treeFn(dirPath){
    console.log("Tree command implemented for ", dirPath);
}
function organizeFn(dirPath){
    // 1. intput of idrectory 
    if(dirPath==undefined){
        console.log("Please enter the path");
        return ;
    }
    else{
        let destDir;
        if(fs.existsSync(dirPath)){
            destDir = path.join(dirPath,"organizedFiles");
            if(fs.existsSync(destDir)==false){
                fs.mkdirSync(destDir);
            }
           
        }
        else{
            console.log("Please enter the correct path");
            return ;
        }
        organizeHelper(dirPath, destDir);
    }

    // //3.  make orge dir ont he basis of file.
    // // 4. copy/cut
}
function organizeHelper(src, dest){
    let childNames = fs.readdirSync(src);
    for(let i = 0; i<childNames.length; i++){
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            let category = getCategory(childNames[i]);
            copyPastefile(childAddress, category, dest);
            console.log(childNames[i]+ " belongs to " + category);
        }
    }
    // console.log("organzied funtion called succefully");
}
function copyPastefile(fileaddress, category, dest){
    let newPath = path.join(dest ,category);
    if(fs.existsSync(newPath)==false){
        fs.mkdirSync(newPath);
    }
    let fileName = path.basename(fileaddress);
    let destFilePath = path.join(newPath, fileName);
    fs.copyFileSync(fileaddress, destFilePath);
    // fs.unlinkSync(fileaddress);
}
function getCategory(fileName){
    let ext = path.extname(fileName);
    ext = ext.slice(1);
    for(let key in types) {
        let type = types[key];
        for(let i = 0 ; i< type.length ; i++){
            // console.log(key +"  " + [i]);
            if(ext == type[i]) return key;
        }
    }
    return "others";
}

function helpFn(){
    console.log(`
    List of all commands: 
            node main.js tree "directoryPath"
            node main.js organize "directoryPath"
            node main.js help
    `);
}