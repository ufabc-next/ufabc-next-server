module.exports = {
  public: [
    'oauth.email'
  ],

  create: [
    // Permissions
    'oauth',
    'confirmed',
  ],

  complete: [
    'ra',
  ],

  update: [
    'ra',
    'email',
    'confirmed',
  ],
}