const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//Register User
exports.registerUser = async (req, res) => {
  const { fullname, email, password, profileImageUrl } = req.body;

  //VAlidate input
  if (!fullname || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    //check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    //Create new user
    const user = await User.create({
      fullname,
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
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Please provide all required fields" });
    
  }
};

//Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if(!email|| !password){
    return res.status(400).json({message: "Enter Cridencial"})
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
    res.status(500).json({ message: "Please provide all required fields" });
    
};
}

//Get Users User
exports.getUsersInfo = async (req, res) => {};
