const mongoose = require("mongoose")

const Sweet = new mongoose.Schema({
owner: {
type: mongoose.Schema.Types.ObjectId,
ref: 'User'
},
content: {
type: String,
required: true,
min: 1
},
likes: [{
type: mongoose.Schema.Types.ObjectId,
ref: 'User'
}]
}, {
timestamps: true
}
)

module.exports = mongoose.model("Sweet", Sweet)