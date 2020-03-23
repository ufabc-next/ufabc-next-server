module.exports = {
  public: [
    '_id',
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