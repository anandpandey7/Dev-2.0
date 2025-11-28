const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const { z } = require("zod");

const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);

function signJwt(username, password){
    const usernameValidation = emailSchema.safeParse(username);
    const passwordValidation = passwordSchema.safeParse(password);
    if (!usernameValidation.success || !passwordValidation.success) {
        return null;
    }
    
    const signature = jwt.sign({username},jwtPassword);
    return signature; 
}
 
function verifyJwt(token){
    try {
        const verified = jwt.verify(token, jwtPassword);
        return true;
    } catch (error) {
        return false;
    }
}

function decodeJwt(token){
    const decoded = jwt.decode(token);
    if(decoded && typeof decoded === 'object' && 'username' in decoded){
        return true;
    }
    else{
        return false;
    }
}