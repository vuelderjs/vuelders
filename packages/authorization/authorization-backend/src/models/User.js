import mongoose from 'mongoose'

import mongoosePaginate from 'mongoose-paginate-v2'

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        /**
         * Transforms the given object by moving the `_id` field to `id` field and removing the `_id` field.
         *
         * @param {object} _ - the object to be transformed
         * @param {object} ret - the transformed object
         * @return {void} undefined
         */
        transform: (_, ret) => {
            ret.id = ret._id
            delete ret._id
        }
    }
})

UserSchema.plugin(mongoosePaginate)

const User = mongoose.model('User', UserSchema)


export default User