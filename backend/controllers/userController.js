import UserModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwk from 'jsonwebtoken'

export const postCreateUser = async (req, res, next) => {
    const { name, email, password } = req.body

    try {

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwk.sign({ user }, process.env.JWK_TOKEN, { expiresIn: '1h' })

        res.cookie("token", token, { httpOnly: true, sameSite: 'none', secure: true })
        res.status(201).json({ userId: user._id, userName: user.name, isModerator: user.isModerator })

    } catch (error) {
        res.clearCookie("token")
        res.status(500).json({ message: 'Coś poszło nie tak' })
    }
}

export const postLoginUser = async (req, res, next) => {

    try {

        const user = req.user

        const token = jwk.sign({ user }, process.env.JWK_TOKEN, { expiresIn: '1h' })

        res.cookie("token", token, { httpOnly: true, sameSite: 'none', secure: true })
        res.status(200).json({ userId: user._id, userName: user.name, isModerator: user.isModerator })

    } catch (error) {
        console.log(error);
        res.clearCookie("token")
        res.status(401).json({ message: 'Złe hasło' })
    }
}

export const deleteCookieLogout = (req, res, next) => {
    res
        .status(202)
        .clearCookie("token").json({ message: 'Clear Cookie' })
}