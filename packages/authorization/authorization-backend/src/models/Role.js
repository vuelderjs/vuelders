import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    permissions: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Permission'
        }
    ]
},{
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        /**
         * Transforms the given object by renaming the "_id" property to "id" and removing the "_id" property.
         *
         * @param {type} _ - the input object
         * @param {type} ret - the transformed object
         */
        transform: (_, ret) => {
            ret.id = ret._id
            delete ret._id
        }
    }
})

const Role = mongoose.model('Role', RoleSchema)

export default Role