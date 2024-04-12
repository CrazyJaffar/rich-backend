const Part = require("../models/part");
const Model = require("../models/model");
const Year = require("../models/year");
const nodemailer = require("nodemailer");

/**********************************
  Check if user is admin
***********************************/
exports.createModel = async (req, res) => {
  try {
    const { name } = req.body;
    const createdModel = await new Model({ name }).save();
    res.json(createdModel);
  } catch (error) {
    console.log(error);
    if (error.code == 11000)
      return res.status(400).send("Model name already used");
    res.status(400).send(error);
  }
};

exports.createYear = async (req, res) => {
  try {
    const { name } = req.body;
    const createdYear = await new Year({ name }).save();
    res.json(createdYear);
  } catch (error) {
    console.log(error);
    if (error.code == 11000)
      return res.status(400).send("Year name already used");
    res.status(400).send(error);
  }
};

exports.createPart = async (req, res) => {
  try {
    const { name } = req.body;
    const createdPart = await new Part({ name }).save();
    res.json(createdPart);
  } catch (error) {
    console.log(error);
    if (error.code == 11000)
      return res
        .status(400)
        .send("Name is already used for the particular model");
    res.status(400).send(error);
  }
};

exports.loadYearsModelsParts = async (req, res) => {
  try {
    const allYears = await Year.find({});
    const allModels = await Model.find({});
    const allParts = await Part.find({});
    res.json({ years: allYears, models: allModels, parts: allParts });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.deleteModel = async (req, res) => {
  try {
    const { mid } = req.params;
    const deletedModel = await Model.findByIdAndDelete(mid);
    res.json("Deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.deleteYear = async (req, res) => {
  try {
    const { yid } = req.params;
    const deletedModel = await Year.findByIdAndDelete(yid);
    res.json("Deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.deletePart = async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedModel = await Part.findByIdAndDelete(pid);
    res.json("Deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.sendMail = async (req, res) => {
  try {
    const { contact, values } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    // Configure the message
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: ["richdogpartlocator@gmail.com"],
      bcc: ["Oceanauto21@gmail.com"],
      subject: "New Leads from" + contact.name,
      html: `<h1>Details:-</h1>
        <h3>Year: ${values.year}</h3>
        <h3>Make/Model: ${values.model}</h3>
        <h3>Part: ${values.part}</h3>
        <h2>CONTACT INFO:</h2>
        <h3>Name: ${contact.name}</h3>
        <h3>Email: ${contact.email}</h3>
        <h3>Phone Number: ${contact.phone}</h3>
        <h3>Zip Code: ${contact.zip}</h3>
        <br />
        <br />
        <br />
        <p>
        Note: This email and all of the information within is property of the direct recipient only and may not be distributed or shared with any other party.The recipient also is bound by richdogpartlocator.us LLC terms of service.Violators will be permanently removed from our services.
        </p>
    `,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(400).send("Could not send mail");
      } else {
        console.log("Email sent: " + info.response);
        res.json(true);
      }
    });
  } catch (error) {
    console.log(error);
    if (error.code == 11000)
      return res.status(400).send("Year name already used");
    res.status(400).send(error);
  }
};
