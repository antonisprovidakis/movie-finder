import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '../../test/matchMedia.mock';
import Pagination from '../Pagination';

it('should render if totaPages is greater than 1', () => {
  const { getByTestId, rerender } = render(
    <Pagination activePage={1} totalPages={2} />
  );
  expect(getByTestId('pagination')).toBeInTheDocument();

  rerender(<Pagination activePage={1} totalPages={5} />);
  expect(getByTestId('pagination')).toBeInTheDocument();

  rerender(<Pagination activePage={5} totalPages={10} />);
  expect(getByTestId('pagination')).toBeInTheDocument();
});

it('should not render if totaPages is 1 or less', () => {
  const { container, rerender } = render(
    <Pagination activePage={1} totalPages={-1} />
  );
  expect(container).toBeEmpty();

  rerender(<Pagination activePage={1} totalPages={0} />);
  expect(container).toBeEmpty();

  rerender(<Pagination activePage={1} totalPages={1} />);
  expect(container).toBeEmpty();
});

it('should call onPageChange when a page is clicked', () => {
  const handlePageChange = jest.fn((e, data) => null);

  const { getByText } = render(
    <Pagination
      activePage={1}
      totalPages={10}
      onPageChange={handlePageChange}
    />
  );

  fireEvent.click(getByText('5'));

  expect(handlePageChange).toHaveBeenCalledTimes(1);
  expect(handlePageChange).toHaveBeenCalledWith(
    expect.any(Object),
    expect.objectContaining({ activePage: 5, totalPages: 10 })
  );
});
