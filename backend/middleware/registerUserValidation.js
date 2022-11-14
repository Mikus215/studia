import UserModel from "../models/userModel.js"

export const registerUserValidation = async (req, res, next) => {

    const { name, email, password, confirmPassword } = req.body

    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

    try {

        const alreadyExistUser = await UserModel.findOne({ email })

        if (alreadyExistUser) return res.status(400).json({ message: "Użytkownik z takim e-mail już istnieje" })

        if (!emailRegex.test(email)) return res.status(400).json({ message: "Nie poprawny e-mail" })

        if (name.length < 3) return res.status(400).json({ message: "Długość nazwy użytkownika musi być większa niż 3 znaki" })

        if (password.length < 5) return res.status(400).json({ message: "Długość hasła musi być większa niż 5 znaki" })

        if (password !== confirmPassword) return res.status(400).json({ messgae: "Hasła różnią się od siebie" })

        next() 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Coś poszło nie tak' })
    }

   
}