import jwk from 'jsonwebtoken'

export const cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwk.verify(token, process.env.JWK_TOKEN)
        req.user = user;
        next()
    } catch (error) {
        console.log(error);
        res.clearCookie("token")
        res.status(401).json({ message: 'Do komentowania lub założenia firmy na portalu musisz się zalogować, zarejestrować' })
    }
}