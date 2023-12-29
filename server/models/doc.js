const mongoose = require("mongoose");
const Joi = require("joi");

const docSchema = new mongoose.Schema({
    docName: { type: String, required: true },
});

const Doc= mongoose.model("doc", docSchema);

const validate = (data) => {
    const schema = Joi.object({
        docName: Joi.string().required().label("Document Name")
    });
    return schema.validate(data);
}

module.exports = { Doc, validate };