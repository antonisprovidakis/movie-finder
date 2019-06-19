import React from 'react';
import { render } from '@testing-library/react';
import Rating from '../Rating';

it('should render with "not rated" message if no value is passed', () => {
  const { getByTestId } = render(<Rating />);
  expect(getByTestId('rating-value')).toHaveTextContent('N/R');
});

it('should render with N/R if value -1 is passed', () => {
  const { getByTestId } = render(<Rating value={-1} />);
  expect(getByTestId('rating-value')).toHaveTextContent('N/R');
});

it('should render with passed value', () => {
  const { getByTestId } = render(<Rating value={5} />);
  expect(getByTestId('rating-value')).toHaveTextContent('5');
});
