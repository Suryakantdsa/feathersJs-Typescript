import app from '../../src/app';

describe('\'uploadCoverimg\' service', () => {
  it('registered the service', () => {
    const service = app.service('upload/cover');
    expect(service).toBeTruthy();
  });
});
