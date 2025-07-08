import db from "../config/db.js"




//write a fuction to find a user by email
export const findUserbyEmail=async (email)=>{
    const result=await db.query("SELECT * FROM users WHERE email=$1" , [email]);
    //return the first returned result
    return result.rows[0];
}


//write a function to create a user(insert data into the user)
export const CreateUser=async (email, hashedPassword)=>{
    //insert into the database querry
    const result=await db.query("INSERT INTO users(email,password) VALUES ($1,$2) RETURNING *", 
        [email, hashedPassword]
    );
    return result.rows[0];
}