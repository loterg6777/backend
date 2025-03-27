const JWT = require('../helpers/jwt');

const autenticarMid = (req, res, next) => {
    
    try{
        const token = req.headers.authorization.replace('Bearer', '').trim()

        // VERIFICA O TOKEN PELO PROPRIO JWT
        JWT.verify(token)

        const decodedToken = JWT.decode(token) // DECODIFICA O TOKEN

        req.decodedToken = decodedToken // Guarda na Request para os Proximos

        next()

    }catch(e) {
        console.log('erro', e)
        // Algo dentro do Try deu uma Exception....
        return res.status(401).send('ACESSO NÃO AUTORIZADO')
    }
}

module.exports = autenticarMid