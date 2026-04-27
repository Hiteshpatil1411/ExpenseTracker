const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//Register User
const fs = require("fs");
const path = require("path");

exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  // Helper to clean up orphaned image
    const deleteUploadedImage = () => {
        if (profileImageUrl) {
            const filename = profileImageUrl.split("/uploads/")[1];
            if (filename) {
                const filePath = path.join(__dirname, "../uploads", filename);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
        }
    };

  //VAlidate input
  if (!fullName || !email || !password) {
    deleteUploadedImage();
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    //check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      deleteUploadedImage();
      return res.status(400).json({ message: "Email already in use" });
    }

    //Create new user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    deleteUploadedImage();
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server errror ,Please try again later" });
    
  }
};

//Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if(!email|| !password){
    return res.status(400).json({message: "Please enter your credentials"})
  }
  try{
       const user = await User.findOne({ email }).select("+password");

        
        const isMatch = user && (await user.comparePassword(password));
        if (!user || !isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })
    }
    catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error, please try again later" });
    
};
}

//Get Users User
exports.getUserInfo = async (req, res) => {
  try{
    const user = await User.findById(req.user.id)
    if(!user){
      return res.status(404).json({message: "User not found"})
    }
    res.status(200).json(user)


  }
  catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Server error" });
  }
};
