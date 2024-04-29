require("dotenv").config();

import jwt from "jsonwebtoken"

const createJWT = (payload,key,time) => {
    let token = null;
    try{
        token = jwt.sign(payload, key,{ expiresIn: time });
    }catch(err){
        console.log(err)
    }

    return token
}

const verifyToken = (token) => {
    let key = process.env.JWT_KEY
    let data = null

    try{
        let decoded = jwt.verify(token, key);
        data = decoded
    }catch(err){
        console.log(err)
    }

    return data;
}

module.exports = {
    createJWT, verifyToken
}