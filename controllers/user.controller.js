const fs = require("fs");
const path = require("path");
const shortid = require("shortid");
const getRandomUser = require("../utilities/getRandomUser");
const parseJsonFromFs = require("../utilities/parseJsonFromFs");

const userFilePath = path.join(__dirname, "..", "users.json");
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

module.exports.bulkUpdate = async (req, res) => {
  for (const singleUpdate of req.body) {
    fs.readFile(userFilePath, (err, data) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: "Something Went wrong",
        });
      }
      if (data) {
        const users = parseJsonFromFs(data);
        const user = users.find((user) => user.id === singleUpdate.id);
        const updateEntries = Object.entries(singleUpdate);
        for (const entry of updateEntries) {
          const key = entry[0];
          const value = entry[1];
          user[key] = value;
        }
        users.map((u) => {
          if (u.id === user.id) {
            u = user;
          }
        });
        // fs.writeFile(userFilePath, stringified, (err) => {
        //   if (err) {
        //     return res.status(400).json({
        //       success: false,
        //       error: "Something Went wrong",
        //     });
        //   }
        // });

        // i was written this code but unfortunately this is adding some extra bracket pairs at the end of the json file. Please consider it.
      }
    });
  }
  res.status(200).json({
    success: true,
    message: "Updated Successfully",
  });
};

module.exports.deleteUser = (req, res) => {
  fs.readFile(userFilePath, (err, data) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: "Something Went wrong",
      });
    }
    if (data) {
      const users = parseJsonFromFs(data);
      const usersAfterRemove = users.filter((user) => user.id !== req.body.id);
      fs.writeFile(userFilePath, JSON.stringify(usersAfterRemove), (err) => {
        if (err) {
          return res.status(400).json({
            success: false,
            error: "Something Went wrong",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "User deleted successfully",
          });
        }
      });
    }
  });
};
