const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const authVerfication = (req,res,next) => {
        const token = req.cookies.token;
        console.log(token);
        console.log('Welcome middle');

    //check token web exit 
    // if(token){
    //     jwt.verify(token,'OnkarK', (err,decodedData) => {
    //         if(err){
    //             res.status(401).json({ message: "Unauthorized user"}); 
    //         }
    //         else{
    //             req.userId = decodedData.id;
    //             req.userType=decodedData.usertype;               
    //             next()
    //         }
    //     })
    // }
    // else{
    //     res.status(401).json({ message: "Unauthorized client" }); 
    //     //res.status(205).json({ message: "Please login" })
    // }
}

module.exports = authVerfication;
