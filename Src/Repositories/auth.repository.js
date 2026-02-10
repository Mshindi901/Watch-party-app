class AuthRepo {
    constructor(userModel) {
        this.User = userModel;
    }

    async newUser ({ name, email, role, password }) {
        const user = await this.User.create({
            name,
            email,
            role,
            password
        });
        return user;
    }

    async findUserByEmail (email) {
        const user = await this.User.findOne({ where: { email } });
        return user;
    }
}

module.exports = AuthRepo;