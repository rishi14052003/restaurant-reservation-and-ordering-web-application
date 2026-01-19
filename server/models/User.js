class User {
  constructor() {
    this.users = []; // In-memory storage (in production, use database)
    this.userIdCounter = 1;
  }

  // Create a new user
  create(userData) {
    const user = {
      id: this.userIdCounter++,
      name: userData.name,
      email: userData.email,
      password: userData.password, // Should be hashed before calling this method
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.users.push(user);
    return user;
  }

  // Find user by email
  findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  // Find user by ID
  findById(id) {
    return this.users.find(user => user.id === id);
  }

  // Get all users (for admin purposes)
  findAll() {
    return this.users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
  }

  // Check if email exists
  emailExists(email) {
    return this.users.some(user => user.email === email);
  }

  // Get user count
  getCount() {
    return this.users.length;
  }
}

module.exports = new User();
