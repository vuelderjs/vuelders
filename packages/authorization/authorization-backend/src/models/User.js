import mongoose from 'mongoose'

import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value){
                return /^[A-Za-z0-9]+$/.test(value)
            },
            message: props => `${props.value} is not a valid username.`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value){
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
            },
            message: props => `${props.value} is not a valid email.`
        }
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    completeName: {
        type: String,
        required: false,
        unique: false,
        validate: {
            validator: function(value){
                return /^[A-Za-z\s]+$/.test(value)
            },
            message: props => `${props.value} is not a valid complete name.`
        }
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
        ref: 'Role',
        required: false,
        unique: false
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