const supertest = require('supertest');
const User = require('../models/user');
const mongoose = require('mongoose');
const app = require('../app');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');
const api = supertest(app);






describe('Validation new user', () => {
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('Creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'warevalo',
      password: 'sekret',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('username and password are required and min 3 long', async () => {

    const usersAtStart = await helper.usersInDb();

    const wrongUsers = [
      {
        password: helper.modelUser.password
      },
      {
        username: helper.modelUser.username
      },
      {
        username: 'wa',
        password: helper.modelUser.password
      },
      {
        username: helper.modelUser.username,
        password: 'se'
      }
    ];

    const promiseArray = wrongUsers.map( async (wrongUser) => {
      return api
        .post('/api/users')
        .send(wrongUser)
        .expect(400);
    });

    const result = await Promise.all(promiseArray);
    result.forEach((result) => {
      expect(result.body.error).toBeDefined();
    });

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

});






afterAll(() => {
  mongoose.connection.close();
});
