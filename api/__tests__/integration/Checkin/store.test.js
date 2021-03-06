import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Checkin store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to checkin student', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student');
    const response = await request(app)
      .post(`/students/${student.id}/checkins`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to checkin student not found', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/students/1/checkins')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'Student does not exists' },
    });
  });

  it('should not be able to create checkin to student with more of 5', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student');

    await factory.create('Checkin', {
      student_id: student.id,
    });
    await factory.create('Checkin', {
      student_id: student.id,
    });
    await factory.create('Checkin', {
      student_id: student.id,
    });
    await factory.create('Checkin', {
      student_id: student.id,
    });

    const response = await request(app)
      .post(`/students/${student.id}/checkins`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'You can only check-in 5 times every 7 days!' },
    });
  });
});
