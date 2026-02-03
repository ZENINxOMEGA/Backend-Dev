const fs=require("fs");
const path=require("path");
const { Transform } = require("stream");

const inputFilePath=path.join(__dirname,"input.txt");
const transformOutputFilePath=path.join(__dirname,"transformOutput.txt");
const readStream=fs.createReadStream(inputFilePath,"utf-8");
const writeStream=fs.createWriteStream(transformOutputFilePath);

//transform stream to data to uppercase
const upperCaseTranform=new Transform({
    transform(chunk,encoding,callback){
        const transformedData=chunk.toString().toUpperCase();//transform data to uppercase
        this.push(transformedData);//transformed data aage bhej diya (in writestream)
        callback();//ready for next chunk 
    }
})

readStream.pipe(upperCaseTranform).pipe(writeStream);
  
  