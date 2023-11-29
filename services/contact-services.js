const Contact = require("../models/Contact");
const userServiceWrapper =
  require("../utils/decorators/user-service-wrapper").default;

const getAllService = async (req) => {
  const { id } = req.user;
  const { page = 1, limit = 20, ...filters } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    { owner: id, ...filters },
    "-updatedAt -createdAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email");
  return contacts;
};

const getByIdService = userServiceWrapper(
  async (_id, owner) =>
    await Contact.findOne({ _id, owner }, "-updatedAt -createdAt").populate(
      "owner",
      "email"
    )
);

const addService = async (req) => {
  const owner = req.user._id;
  const contact = await Contact.create({ ...req.body, owner });
  return contact;
};

const removeService = userServiceWrapper(
  async (_id, owner) => await Contact.findOneAndDelete({ _id, owner })
);

const updateService = userServiceWrapper(
  async (_id, owner, body) =>
    await Contact.findOneAndUpdate({ _id, owner }, body)
);

module.exports = {
  getAllService,
  getByIdService,
  addService,
  removeService,
  updateService,
};
