import app from '../../src/app';

describe('\'uploadUserAvtar\' service', () => {
  it('registered the service', () => {
    const service = app.service('upload/avatar');
    expect(service).toBeTruthy();
  });
});
