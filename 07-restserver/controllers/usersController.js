const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

//Models
const User = require("../models/user");

async function getUsers(req = request, res = response) {
  let { limit = 5, skip = 0 } = req.query;
  const query = { state: true };

  limit = isNaN(limit) ? 5 : limit;
  skip = isNaN(skip) ? 0 : skip;

  //Runs at the same time these promises
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).limit(Number(limit)).skip(Number(skip)),
  ]);

  res.json({
    message: "GET API - CONTROLLER",
    total,
    users,
  });
}

async function postUsers(req = request, res = response) {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, role });

  //Password encryptation
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //Save user
  await user.save();

  res.status(201);
  res.json({
    message: "POST API - CONTROLLER",
    user,
  });
}

async function populateUsers(req = request, res = response) {
  let result = [];

  //Truncate user's collection data
  await User.deleteMany({});

  const salt = bcryptjs.genSaltSync();

  for (let i = 1; i <= 10; i++) {
    let password = bcryptjs.hashSync(`user${i}`, salt);

    let user = new User({
      name: `Test User ${i}`,
      email: `test${i}@email.com`,
      password,
      role: "USER_ROLE",
    });

    await user.save();

    result.push(user);
  }

  return res.status(201).json({
    message: "POST: POPULATE",
    result,
  });
}

async function putUsers(req = request, res = response) {
  const { id } = req.params;
  const { password, google, email, _id, ...rest } = req.body;

  if (password) {
    //Password encryptation
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json({
    message: "PUT API - CONTROLLER",
    updatedUser,
  });
}

async function deleteUsers(req = request, res = response) {
  const { id } = req.params;

  //Full delete Not reccommended
  // const user = await User.findByIdAndDelete(id);

  //Logic delete
  const user = await User.findByIdAndUpdate(id, { state: false });

  const authUser = req.authUser;

  res.json({
    message: "DELETE USER API - CONTROLLER",
    user,
    authUser,
  });
}

function patchUsers(req = request, res = response) {
  res.json({
    message: "PATCH API - CONTROLLER",
  });
}

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  patchUsers,
  populateUsers,
};
