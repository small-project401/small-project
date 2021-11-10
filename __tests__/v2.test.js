'use strict';

let supertest = require('supertest');
const server = require('../src/server');
const mockReq = supertest(server.server);


let users = {
  admin: { username: 'sanaAdmin', password: '0000', role: 'admin' },
  editor: { username: 'sanaEditor', password: '0000', role: 'editor' },
  writer: { username: 'sanaWriter', password: '0000', role: 'writer' },  
  user: { username: 'sanaUser', password: '0000', role: 'user' },
};




describe('V2 Routes', () => {
  xit('admin can post a new experience item', async() => {
    const responseToken = await mockReq.post('/signin').auth('admin', 'password');
    const token = responseToken.body.token;
    let obj = { touristName: 'test_experience_1', favFood: "test", favLandmark: 'test',thoughts:"test" };
    let expected ={ touristName: 'test_experience_1', favFood: "test", favLandmark: 'test',thoughts:"test" };

    const response = await mockReq.post('/api/v2/experience').send(obj).set('Authorization', `Bearer ${token}`)
    const experienceObject = response.body;

    expect(response.status).toBe(201);
    expect(experienceObject.id).toBeDefined();
    expect(experienceObject.name).toEqual(expected.name)
    Object.keys(expected).forEach(item => {
          expect(experienceObject[item]).toEqual(expected[item])
    });
  });

  xit('admin can get a experience item', async() => {
    const response1 = await mockReq.post('/signin').auth('admin', 'password');
    const token = response1.body.token;
    let obj = { touristName: 'test_experience_2', favFood: "test", favLandmark: 'test',thoughts:"test" };
    let expected ={ touristName: 'test_experience_2', favFood: "test", favLandmark: 'test',thoughts:"test" };

    const response2 = await mockReq.post('/api/v2/experience').send(obj).set('Authorization', `Bearer ${token}`);
    const experienceObject = response2.body;
    const res = await mockReq.get(`/api/v2/experience/${experienceObject.id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toEqual(experienceObject.id);
    Object.keys(expected).forEach(item => {
          expect(res.body[item]).toEqual(expected[item])
    });
  });


  xit('admin can get all experience items', async() => {
    const responseToken = await mockReq.post('/signin').auth('admin', 'password');
    const token = responseToken.body.token;

    let obj = { touristName: 'test_experience_3', favFood: "test", favLandmark: 'test',thoughts:"test" };;
    let obj2 = { touristName: 'test_experience_4', favFood: "test", favLandmark: 'test',thoughts:"test" };;

    await mockReq.post('/api/v2/experience').send(obj).set('Authorization', `Bearer ${token}`);
    await mockReq.post('/api/v2/experience').send(obj2).set('Authorization', `Bearer ${token}`);
    const res = await mockReq.get(`/api/v2/experience`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    Object.keys(obj).forEach(item => {
          expect(res.body[2][item]).toEqual(obj[item])
    });
    expect(res.body[0].name).toEqual('test_experience_1');
    expect(res.body[1].name).toEqual('test_experience_2');
    expect(res.body[2].name).toEqual('test_experience_3');
    expect(res.body[3].name).toEqual('test_experience_4');
   
  });

  it('admin can update() a experience item', async() => {
    const responseToken = await mockReq.post('/signin').auth('admin', 'password');
    const token = responseToken.body.token;

    let obj ={ touristName: 'test_experience_2', favFood: "test", favLandmark: 'test',thoughts:"test" };
    let updatedObj = { touristName: 'test_experience_2', favFood: "test", favLandmark: 'test',thoughts:"test" };
    let expected = { touristName: 'test_experience_2', favFood: "test", favLandmark: 'test',thoughts:"test" };

    const response1 = await mockReq.post('/api/v1/experience').send(obj).set('Authorization', `Bearer ${token}`);
    const response = await mockReq.put(`/api/v1/experience/${response1.body.id}`).send(updatedObj).set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    
    Object.keys(expected).forEach(item => {
      expect(response.body[item]).toEqual(expected[item])
    });
    
  });

  it('admin can delete() a experience item', async() => {
    const responseToken = await mockReq.post('/signin').auth('admin', 'password');
    const token = responseToken.body.token;

    let obj = { touristName: 'test_experience_2', favFood: "test", favLandmark: 'test',thoughts:"test" };
    let expected = { touristName: 'test_experience_2', favFood: "test", favLandmark: 'test',thoughts:"test" };

    const response1 = await mockReq.post('/api/v1/experience').send(obj).set('Authorization', `Bearer ${token}`);
    const response2 = await mockReq.delete(`/api/v1/experience/${response1.body.id}`).set('Authorization', `Bearer ${token}`);

    expect(response2.status).toBe(200);
 
  });

});