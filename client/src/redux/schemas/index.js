import { schema } from 'normalizr';

const movieSchema = new schema.Entity('movies');
const personSchema = new schema.Entity('persons');

// Schemas for TMDb API responses.
const Schemas = {
  MOVIE: movieSchema,
  MOVIE_ARRAY: [movieSchema],
  PERSON: personSchema,
  PERSON_ARRAY: [personSchema]
};

export default Schemas;
