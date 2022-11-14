import CompanyModel from "../models/companyModel.js"
import mongoose from "mongoose"

export const registerCompanyValidation = async(req, res, next) => {
    const { title, description } = req.body
    const userId = req.user.user._id

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ message: 'Nie ma takiego użytkownika z tym ID' })

        if (title.length < 2) return res.status(400).json({ message: "Długość nazwy firmy musi być większa niż 2 znaki" })

        if (description.length < 10) return res.status(400).json({ message: "Minimalna długość opisu firmy to 10 znaków" })

        const isAlreadyExist = await CompanyModel.findOne({ title })

        if (isAlreadyExist) return res.status(400).json({ message: "Nazwa z taką firmą już istnieje" })

        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Coś poszło nie tak' })
    }

}