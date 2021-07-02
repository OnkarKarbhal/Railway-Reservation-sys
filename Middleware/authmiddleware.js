const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const authVerfication = (req,res,next) => {
        console.log("coo",req.cookies);
        const token = req.cookies.jwt;
        console.log(token);

    //check token web exit 
    if(token){
        jwt.verify(token,'OnkarK', (err,decodedData) => {
            if(err){
                res.status(401).json({ message: "Unauthorized user"}); 
            }
            else{
                //req.serId = decodedData.id;
                //req.userType=decodedData.userType;               
                next()
            }
        })
    }
    else{
        res.status(401).json({ message: "Unauthorized client" }); 
        res.status(205).json({ message: "Please login" })
    }
}

module.exports = authVerfication;
