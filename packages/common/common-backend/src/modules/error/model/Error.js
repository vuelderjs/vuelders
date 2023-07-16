import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const ErrorSchema = mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
    },
    name: {
        type: String,
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
    }
})

ErrorSchema.plugin(mongoosePaginate)

const Error = mongoose.model('Error', ErrorSchema)

export default Error