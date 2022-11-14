

export const checkIsModerator = async (req, res, next) => {
    const isModerator = req.user.user.isModerator

    try {

        if(isModerator === false) return res.status(401).json({message: "Nie masz uprawnień. Tylko moderator może edytować, usuwać, tworzyć firmy."})
        
        next()
    } catch (error) {
        res.status(500).json({ message: "Coś poszło nie tak" })
    }
}