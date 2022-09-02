const getRandomUser = (users) => {
  const randomNumber = Math.floor(Math.random() * users.length);
  const randomUser = users[randomNumber];
  if (!randomUser) {
    getRandomUser(users);
  } else {
    return randomUser;
  }
};

module.exports = getRandomUser;