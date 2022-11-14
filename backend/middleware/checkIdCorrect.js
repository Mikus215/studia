import mongoose from "mongoose"

export const checkIdCorrect = async(req,res,next) => {
    const userId = req.user.user._id
    const { id } = req.params

    try {

        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ message: 'Nie ma takiego użytkownika z tym ID' })
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Nie ma takiej firmy z tym ID' })

        next()
    } catch (error) {
        res.status(500).json({ message: "Coś poszło nie tak" })
    }
}