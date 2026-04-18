const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Temporary fake database
const users = [];

const testAuthRoute = (req, res) => {
  res.send("Auth route is working");
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Register request body:", req.body);

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email, and password are required",
    });
  }

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "A user with this email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password: hashedPassword,
  };

  users.push(newUser);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login request body:", req.body);

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET || "temporary_secret_key",
    {
      expiresIn: "1h",
    },
  );

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
};

const logoutUser = (req, res) => {
  res.json({ message: "Logout successful" });
};

const getCurrentUser = (req, res) => {
  res.json({ message: "Current user route works" });
};

module.exports = {
  testAuthRoute,
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};
