module.exports = {
  public: [
    'oauth',
    'confirmed',
    'email',
    'ra',
    'createdAt',
    'devices'
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