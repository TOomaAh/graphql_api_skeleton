const jsonwebtoken = require('jsonwebtoken');
const { expressjwt: jwt } = require("express-jwt");
const bcrypt = require('bcrypt');
require('dotenv').config();

const privateKey = process.env.JWT_PRIVATE_KEY;


// auth middleware
export const auth = jwt({
    secret: privateKey,
    algorithms: ["HS256"],
    credentialsRequired: false
});

export const generate = (user_id : number, username: string, role_id: number) => {
    return jsonwebtoken.sign({id : user_id, username:  username, role: role_id}, privateKey, {expiresIn: '1y'});
};

export const verify = (token: string) => {
    token = token.replace('Bearer ', '');
    return jsonwebtoken.verify(token, privateKey, {algorithms: ["HS256"]}, (err: any, decoded: any) => {
        if (err) {
            throw new Error("Invalid token");
        }
        return decoded;
    });
}

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}