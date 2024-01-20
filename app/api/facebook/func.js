const app = require("@/app");

module.exports = async (context) => {
  const { ra, email } = context.body;

  const user = await app.models.users.findOne({
    ra,
    $or: [{ "oauth.facebookEmail": email }, { "oauth.email": email }],
  });

  if (!user) {
    throw new Error("User does not exists");
  }

  return {
    token: user.generateJWT(),
  };
};
