import express from "express";
import db from "../config.js";

const router = express.Router()

router.get('/getuser',(req,res)=>{


    let query = `SELECT * FROM users`
    db.all(query,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            console.log(row)
            res.send(row)
        }
    })
})  


router.get('/getusers',(req,res)=>{
    let query = `SELECT * FROM users`
    db.all(query,(err,row)=>{
        res.send(row)
    })
})


router.post('/register', (req,res)=>{
   const {username, number} = req.body 
   console.log(username, number)
   let query = `INSERT INTO users(username, phone) VALUES(?,?)`
   db.run(query,[username, number],(err)=>{
    if(err){
        console.log(err)
    }
    else{
        res.send('user created successfully')
    }
    
   })
   
})


export default router