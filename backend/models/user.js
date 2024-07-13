const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');

const userSchema = {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
};

class User {
  constructor(db) {
    this.collection = db.collection('users');
  }

  async createUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, password: hashedPassword };
    const result = await this.collection.insertOne(user);
    return result.ops[0];
  }

  async findUserByEmail(email) {
    return await this.collection.findOne({ email });
  }

  async findUserById(id) {
    return await this.collection.findOne({ _id: new ObjectID(id) });
  }

  async comparePassword(enteredPassword, hashedPassword) {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  }
}

module.exports = User;
