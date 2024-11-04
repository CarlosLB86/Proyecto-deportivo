const jwt = require('jsonwebtoken');


const createToken = (user) => {
    const token = jwt.sign(user.id.toString(), 'friskel');
    console.log(user)
    return token;
}



module.exports = createToken
