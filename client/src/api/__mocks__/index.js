import { searchAPIData } from './data';

const searchAPI = {
  searchMulti: jest.fn().mockResolvedValue({ results: searchAPIData.matrix })
};

export { searchAPI };
