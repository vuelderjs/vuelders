import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    completeName: {
        type: String,
        required: false,
        unique: false
    },
    dateBirth: {
        type: Date,
        required: false,
        unique: false
    },
    phone: {
        type: String,
        required: false,
        unique: false
    },
    role: {
        type: String,
        enum: ['ADMIN', 'PREMIUM_USER', 'COMMON_USER'],
        required: false,
        unique: false
    }
}, {timestamps: true})

const User = mongoose.model('User', UserSchema)

export default User