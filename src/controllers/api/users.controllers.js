const { CreateNewOrganizator, selectWithId, getByUserName } = require("../../models/api/users.model")
const bcrypt = require('bcryptjs');
const createToken = require('../../utils/createToken');
const CreateOrganizator = async (req, res, next) => {
    const { username } = req.body;
    try {
        const user = await getByUserName(username);
        if (user) {  // Si el user ya existe error
            return res.status(409).json({ message: 'El usuario ya existe' })
        }
    } catch (error) {
        next(error);
    }
    let password = req.body.password;
    password = await bcrypt.hash(password, 10);
    req.body.password = password;
    try {
        const newUser = await CreateNewOrganizator(req.body);
        if (newUser === 0) { // si newUser es igual a 0, error, no se ha creado
            return res.status(500).json({ message: 'No se ha podido crear el usuario' });
        }
        res.json({ message: `usuario ${username} creado` });
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    const { username } = req.body;
    const { password } = req.body;

    try {
        const user = await getByUserName(username);
        const passwordAreCorrect = await bcrypt.compare(password, user.password)
        if (!user) {
            return res.status(500).json({ message: 'No se ha podido crear el usuario' });
        }
        const token = createToken(user);
        res.json({ message: token })
    } catch (error) {

    }
}

module.exports = { CreateOrganizator, loginUser }