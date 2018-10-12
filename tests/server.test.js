// const expect = require('expect');
// const request = require('supertest');

// const { app } = require('../server');
// const Sample = require('../models/Sample');

// const { testSamples, populateSamples } = require('./seed/seed');

// beforeEach(() => populateSamples());

// describe('GET /api/samples', () => {
//   it('should return samples', (done) => {
//     request(app)
//       .get('/api/samples')
//       .expect(200)
//       .expect(res => expect(res.body.length).toBe(testSamples.length))
//       .end(done);
//   });
// });

// describe('POST /api/samples', () => {
//   it('should add a sample', (done) => {
//     const sample = { name: 'sample' }
//     request(app)
//       .post('/api/samples')
//       .send(sample)
//       .expect(200)
//       .expect(res => {
//         expect(res.body.name).toEqual(sample.name);
//         expect(res.body._id).toBeTruthy();
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }

//         Sample.find({}).then(samples => {
//           expect(samples.length).toBe(testSamples.length + 1);
//           done();
//         }).catch(err => done(err));
//       });
//   });

//   it('should return validation errors if request invalid', (done) => {
//     const sample = { bill: 'bob' };
//     request(app)
//       .post('/api/samples')
//       .send(sample)
//       .expect(400)
//       .end((err, res) => {
//         Sample.find({}).then(samples => {
//           expect(samples.length).toBe(testSamples.length);
//           done();
//         });
//       });
//   });
// });

// describe('DELETE /api/samples', () => {
//   it('should delete a sample', (done) => {
//     request(app)
//       .delete(`/api/samples/${testSamples[1]._id}`)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         Sample.find({}).then(samples => {
//           expect(samples.length).toBe(testSamples.length - 1);
//           done();
//         }).catch(err => done(err));
//       });
//   });
// });
