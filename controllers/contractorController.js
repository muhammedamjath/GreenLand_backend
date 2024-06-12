const { default: mongoose } = require("mongoose");
const componyRegCollection = require("../models/componyRegister");

// compony registration post
exports.componyReg = async (req, res) => {
  const userId = req.user;
  const filLocatione = req.file.location;
  const { componyName, location, category, discription } = req.body;

  let componyReg = new componyRegCollection({
    componyName: componyName,
    location: location,
    category: category,
    discription: discription,
    image: filLocatione,
    contractorId: new mongoose.Types.ObjectId(userId),
  });

  await componyReg.save();

  res.status(200).json("success");
};
