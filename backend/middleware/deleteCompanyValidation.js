import mongoose from "mongoose"
import CompanyModel from "../models/companyModel.js"

export const deleteCompanyValidation = async(req, res, next) => {
    const { id } = req.params
    const userId = req.user.user._id

    try {

        const company = await CompanyModel.findById(id);

        if (company.creator !== userId) return res.status(401).json({ message: "Nie masz uprawnień aby usunąć tą firmę, nie należy do ciebie" })

        req.company = company
        next()
    } catch (error) {
        res.status(500).json({ message: "Coś poszło nie tak" })
    }
}