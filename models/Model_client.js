const mongoose = require('mongoose') 

const Model_client = new mongoose.Schema({
    name: {
            type: String,
            required: true
},
    email: {
            type: String,
            required: true
}
},
{
timestamps: true,
})


mongoose.model('model_client', Model_client)