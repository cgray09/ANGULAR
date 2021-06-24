const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = mongoose.Schema({

    car_id: {type: Schema.Types.ObjectId, ref: 'Car'},
    // the dates have different types bc numbers are easier to compare
    // when we do our logic and the Date's are user friendly
    // (all the same)
    from: Number,
    until: Number,
    fromDate: Date,
    untilDate: Date

});

module.exports = mongoose.model('Reservation', reservationSchema);