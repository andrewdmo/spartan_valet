import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const coordSchema = new Schema({
    firstName:  String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    workDate: { type: Date, default: Date.now },
    currentRole: String,
    hidden: Boolean,
    currentCoords: {
        lat: Number,
        lng: Number
    },
    initialCoords: {
        lat: Number,
        lng: Number
    },
    previousCoords: {
        initialCoords: {lat: Number, lng: Number},
        previousCoords: [{lat: Number, lng: Number}]
    }
});

export default mongoose.model('coords', coordSchema);