const router = require("express").Router();
const { Doc, validate } = require("../models/doc");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error){
			console.log(req.body);
			return res.status(400).send({ message: error});
		}

		const user = await Doc.findOne({ docName: req.body.docName });
		if (user)
			return res
				.status(409)
				.send({ message: "Document with given name already exists" }); 

		await new Doc({ ...req.body}).save();
		res.status(201).send({ message: "Documet created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;