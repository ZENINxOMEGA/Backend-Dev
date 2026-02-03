const fs = require("fs");

//  new directory bnane ke liye 
// fs.mkdir("newDirectory", (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log("newDirectory created");
// });

//Nested directories banane ke liye (recursive:true se midle value folder/f1/f2 bhi bn jayenge)
// fs.mkdir("folders/folder1/folder2", { recursive: true }, (err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("Directory is created");
// });

//kisi directory ko read krne ke liye (uske under ke file /folder dekhne ke liye)
// fs.readdir("newDirectory", (err,files) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("directory read",files);
// });

// kisi directory ki delte krne ke liye ||rmdir(tb use kret jab empty folder delete krna ho )||rm(folder ke under se file ho tb use krte h)
fs.rmdir("newDirectory",(err) =>{
    if (err) {
        console.log(err);
        return;
    }
    console.log("directory delete");
}); 