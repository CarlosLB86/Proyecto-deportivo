const jwt = require('jsonwebtoken');
const { selectWithId } = require('../models/api/users.model');

exports.checkToken = async (req, res, next) => {
    // Comprobar si el token viene en la cabecera
    const token = req.headers['authorization'];
    if (!req.headers['authorization']) {
        return res.status(403).json({
            message: 'It is mandatory to include the autorization token'
        })
    }
    // Comprobar si el token es correcto
    let data;
    try {
        data = jwt.verify(token, 'friskel');

    } catch (error) {
        return res.status(403).json({ message: 'The authorization token is incorrect' });
    }
    // Recuperar al usuario
    const user = await selectWithId(data);
    // El usuario no existe
    if (!user) {
        return res.status(403).json({ message: 'The user does not exist' });
    }
    req.user = user;
    next();

}
