import { DeadlinePipe } from './deadline.pipe';

describe('DeadlinePipe', () => {
  it('create an instance', () => {
    const pipe = new DeadlinePipe();
    expect(pipe).toBeTruthy();
  });
});
