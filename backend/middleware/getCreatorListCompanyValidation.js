import mongoose from "mongoose"

export const getCreatorListCompanyValidation = async(req, res, next) => {
    const userId = req.user.user._id

    try {

        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ message: 'Nie ma takiego użytkownika z tym ID' })

        next()
    } catch (error) {
        res.status(500).json({ message: "Coś poszło nie tak" })
    }
}