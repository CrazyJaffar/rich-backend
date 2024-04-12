const User = require("./models/user");
const bcrypt = require("bcrypt");
const Model = require("./models/model");
const Part = require("./models/part");
const Year = require("./models/year");

const fs = require("fs");
const readline = require("readline");

const createUser = async () => {
  const hashedPassword = await bcrypt.hash("###", 12);
  return new Promise(async (resolve, reject) => {
    let newUser = new User({
      name: "Test User",
      email: "@gmail.com",
      password: hashedPassword,
      activated: true,
      activatedAt: new Date(),
    });
    const res = await newUser.save();
    resolve(res);
    // resolve(hashedPassword);
  });
};

const insertAll = async () => {
  return new Promise(async (resolve, reject) => {
    const fileStream = fs.createReadStream("input.txt");
    let res = [];

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    try {
      for await (const line of rl) {
        console.log(line)
        const resLine = await new Year({ name: line }).save();
        res.push(resLine);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
    resolve(res);
  });
};

const seed = async () => {
  try {
    // console.log(process.env.NODEMAILER_EMAIL, process.env.NODEMAILER_PASSWORD);
    // console.log(await (await User.find({})).length)
    // const resultUser = await createUser();
    // console.log("done");
    // console.log(resultUser);

    // await Year.deleteMany({}).exec();
    // const result1 = await Year.find({}).exec();
    // const result = await insertAll();
    // console.log(result);
    // console.log(result.length);
    // console.log(result1.length);
  } catch (error) {
    console.log(error);
  }
};
module.exports = seed;
