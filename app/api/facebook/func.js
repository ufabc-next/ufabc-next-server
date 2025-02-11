const app = require("@/app");

module.exports = async (context) => {
  const { ra, email } = context.body;

  // Find user by RA first
  const user = await app.models.users.findOne({ ra, 'oauth.facebook': { $exists: true } });

  if (!user) {
    throw new Error('User does not exist');
  }

  const userEmails = [
    user.oauth?.emailFacebook,
    user.oauth?.email,
  ].filter(Boolean);

  if (!userEmails.includes(email)) {
    throw new Error('Email does not match the registered email for this RA');
  }

  // Generate JWT token only if email matches
  return {
    token: user.generateJWT()
  };
};
