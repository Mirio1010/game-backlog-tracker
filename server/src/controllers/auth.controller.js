

const testAuthRoute = (req, res) => {
  res.send("Auth route is working");
};

const registerUser = (req, res) => {
  const { username, email, password } = req.body;

  console.log("Register request body:", req.body);

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email, and password are required",
    });
  }

  res.status(200).json({
    message: "Register data looks valid",
    data: {
      username,
      email,
      password,
    },
  });
};

const loginUser = (req, res) => {
  res.json({ message: "Login route works" });
};

const logoutUser = (req, res) => {
  res.json({ message: "Logout route works" });
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
