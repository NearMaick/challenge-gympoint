import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Plan index', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to show all plans', async () => {
    const user = await factory.create('User');
    const plan = await factory.create('Plan');
    const response = await request(app)
      .get('/plans')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body[0].id).toEqual(plan.id);
  });
});
