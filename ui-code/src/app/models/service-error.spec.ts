import { ServiceError } from './service-error';

describe('ServiceError', () => {
  it('should create an instance', () => {
    expect(new ServiceError()).toBeTruthy();
  });
});
