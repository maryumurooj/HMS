//Controllers/UserContrillor.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

class UserController {
  // User Registration
  static async register(req, res) {
    try {
      const { username, email, password, role } = req.body;

      // 1. Added role validation
      const validRoles = ["admin", "doctor", "nurse", "receptionist"];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role specified" });
      }

      // 2. Enhanced user existence check
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (existingUser) {
        return res.status(400).json({
          message:
            existingUser.email === email
              ? "Email already registered"
              : "Username already taken",
        });
      }

      // 3. Improved password hashing
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 4. Create user with role
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
      });

      // 5. Generate JWT with role information
      const token = jwt.sign(
        {
          id: newUser.id,
          username: newUser.username,
          role: newUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      // 6. Enhanced response
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during registration",
        error: error.message,
      });
    }
  }

  // User Login
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      // 1. Enhanced user lookup
      const user = await User.findOne({
        where: {
          [Op.or]: [
            { username },
            { email: username }, // Allow login with email too
          ],
        },
      });

      // 2. Better error messages
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // 3. Password verification
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // 4. Generate JWT with role
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      // 5. Enhanced response
      res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during login",
        error: error.message,
      });
    }
  }

  // Token Validation
  static async validateToken(req, res) {
    try {
      const token = req.body.token || req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token provided",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if user still exists
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({
        success: true,
        isValid: true,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        isValid: false,
        message: "Invalid token",
      });
    }
  }

  // Get User Role
  static async getUserRole(req, res) {
    try {
      const token = req.body.token || req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token provided",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({
        success: true,
        role: user.role,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
        error: error.message,
      });
    }
  }
}

module.exports = UserController;
