import UserModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'

export const loginUserValidation = async (req, res, next) => {

    const { email, password } = req.body

    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    
    try {
        const user = await UserModel.findOne({ email })
    
        if (!user) return res.status(404).json({ message: "Użytkownik o tym e-mail nie istnieje" })
    
        if (!emailRegex.test(email)) return res.status(400).json({ message: "Nie poprawny e-mail" })
    
        if (password.length < 5) return res.status(400).json({ message: "Złe hasło, za krótkie" })
    
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
        if (!isPasswordCorrect) return res.status(400).json({ message: "Złe hasło" })

        req.user = user

        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Coś poszło nie tak' })
    }
}