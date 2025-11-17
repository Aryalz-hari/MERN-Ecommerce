const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const registerUser = async (req, res) => {

  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({email});
     if(checkUser){
      res.json({
        success: false,
        message:'User already exist with same Email.'
      })
     }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword, // ✅ correct field
    });


    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (e) {
    console.error("Error in registerUser:", e.message);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};
const loginUser = async(req,res)=>{

  const {email, password} = req.body;
  try {
    const checkUser = await User.findOne({email});
    if(!checkUser){
      return res.json({
        success: false,
        message: "User doesn't exist! Please register",
      })
    }
    const checkPasswordMatch = await bcrypt.compare(password , checkUser.password);
    if(!checkPasswordMatch) return res.json({
      success:false,
      message:"Incorrect password! Please try again",
    })
    const token= jwt.sign({
      id:checkUser._id,
      role:checkUser.role,
      email:checkUser.email
    }, 'CLIENT_SECRET_KEY', {expiresIn:'60m'});
     return res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
    });
  } catch (e) {
    console.error("Error in loginUser:", e.message);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }

}
const authMiddleware = async(req,res,next)=>{
  const token= req.cookies.token;
  if(!token) return res.status(401).json({
    success: false,
    message:'Unauthorized user'
  })
  try{
    const decoded=  await jwt.verify(token, 'CLIENT_SECRET_KEY');
    req.user= decoded;
    next()
  }catch(e){
    res.status(401).json({
      success:false,
      message:'Unauthorized user'
    })
  }
} 

const logoutUser=(req,res)=>{
  res.clearCookie('token').json({
    success:true,
    message:'Logged out sucessfully'
  })
}

module.exports = { registerUser , loginUser, logoutUser, authMiddleware};
