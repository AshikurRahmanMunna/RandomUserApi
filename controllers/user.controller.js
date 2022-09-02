const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const userFilePath = path.join(__dirname, "..", "users.json");
const getRandomUser = (users) => {
  const randomNumber = Math.floor(Math.random() * users.length);
  const randomUser = users[randomNumber];
  if (!randomUser) {
    getRandomUser(users);
  } else {
    return randomUser;
  }
};
const parseJsonFromFs = (data) => {
  return JSON.parse(data.toString());
};
module.exports.getARandomUser = (req, res) => {
  fs.readFile(userFilePath, (err, users) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: "Something Went wrong",
      });
    }
    if (users) {
      const parsedUsers = parseJsonFromFs(users);
      const randomUser = getRandomUser(parsedUsers);
      return res.status(200).json({
        success: true,
        user: randomUser,
      });
    }
  });
};

module.exports.getAllUsers = (req, res) => {
  const size = req.query.s;
  fs.readFile(userFilePath, (err, data) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: "Something Went wrong",
      });
    }
    if (data) {
      const parsedUsers = parseJsonFromFs(data);
      const users = size ? parsedUsers.slice(0, size) : parsedUsers;
      return res.status(200).json({
        success: true,
        users,
      });
    }
  });
};

module.exports.saveAUser = async (req, res) => {
  fs.readFile(userFilePath, (err, users) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: "Something Went wrong",
      });
    } else {
      req.body.id = req.body.id ? req.body.id : shortid.generate();
      const parsedUsers = parseJsonFromFs(users);
      parsedUsers.push(req.body);
      const allUsers = JSON.stringify(parsedUsers);
      fs.writeFile(userFilePath, allUsers, (err) => {
        if (err) {
          return res.status(400).json({
            success: false,
            error: "Something Went wrong",
          });
        } else {
          res.status(201).json({
            success: true,
            message: "User Saved Successfully",
          });
        }
      });
    }
  });
};

module.exports.updateUser = (req, res) => {
  fs.readFile(userFilePath, (err, data) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: "Something Went wrong",
      });
    }
    if (data) {
      const users = parseJsonFromFs(data);
      const user = users.find((user) => user.id === req.body.id);
      const updateParamsEntries = Object.entries(req.body);
      for (const key of updateParamsEntries) {
        const param = key[0];
        const value = key[1];
        user[param] = value;
      }
      const updatedUsers = users.map((user) => {
        if (user.id === req.body.id) {
          user = user;
        }
        return user;
      });
      fs.writeFile(userFilePath, JSON.stringify(updatedUsers), (err) => {
        if (err) {
          return res.status(400).json({
            success: false,
            error: "Something Went wrong",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "User Updated Successfully",
          });
        }
      });
    }
  });
};
