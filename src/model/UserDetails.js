const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        enum: ['Regular', 'developer'],
        default: 'Regular'
    },
    token: {
        type: String
    },
    dateTime: {
        type: Date,
        default: Date.now
    },
    profile: {
        type: String  // This could be a URL or other profile-related information
    }
});

UserDetailsSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

const User = mongoose.model('User', UserDetailsSchema);
module.exports = User;
