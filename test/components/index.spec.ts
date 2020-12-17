import { componentDirs } from '~/components';

describe('/components folder index tests', () => {
  test('"componentDirs" object is exported and contains a "dirs" array', () => {
    expect(componentDirs).toBeDefined();
    expect(componentDirs.dirs).toBeDefined();
    expect(componentDirs.dirs).toBeInstanceOf(Array);
  });
});
