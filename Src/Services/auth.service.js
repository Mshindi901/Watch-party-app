const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = class AuthService {
    constructor(authRepo) {
        this.authRepo = authRepo;
    }

    async signUp(data){
        try {
            const { name, email, role = 'user', password } = data;

            if (!name || !email || !password) {
                return { success: false, message: 'Name, email and password are required.' };
            }

            const existingUser = await this.authRepo.findUserByEmail(email);
            if (existingUser) {
                return { success: false, message: 'User already exists.' };
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const createdUser = await this.authRepo.newUser({ name, email, role, password: hashedPassword });

            return { success: true, message: 'User created successfully.' };
        } catch (error) {
            console.error('Error in signUp:', error.message);
            return { success: false, message: 'An error occurred during sign up.' };
        }
    };

    async signIn(data){
        try {
            const { email, password } = data;
            const user = await this.authRepo.findUserByEmail(email);

            if (!user) {
                return { success: false, message: 'User not found.' };
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return { success: false, message: 'Invalid password.' };
            };
            const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return { success: true, token };
        } catch (error) {
            console.error('Error in signIn:', error.message);
            return { success: false, message: 'An error occurred during sign in.' };
        }
    };
};