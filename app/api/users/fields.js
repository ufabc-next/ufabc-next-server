module.exports = {
  public: [
    'oauth',
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