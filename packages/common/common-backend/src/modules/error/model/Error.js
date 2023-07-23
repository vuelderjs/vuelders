import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const ErrorSchema = mongoose.Schema({
    author: {
        type: String,
        required: true,
        unique: false
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    errorCode: {
        type: String,
        required: true,
        unique: false
    },
    statusCode: {
        type: Number,
        required: true,
        unique: false
    },
    message: {
        type: String,
        required: true,
        unique: false
    },
    stack: {
        type: String,
        required: true,
        unique: false
    },
    status: {
        type: String,
        enum: ['UNRESOLVED', 'FIXING', 'RESOLVED'],
        required: true,
        unique: false,
        default: 'UNRESOLVED'
    }
})

ErrorSchema.plugin(mongoosePaginate)

const Error = mongoose.model('Error', ErrorSchema)

export default Error