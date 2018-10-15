const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const moment = require('moment');

const { app } = require('../../../server');
const Folder = require('../../../models/Folder');

const { testFolders, populateFolders } = require('../../seed/seed');

beforeEach(done => populateFolders(done));

describe('POST /api/folders', () => {
  it('should add new folder and return it', done => {
    const body = {
      name: 'to-dos'
    };

    request(app)
      .post('/api/folders')
      .send(body)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.name).toBe(body.name);
        expect(res.body._id).toBeTruthy();
        expect(res.body.childFolders).toBeTruthy();
        expect(res.body.childNotes).toBeTruthy();
        expect(res.body.lastUpdated).toBeTruthy();

        Folder
          .find({})
          .then(folders => {
            expect(folders).toHaveLength(testFolders.length + 1);
            done();
          })
          .catch(err => done(err));
      });
    });

    it('should add new childFolder to parent folder', done => {
      const parentId = testFolders[0]._id;
      const body = {
        name: 'child',
        parentId
      };

      // get current parent folder's lastUpdated 
      let formerLastUpdated;
      Folder
        .findById(parentId)
        .then(parentFolder => {
          formerLastUpdated = parentFolder.lastUpdated;

          request(app)
            .post('/api/folders')
            .send(body)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);

              expect(res.body.name).toBe(body.name);
              expect(res.body._id).toBeTruthy();
              expect(res.body.childFolders).toBeTruthy();
              expect(res.body.childNotes).toBeTruthy();
              expect(res.body.lastUpdated).toBeTruthy();

              Folder
                .findById(body.parentId)
                .then(parentFolder => {
                  expect(parentFolder).toBeTruthy();
                  expect(parentFolder.childFolders).toHaveLength(1);
                  expect(parentFolder.childFolders[0].folderId.toString()).toBe(res.body._id);
                  expect(parentFolder.childFolders[0].name).toBe(res.body.name);
                  expect(moment(parentFolder.lastUpdated).isAfter(formerLastUpdated)).toBeTruthy();
                  done();
                })
                .catch(err => done(err));
            });
        });      
    });
  });

  describe('GET /api/folders/:id', () => {
    it('should return a folder', done => {
      request(app)
        .get(`/api/folders/${testFolders[0]._id}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body._id).toBe(testFolders[0]._id.toString());
          expect(res.body.name).toBe(testFolders[0].name);
          done();
        });
    });

    it('should return a 404 if no matching folder with id', done => {
      request(app)
        .get(`/api/folders/${ObjectID()}`)
        .expect(404, done);
    });
  });

  describe('PATCH /api/folders/:id', () => {
    it('should update parent folder when updating child folder and return modified folders', done => {
      // create new child folder and add it to parent data through POST route
      const parentId = testFolders[0]._id;
      let formerLastUpdated;
      Folder
        .findById(parentId)
        .then(parentFolder => {
          formerLastUpdated = parentFolder.lastUpdated;

          const newFolder = { name: 'childFolder', parentId };
          request(app)
            .post('/api/folders')
            .send(newFolder)
            .end((err, res) => {
              if (err) return done(err);

              const childFolder = res.body;
              const childFolderLastUpdated = childFolder.lastUpdated;
              const updates = { name: 'updated child folder name', color: '#FFFFFF' };
              request(app)
                .patch(`/api/folders/${childFolder._id}`)
                .send(updates)
                .expect(200)
                .end((err, res) => {
                  if (err) return done(err);

                  expect(res.body.folder).toBeTruthy();
                  expect(res.body.folder.name).toBe(updates.name);
                  expect(res.body.folder.color).toBe(updates.color);
                  expect(res.body.parentFolders).toHaveLength(1);
                  expect(res.body.parentFolders[0]._id).toBe(res.body.folder.parentId);

                  Folder 
                    .findById(childFolder.parentId)
                    .then(parentFolder => {
                      expect(parentFolder.childFolders).toHaveLength(1);
                      expect(parentFolder.childFolders[0].name).toBe(updates.name);
                      expect(moment(parentFolder.childFolders[0].lastUpdated).isAfter(childFolderLastUpdated)).toBeTruthy();
                      expect(moment(parentFolder.lastUpdated).isAfter(formerLastUpdated)).toBeTruthy();
                      done();
                    })
                    .catch(err => done(err));
                })
          });
        });
    });

    it('should update parentless folder, returning updated folder and no parent folders', done => {
      const timeAtStartOfTest = Date.now();
      const updates = { name: 'roots', color: '#123456' };
      request(app)
        .patch(`/api/folders/${testFolders[0]._id}`)
        .send(updates)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body.folder).toBeTruthy();
          expect(res.body.folder.name).toBe(updates.name);
          expect(res.body.folder.color).toBe(updates.color);
          expect(moment(res.body.folder.lastUpdated).isAfter(timeAtStartOfTest)).toBeTruthy();
          expect(res.body.parentFolders).toHaveLength(0);
          done();
        });
    });

    it('should update parent folder when updating child folder and return modified folders', done => {
      // create new child folder and add it to parent data through POST route
      const timeAtStartOfTest = Date.now();
      const parentId = testFolders[0]._id;
      const newFolder = { name: 'childFolder', parentId };

      request(app)
        .post('/api/folders')
        .send(newFolder)
        .end((err, res) => {
          if (err) return done(err);

          const childFolder = res.body;
          const updates = { parentId: testFolders[1]._id };
          request(app)
            .patch(`/api/folders/${childFolder._id}`)
            .send(updates)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);

              expect(res.body.folder).toBeTruthy();
              expect(res.body.folder.parentId).toBe(updates.parentId.toString());
              expect(res.body.parentFolders).toHaveLength(2);
              const prevParent = res.body.parentFolders.find(parentFolder => parentFolder._id === parentId.toString());
              const currentParent = res.body.parentFolders.find(parentFolder => parentFolder._id === updates.parentId.toString());
              expect(prevParent).toBeTruthy();
              expect(currentParent).toBeTruthy();
              expect(prevParent.childFolders.find(prevChildFolder => prevChildFolder.folderId === childFolder._id)).toBeFalsy();
              expect(currentParent.childFolders.find(currentChildFolder => currentChildFolder.folderId === childFolder._id)).toBeTruthy();

              Promise.all([
                Folder 
                  .findById(childFolder.parentId)
                  .then(oldParentFolder => {
                    expect(oldParentFolder.childFolders.find(prevChildFolder => prevChildFolder.folderId.equals(childFolder._id))).toBeFalsy();
                    expect(moment(oldParentFolder.lastUpdated).isAfter(timeAtStartOfTest)).toBeTruthy();
                    return Promise.resolve();
                  }),
                Folder
                  .findById(updates.parentId)
                  .then(newParentFolder => {
                    expect(newParentFolder.childFolders.find(newChildFolder => newChildFolder.folderId.equals(childFolder._id))).toBeTruthy();
                    expect(moment(newParentFolder.lastUpdated).isAfter(timeAtStartOfTest)).toBeTruthy();
                    return Promise.resolve();
                  })
              ])
              .then(() => done())
              .catch(err => done(err));
            });
        });
    });
  });

  describe('DELETE /api/folders/:id', () => {
    it('should delete Folder and remove self as childFolder from its parent Folder', done => {
      const parentId = testFolders[0]._id;

      const newFolder = { name: 'childFolder', parentId };
      request(app)
        .post('/api/folders')
        .send(newFolder)
        .end((err, res) => {
          if (err) return done(err);
          
          const newFolderId = res.body._id;
          request(app)
            .delete(`/api/folders/${newFolderId}`)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);

              Promise.all([
                Folder
                  .find({})
                  .then(folders => {
                    expect(folders).toHaveLength(testFolders.length);
                  }),
                Folder
                  .findById(parentId)
                  .then(parentFolder => {
                    expect(parentFolder.childFolders.some(childFolder => childFolder.folderId.equals(newFolderId))).toBeFalsy();
                  })
              ])
              .then(() => done())
              .catch(err => done(err));
            });
        });
    });

    it('should recursively delete all child folders as well', done => {
      const grandparentId = testFolders[0]._id;
      const numChildren = Math.ceil(Math.random() * 3);
      let numGrandchildren = Math.ceil(Math.random() * numChildren);
      const totalChildren = numChildren + numGrandchildren;
      let totalChildrenAdded = 0;

      const requests = [];

      for (let i = 0; i < numChildren; i++) {
        requests.push(new Promise((resolve, reject) => {
          let parentId = grandparentId;
          let newFolder = { parentId }; 
          request(app)
            .post('/api/folders')
            .send(newFolder)
            .end((err, res) => {
              if (err) return reject(err);
              totalChildrenAdded++;

              if (numGrandchildren) {
                parentId = res.body._id;
                newFolder = { parentId };
                request(app)
                  .post('/api/folders')
                  .send(newFolder)
                  .end(err => { 
                    if (err) return reject(err); 
                    numGrandchildren--;
                    totalChildrenAdded++;
                    return resolve();
                  });
              } else {
                return resolve();
              }
            });
        }));
      }

      Promise
        .all(requests)
        .then(() => {
          Folder 
            .find({})
            .then(folders => {
              // test that population was successful
              expect(folders).toHaveLength(testFolders.length + totalChildrenAdded);
              
              request(app)
                .delete(`/api/folders/${grandparentId}`)
                .expect(200)
                .end((err, res) => {
                  if (err) return done(err);
                  Folder 
                    .find({})
                    .then(folders => {
                      expect(folders).toHaveLength(testFolders.length - 1);
                      done();
                    })
                });
            })
            .catch(err => done(err));
        })
        .catch(err => done(err));
    });
  })