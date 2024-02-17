import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, { // JWT_SECRET -> creates digital signature, userId -> payload
        expiresIn: '15d'
    });

    res.cookie("jwt",token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //ms
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks, this cookie is not accessible by javascript
        sameSite:"strict", //CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateTokenAndSetCookie;