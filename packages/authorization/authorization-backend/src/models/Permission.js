import mongoose from 'mongoose'

const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        /**
         * Transforms the given object by modifying the "id" and "_id" properties.
         *
         * @param {Object} _ - placeholder parameter
         * @param {Object} ret - the object to be transformed
         * @return {void}
         */
        transform: (_, ret) => {
            ret.id = ret._id
            delete ret._id
        }
    }
})

const Permission = mongoose.model('Permission', PermissionSchema)

export default Permission