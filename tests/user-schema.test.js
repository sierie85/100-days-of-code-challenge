const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
const User = require('../models/User');

describe('Test Userschema', () => {

  beforeAll(async () => {
    mongoose.connect(process.env.DATABASE);
    mongoose.Promise = global.Promise;
    mongoose.connection.on('error', err => { console.error('Error connecting to database', err);});
  });

  afterAll(async () => {
    mongoose.disconnect();
  });

  it('should create a user with email and password', async () => {
    const user = new User({email: 'user@test.com'});
    await user.setPassword('password');
    await user.save();
    expect(user._id).toBeDefined();
  });

  it('should find the created user', async () => {
    const user = await User.findOne({email: 'user@test.com'});
    expect(user).not.toBeNull();
  });

  it('should delete the created user', async () => {
    const user = await User.remove({email: 'user@test.com' });
    const getRemovedUser = await User.findOne({email: 'user@test.com'});
    expect(getRemovedUser).toBeNull();
  });

});
