const mongoose = require("mongoose");
const Joi = require("joi");

const docSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
});

const Doc= mongoose.model("fileNames", docSchema);


const validate = (data) => {
    const schema = Joi.object({
        fileName: Joi.string().required().label("Document Name"),
    });
    return schema.validate(data);
}

module.exports = { Doc, validate };