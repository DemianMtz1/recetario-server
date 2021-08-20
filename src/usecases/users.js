const User = require('../models/users');
const bcrypt = require('../lib/bcrypt');
const jwt = require('../lib/jwt');

function getAll() {
    return User.find({});
}

function getById(id) {
    return User.findById(id)
}

function getByUsername(username) {
    return User.find({ username });
}

function getByToken(token) {
    const user = jwt.decode(token);
    return User.findById(user.id);
}

async function signUp({ firstName, lastName, avatar, email, username, password, role }) {
    if (!firstName || !lastName || !email || !password || !role) throw new Error('Invalid request please check all the empty fields')

    let userFound = await User.findOne({ email });

    if (userFound && userFound.email) throw new Error('Email is already exists')

    userFound = await User.findOne({ username });
    
    if (userFound && userFound.username) throw new Error('Username is already exists')

    const encriptedPassword = await bcrypt.hash(password);

    return User.create({ firstName, lastName, avatar, email, username, password: encriptedPassword, role })

}

async function signIn(email, password) {
    const userFounded = await User.findOne({ email });
    if (!userFounded.email) throw new Error('Invalid credentials, please validate')
    const isSamePassword = await bcrypt.compare(password, userFounded.password);
    if (!isSamePassword) throw new Error('Invalid credentials, please validate')

    return jwt.sign({
        id: userFounded._id
    })
}

function deleteById(id) {
    return User.findByIdAndDelete(id)
}

async function updateById(id, dataToChange) {
    if (dataToChange.password) {
        const encriptedPassword = await bcrypt.hash(dataToChange.password);
        dataToChange.password = encriptedPassword;
    }
    return User.findByIdAndUpdate(id, dataToChange);
}

module.exports = {
    getAll,
    getById,
    getByUsername,
    getByToken,
    signUp,
    signIn,
    deleteById,
    updateById
}