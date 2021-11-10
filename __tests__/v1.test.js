'use strict';

let supertest = require('supertest');
const server = require('../src/server');
const mockReq = supertest(server.server);


let users = {
    admin: { username: 'sana', password: 'sana', role: 'admin' },
    editor: { username: 'raneem', password: 'raneem', role: 'editor' },
    writer: { username: 'munes', password: 'munes', role: 'writer' },  
    user: { username: 'mahmoud', password: 'mahmoud', role: 'user' },
  };


describe('V1 Routes', () => {

  it('can post a new experience item', async() => {
    let obj = { touristName: 'test_experience_1', favFood: "test", favLandmark: 'test',thoughts:"test" };
    let expected = { touristName: 'test_experience_1', favFood: "test", favLandmark: 'test',thoughts:"test" };

    const response = await mockReq.post('/api/v1/experience').send(obj);
    const experienceObject = response.body;

    expect(response.status).toBe(201);
    expect(experienceObject.id).toBeDefined();
    expect(experienceObject.name).toEqual(expected.name)
    Object.keys(expected).forEach(item => {
          expect(experienceObject[item]).toEqual(expected[item])
    });
  });

  it('can get a experience item', async() => {
    let obj ={ touristName: 'test_experience_2', favFood: "test", favLandmark: 'test',thoughts:"test" };
    let expected = { touristName: 'test_experience_2', favFood: "test", favLandmark: 'test',thoughts:"test" };

    const response = await mockReq.post('/api/v1/experience').send(obj);
    const experienceObject = response.body;
    const res = await mockReq.get(`/api/v1/experience/${experienceObject.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toEqual(experienceObject.id);
    Object.keys(expected).forEach(item => {
          expect(res.body[item]).toEqual(expected[item])
    });
  });

  it('can get all experience items', async() => {
    let obj = { touristName: 'test_experience_3', favFood: "test", favLandmark: 'test',thoughts:"test" };
    let obj2 = { touristName: 'test_experience_4', favFood: "test", favLandmark: 'test',thoughts:"test" };

    await mockReq.post('/api/v1/experience').send(obj);
    await mockReq.post('/api/v1/experience').send(obj2);
    const res = await mockReq.get(`/api/v1/experience/`);
    expect(res.status).toBe(200);
    Object.keys(obj).forEach(item => {
          expect(res.body[2][item]).toEqual(obj[item])
    });
    expect(res.body[0].name).toEqual('test_experience_1');
    expect(res.body[1].name).toEqual('test_experience_2');
    expect(res.body[2].name).toEqual('test_experience_3');
    expect(res.body[3].name).toEqual('test_experience_4');
   
  });

  it('can update() a experience item', async() => {
    let obj = { touristName: 'test_experience_5', favFood: "test", favLandmark: 'test',thoughts:"test" };
    let updatedObj = { touristName: 'test_experience_5', favFood: "test", favLandmark: 'test',thoughts:"test" };
    let expected ={ touristName: 'test_experience_5', favFood: "test", favLandmark: 'test',thoughts:"test" };

    const response1 = await mockReq.post('/api/v1/experience').send(obj);
    const response = await mockReq.put(`/api/v1/experience/${response1.body.id}`).send(updatedObj);
    
    expect(response.status).toBe(200);
    
    Object.keys(expected).forEach(item => {
      expect(response.body[item]).toEqual(expected[item])
    });
    
  });

  it('can delete() a experience item', async() => {
    let obj = { touristName: 'test_experience_6', favFood: "test", favLandmark: 'test',thoughts:"test" };
    let expected = { touristName: 'test_experience_6', favFood: "test", favLandmark: 'test',thoughts:"test" };
    const response1 = await mockReq.post('/api/v1/experience').send(obj);
    const response2 = await mockReq.delete(`/api/v1/experience/${response1.body.id}`);
    expect(response2.status).toBe(200);
   
    });
  });