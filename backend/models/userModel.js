import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isModerator: {
        type: Boolean,
        require: true,
        default: false
    }
})

const UserModel = mongoose.model("User", userSchema)

export default UserModel