const parseJsonFromFs = (data) => {
  return JSON.parse(data.toString());
};

module.exports = parseJsonFromFs;