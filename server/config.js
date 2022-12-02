import sqlite from 'sqlite3'


const  db = new sqlite.Database('./chat.io.db')

let userTable = `
    CREATE TABLE IF NOT EXISTS users(
        username text,
        phone number
    )
`
db.run(userTable,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('table created successfully')
    }
})

export default db