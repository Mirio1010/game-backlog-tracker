const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabaseClient");

const testAuthRoute = (req, res) => {
  res.send("Auth route is working");
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("Register request body:", req.body);

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email, and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase();

    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("id, email")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existingUserError) {
      console.error("Error checking existing user:", existingUserError);
      return res.status(500).json({
        message: "Error checking existing user",
      });
    }

    if (existingUser) {
      return res.status(400).json({
        message: "A user with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert({
        username,
        email: normalizedEmail,
        password_hash: hashedPassword,
      })
      .select("id, username, email")
      .single();

    if (insertError) {
      console.error("Error creating user:", insertError);
      return res.status(500).json({
        message: "Error creating user",
      });
    }

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      message: "Server error during registration",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login request body:", req.body);

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase();

    const { data: user, error } = await supabase
      .from("users")
      .select("id, username, email, password_hash")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (error) {
      console.error("Error finding user:", error);
      return res.status(500).json({
        message: "Error logging in",
      });
    }

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

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
      process.env.JWT_SECRET,
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
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error during login",
    });
  }
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
