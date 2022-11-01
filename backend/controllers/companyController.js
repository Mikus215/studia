import mongoose from "mongoose"
import CompanyModel from "../models/companyModel.js"

export const postCreateCompany = async (req, res, next) => {
    const { title, description } = req.body
    const userId = req.user.user._id

    try {

        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ message: 'Nie ma takiego użytkownika z tym ID' })

        if (title.length < 2) return res.status(400).json({ message: "Długość nazwy firmy musi być większa niż 2 znaki" })

        if (description.length < 10) return res.status(400).json({ message: "Minimalna długość opisu firmy to 10 znaków" })

        const isAlreadyExist = await CompanyModel.findOne({ title })

        if (isAlreadyExist) return res.status(400).json({ message: "Nazwa z taką firmą już istnieje" })

        const newCompany = await CompanyModel.create({ creator: userId, title, description })

        res.status(200).json(newCompany)

    } catch (error) {
        res.status(500).json({ message: "Coś poszło nie tak" })
    }
}

export const getCreatorListCompany = async (req, res, next) => {
    const userId = req.user.user._id

    try {

        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ message: 'Nie ma takiego użytkownika z tym ID' })

        const userCompanies = await CompanyModel.find({ creator: userId })

        res.status(200).json(userCompanies)

    } catch (error) {
        res.status(500).json({ message: "Coś poszło nie tak" })
    }
}

export const deleteCompany = async (req, res, next) => {
    const { id } = req.params
    const userId = req.user.user._id

    try {

        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ message: 'Nie ma takiego użytkownika z tym ID' })
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Nie ma takiej firmy z tym ID' })

        const company = await CompanyModel.findById(id);

        if (company.creator !== userId) return res.status(400).json({ message: "Nie masz uprawnień aby usunąć tą firmę, nie należy do ciebie" })

        await CompanyModel.deleteOne(company);

        res.status(202).json({ message: "Pomyślnie usunięto" })
    } catch (error) {
        res.status(500).json({ message: "Coś poszło nie tak" })
    }
}

export const updateCompany = async (req, res, next) => {
    const { id } = req.params
    const { title, description } = req.body
    const userId = req.user.user._id

    const updateCompany = { title: title, description: description }

    try {

        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ message: 'Nie ma takiego użytkownika z tym ID' })
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Nie ma takiej firmy z tym ID' })

        const company = await CompanyModel.findById(id);

        if (company.creator !== userId) return res.status(400).json({ message: "Nie masz uprawnień aby usunąć tą firmę, nie należy do ciebie" })

        await CompanyModel.findByIdAndUpdate(id, updateCompany)

        res.status(200).json({ message: "Pomyślnie uaktualniono" })
    } catch (error) {
        res.status(500).json({ message: "Coś poszło nie tak" })
    }
}

export const getCompanyList = async (req, res, next) => {
    try {

        const companies = await CompanyModel.find()

        res.status(200).json(companies)
    } catch (error) {
        res.status(500).json({ message: "Coś poszło nie tak" })
    }
}

export const postAddCompanyComment = async (req, res, next) => {
    const userId = req.user.user._id
    const userName = req.user.user.name
    const { id } = req.params
    const { comment } = req.body

    try {

        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ message: 'Nie ma takiego użytkownika z tym ID' })
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Nie ma takiej firmy z tym ID' })

        const company = await CompanyModel.findById(id)

        company.comments.push({
            userId,
            comment,
            userName
        })

        await company.save()

        res.status(200).json("Dodano opinie")
    } catch (error) {
        res.status(500).json({ message: "Coś poszło nie tak" })
    }
}

export const addRate = async (req, res, next) => {
    const userId = req.user.user._id
    const { id } = req.params
    const { rate } = req.body

    try {

        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ message: 'Nie ma takiego użytkownika z tym ID' })
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Nie ma takiej firmy z tym ID' })

        const company = await CompanyModel.findById(id)

        const isUserAlreadyAddRate = company.rating.findIndex(el => el.userId === userId)

        if (isUserAlreadyAddRate !== -1) {
            company.rating[isUserAlreadyAddRate].rate = +rate
        } else {
            company.rating.push({
                rate: +rate,
                userId
            })
            company.countRating += 1
        }

        let sumAllRating = 0;

        company.rating.forEach(el => {
            sumAllRating += el.rate
        })

        company.avgRating = sumAllRating / company.countRating

        await company.save()

        res.status(201).json(company)
    } catch (error) {
        res.status(500).json({ message: "Coś poszło nie tak" })
    }
}

export const getSearchedCompany = async (req, res, next) => {
    const { companyName } = req.body

    try {

        const isCompanyExist = await CompanyModel.findOne({ title: companyName })

        if (isCompanyExist) return res.status(200).json([isCompanyExist])

        return res.status(400).json({ message: "Taka firma nie istnieje w bazie danych" })

    } catch (error) {
        res.status(500).json({ message: "Coś poszło nie tak" })
    }
}

export const getPopular = async (req, res, next) => {
    try {

        const sortedCompany = await CompanyModel.find().sort({ "countRating": -1 })

        res.status(200).json(sortedCompany)
    } catch (error) {
        res.status(500).json({ message: "Coś poszło nie tak" })
    }
}

export const getBestComapniesFirst = async (req, res, next) => {
    try {

        const sortedCompany = await CompanyModel.find().sort({ "avgRating": -1 })

        res.status(200).json(sortedCompany)
    } catch (error) {
        res.status(500).json({ message: "Coś poszło nie tak" })
    }
}