const JWT = require('jsonwebtoken');

const JWT_SECRET = 'j2Ph7lnmqt19Yxf5mwi8JQ0%4H5MHQc3SZrDZH41y%2X4ysjJJ'

const sign = (payload) => JWT.sign(payload, JWT_SECRET)
const verify = (token) => JWT.verify(token, JWT_SECRET)
const decode = (token) => JWT.decode(token, JWT_SECRET)

module.exports = {
    sign,
    verify,
    decode
}