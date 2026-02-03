const fs =require("fs");

//1-copy file from source to destination using async(update)
/*fs.copyFile("test.txt","new_test.txt",(err)=>{
    if(err){
        console.log("Error copying file: ",err);
    }else{
        console.log("File Coping success");
    }
});
//2- using sync
fs.copyFileSync("test.txt","new_test.txt"); //test->source file or new_test.txt -> destination file 
console.log("file copy successfully using async");*/



//1-Delete a file using async
/*fs.unlink("new_test.txt",(err)=>{
    if(err){
        console.log("Error deleting file: ",err);
    }else{
        console.log("Delete file successfully");
    }
});
//2-Delete a file using sync
fs.unlinkSync("new_test.txt");
console.log("Delete file successfully");*/


// 1- Create a file using async
/*fs.writeFile("new_test.txt", "Hello, this is a new file!", (err) => {
    if (err) {
        console.log("Error creating file: ", err);
    } else {
        console.log("File created successfully using async");
    }
});
//2- Create file using sync
fs.writeFile("new_test.txt", "Hello, this is a new file!");
console.log("File created successfully using async");*/



// 1- Read a file using async
fs.readFile("new_test.txt", "utf8", (err, data) => {
    if (err) {
        console.log("Error reading file: ", err);
    } else {
        console.log("File content (async):");
        console.log(data);
    }
})
// 2-Read file using sync
try {
    console.log(fs.readFileSync("new_test.txt", "utf8"));
} catch (err) {
    console.log("Error reading file: ", err);
}
