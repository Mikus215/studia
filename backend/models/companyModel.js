import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    creator: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    comments: [{
        userId: String,
        comment: String,
        userName: String
    }],
    rating: [{
        rate: Number,
        userId: String
    }],
    countRating: {
        type: Number,
        default: 0
    },
    avgRating: {
        type: Number,
        default: 0.00
    }
})

const CompanyModel = mongoose.model('Company', companySchema)

export default CompanyModel