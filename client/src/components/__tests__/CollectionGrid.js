import React from 'react';
import { render } from '@testing-library/react';
import CollectionGrid from '../CollectionGrid';

it('should render a title', () => {
  const renderItem = () => null;

  const { queryByTestId, rerender } = render(
    <CollectionGrid collection={[]} renderItem={renderItem} />
  );

  expect(queryByTestId('title')).not.toBeInTheDocument();

  rerender(
    <CollectionGrid title="My Grid" collection={[]} renderItem={renderItem} />
  );

  expect(queryByTestId('title')).toBeInTheDocument();
  expect(queryByTestId('title')).toHaveTextContent('My Grid');
});

it('should render a menu', () => {
  const renderItem = () => null;

  const { queryByTestId, rerender } = render(
    <CollectionGrid collection={[]} renderItem={renderItem} />
  );

  expect(queryByTestId('menu')).not.toBeInTheDocument();

  const menuItems = [
    <select>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
    </select>
  ];

  rerender(
    <CollectionGrid
      collection={[]}
      renderItem={renderItem}
      menuItems={menuItems}
    />
  );

  expect(queryByTestId('menu')).toBeInTheDocument();
  expect(queryByTestId('menu').children.length).toBe(1);
});

it('should render a placeholder grid when loading', () => {
  const renderPlaceholderItem = jest.fn(() => null);

  const { queryByTestId } = render(
    <CollectionGrid
      loading={true}
      collection={[]}
      renderItem={() => null}
      placeholderItemsCount={8}
      renderPlaceholderItem={renderPlaceholderItem}
    />
  );

  expect(queryByTestId('grid-placeholder')).toBeInTheDocument();
  expect(renderPlaceholderItem).toHaveBeenCalledTimes(8);
});

it('should render a grid when not loading and collection length is greater than 0', () => {
  const renderItem = jest.fn(item => <div>{item}</div>);

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  const { queryByTestId } = render(
    <CollectionGrid collection={items} renderItem={renderItem} />
  );

  expect(queryByTestId('grid-with-results')).toBeInTheDocument();
  expect(renderItem).toHaveBeenCalledTimes(items.length);
});

it('should render a "no results" message when not loading and collection length is 0', () => {
  const { queryByText } = render(
    <CollectionGrid
      collection={[]}
      renderItem={() => null}
      noResultsMessage="No results found."
    />
  );

  expect(queryByText(/no results found/i)).toBeInTheDocument();
});
