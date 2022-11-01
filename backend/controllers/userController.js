import UserModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwk from 'jsonwebtoken'

const emailRegex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

export const postCreateUser = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body

    try {
        const alreadyExistUser = await UserModel.findOne({ email })

        if (alreadyExistUser) return res.status(400).json({ message: "Użytkownik z takim e-mail już istnieje" })

        if (!emailRegex.test(email)) return res.status(400).json({ message: "Nie poprawny e-mail" })

        if (name.length < 3) return res.status(400).json({ message: "Długość nazwy użytkownika musi być większa niż 3 znaki" })

        if (password.length < 5) return res.status(400).json({ message: "Długość hasła musi być większa niż 5 znaki" })

        if (password !== confirmPassword) return res.status(400).json({ messgae: "Hasła różnią się od siebie" })

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwk.sign({ user }, process.env.JWK_TOKEN, { expiresIn: '1h' })

        res.cookie("token", token, { httpOnly: true, sameSite: 'none', secure: true })
        res.status(200).json({ userId: user._id, userName: user.name })

    } catch (error) {
        res.clearCookie("token")
        res.status(500).json({ message: 'Coś poszło nie tak' })
    }
}

export const postLoginUser = async (req, res, next) => {
    const { email, password } = req.body

    try {

        const user = await UserModel.findOne({ email })

        if (!user) return res.status(404).json({ message: "Użytkownik o tym e-mail nie istnieje" })

        if (!emailRegex.test(email)) return res.status(400).json({ message: "Nie poprawny e-mail" })

        if (password.length < 5) return res.status(400).json({ message: "Złe hasło, za krótkie" })

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Złe hasło" })

        const token = jwk.sign({ user }, process.env.JWK_TOKEN, { expiresIn: '1h' })

        res.cookie("token", token, { httpOnly: true, sameSite: 'none', secure: true })
        res.status(200).json({ userId: user._id, userName: user.name })

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