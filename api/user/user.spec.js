const app = require('../../');
const request = require('supertest');
const should = require('should');

describe('GET /users는', () => {
  describe('성공시', () => {
    it('유저를 배열로 응답한다.', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });

    it('최대 limit 갯수 만큼 응답한다.', (done) => {
      request(app)
        .get('/users')
        .query({ limit: 2 })
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe('실패시', () => {
    it('limit이 숫자가 아니면 400을 응답한다.', (done) => {
      request(app)
        .get('/users')
        .query({ limit: 'abc' })
        .expect(400, done);
    });
  });
});

describe('GET /users/:id 는', () => {
  describe('성공시', () => {
    it('id가 1인 유저를 반환한다.', (done) => {
      request(app)
        .get('/users/1')
        .end((err, res) => {
          res.body.should.have.property('id', 1);
          done();
        });
    });
  });

  describe('실패시', () => {
    it('id가 숫자가 아닐경우 400으로 응답한다.', (done) => {
      request(app)
        .get('/users/a')
        .expect(400, done);
    });

    it('id로 유저를 찾을 수 없을 경우 404로 응답한다.', (done) => {
      request(app)
        .get('/users/999')
        .expect(404, done);
    });
  });
});

describe('DELETE /users/:id 는', () => {
  describe('성공시', () => {
    it('204를 응답한다.', (done) => {
      request(app)
        .delete('/users/1')
        .expect(204, done);
    });
  });

  describe('실패시', () => {
    it('id가 숫자가 아닌 경우 400을 응답한다.', (done) => {
      request(app)
        .delete('/users/a')
        .expect(400, done);
    });
  });
});

describe('POST /users 는', () => {
  describe('성공시', () => {
    const name = 'cmlee';
    let responseBody;

    before(done => {
      request(app)
        .post('/users')
        .send({ name: name })
        .expect(201)
        .end((err, res) => {
          responseBody = res.body;
          done();
        });
    });

    it('생성된 유저 객체를 반환한다.', () => {
      responseBody.should.have.property('id');
    });

    it('입력한 name을 반환한다.', () => {
      responseBody.should.have.property('name', name);
    });
  });

  describe('실패시', () => {
    it('name 파라미터 누락시 400을 반환한다.', (done) => {
      request(app)
        .post('/users')
        .expect(400, done);
    });

    it('name이 중복일 경우 409를 반환한다.', (done) => {
      request(app)
        .post('/users')
        .send({ name: 'bek' })
        .expect(409, done);
    });
  });
});

describe('PUT /users/:id 는', () => {
  describe('성공시', () => {
    it('변경된 name을 응답한다.', (done) => {
      const name = 'den';
      request(app)
        .put('/users/3')
        .send({ name })
        .end((err, res) => {
          res.body.should.have.property('name', name);
          done();
        });
    });
  });

  describe('실패시', () => {
    it('정수가 아닌 id일 경우 400을 응답한다.', (done) => {
      const name = 'den';
      request(app)
        .put('/users/a')
        .send({ name })
        .expect(400, done);
    });

    it('name 값이 없을 경우 400을 응답한다.', (done) => {
      request(app)
        .put('/users/3')
        .expect(400, done);
    });

    it('존재하지 않는 유저의 경우 404를 응답한다.', (done) => {
      const name = 'den';
      request(app)
        .put('/users/999')
        .send({ name })
        .expect(404, done);
    });

    it('이미 존재하는 name일 경우 409를 응답한다.', (done) => {
      request(app)
        .put('/users/3')
        .send({ name: 'bek' })
        .expect(409, done);
    });
  });
});