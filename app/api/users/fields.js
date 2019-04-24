module.exports = {
  public: [
    'oauth.email',
    'confirmed',
    'email',
    'ra',
    'createdAt'
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
    'email'
  ],
}