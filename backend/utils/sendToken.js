const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {

    const options = {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
        httpOnly: true,
        sameSite: "none",
        secure:true
    }
    const token = jwt.sign({ id: user._id }, 'secret')
    console.log(token)
    res.cookie('token', token, options);
    res.status(statusCode).json({
        success: true,
        user,
        token,
    });


}

module.exports = sendToken;