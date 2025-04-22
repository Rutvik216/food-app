const testUserController = (req, resp) => {
  try {
    return resp.status(200).send("<h1> this is completed</h1>");
  } catch (error) {
    console.log("error in test API", error);
  }
};

module.exports = { testUserController };
