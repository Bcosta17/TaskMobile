const getToken = (req) => {
    console.log(req.headers.authorization);
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1] // criar um array e pegar o segundo elemento
    return token
}

export default getToken
