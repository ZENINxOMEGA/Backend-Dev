const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.use(express.json());

const filePath = path.join(__dirname, 'users.json');

app.post('/users/register',(req,res)=>{

    const {name, branch} = req.body;

    if(!name || !branch){
        return res.status(400).json({message:"Name and Branch are required"});
    }

    fs.readFile(filePath,'utf8',(err,data)=>{
        if(err){
            return res.status(500).json({message:"Error reading file"});
        }

        let users = [];

        try{
            users = JSON.parse(data || '[]');
        }catch{
            users = [];
        }

        const newStudent = {    
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            name,
            branch,
            subjects: []  
            };


        users.push(newStudent);

        fs.writeFile(filePath, JSON.stringify(users, null, 2),(err)=>{
            if(err){
                return res.status(500).json({message:"Error writing file"});
            }

            res.status(201).json({
                message:"Student registered successfully",
                student:newStudent
            });
        });
    });
});


// GEt Method to fetch all users
app.get('/users/:id',(req,res)=>{

    const userId = Number(req.params.id);

    fs.readFile(filePath,'utf8',(err,data)=>{
        if(err){
            return res.status(500).json({message:"Error reading file"});
        }

        let users = [];

        try{
            users = JSON.parse(data || '[]');
        }catch{
            users = [];
        }

        // find user
        const student = users.find(u => u.id === userId);

        if(!student){
            return res.status(404).json({
                message:"Student not found"
            });
        }

        res.json(student);
        console.log("Fetched Student:", student);
    });

});


// PUt method to update user
app.put('/users/:id',(req,res)=>{  
    const userId = Number(req.params.id); // URL se id le rahe hain (string → number)
    const {name, branch} = req.body; // body se updated fields le rahe hain

    fs.readFile(filePath,'utf8',(err,data)=>{ // users.json read kar rahe hain
        if(err){
            return res.status(500).json({message:"Error reading file"}); // file read fail
        }

        let users = [];
        try{
            users = JSON.parse(data || '[]'); // JSON ko array me convert
        }catch{
            users = []; // agar file corrupt ho to crash na kare
        }

        const studentIndex = users.findIndex(u => u.id === userId); // user ka index find

        if(!name && !branch){ // agar kuch update bheja hi nahi
            return res.status(400).json({
                message:"Send at least one field to update"
            });
        }

        if(studentIndex === -1){ // user exist nahi karta
            return res.status(404).json({
                message:"Student not found"
            });
        }

        if(name) users[studentIndex].name = name; // sirf name aaye to name update
        if(branch) users[studentIndex].branch = branch; // sirf branch aaye to branch update

        fs.writeFile(filePath, JSON.stringify(users, null, 2),(err)=>{ // updated data file me save
            if(err){
                return res.status(500).json({message:"Error writing file"}); // write fail
            }

            res.json({
                message:"Student updated successfully", // success response
                student:users[studentIndex] // updated student return
            });

            console.log("Updated Student:", users[studentIndex]); // console log for debugging
        });
    });
});

// Delete 
app.delete('/users/:id',(req,res)=>{

    const userId = Number(req.params.id); // URL se id le rahe hain

    fs.readFile(filePath,'utf8',(err,data)=>{ // file read
        if(err){
            return res.status(500).json({message:"Error reading file"});
        }

        let users = [];

        try{
            users = JSON.parse(data || '[]'); // string → array
        }catch{
            users = []; // crash prevent
        }

        const studentIndex = users.findIndex(u => u.id === userId); // user find

        if(studentIndex === -1){ // agar user nahi mila
            return res.status(404).json({
                message:"Student not found"
            });
        }

        const deletedStudent = users.splice(studentIndex,1); 
        // splice → array se user remove (IMPORTANT 🔥)

        fs.writeFile(filePath, JSON.stringify(users, null, 2),(err)=>{ // updated array save
            if(err){
                return res.status(500).json({message:"Error writing file"});
            }

            res.json({
                message:"Student deleted successfully",
                student: deletedStudent[0] // deleted user return
            });
        });

    });

});



app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
});