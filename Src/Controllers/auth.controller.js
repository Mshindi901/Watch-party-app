const AuthRepo = require("../Repositories/auth.repository.js");
const AuthService = require("../Services/auth.service.js");
const {Users} = require("../../models/index.js");

const authRepo = new AuthRepo(Users);
const authService = new AuthService(authRepo);

async function Register(req, res) {
    try {
        const { name, email, password } = req.body;
        const result = await authService.signUp({ name, email, password });

        if (result.success) {
            return res.status(201).json({
                success: true,
                message: result.message
            });
        } else {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error in Register:', error.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred during registration.'
        })
    }
}

async function Login(req, res) {
    try {
        const { email, password } = req.body;
        const result = await authService.signIn({ email, password });

        if (result.success) {
            return res.status(200).json({
                success: true,
                token: result.token
            });
        } else {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        };
    } catch (error) {
        console.error('Error in Login:', error.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred during login.'
        });
    }
}

module.exports = { Register, Login };