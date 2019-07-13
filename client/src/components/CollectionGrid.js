import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CollectionGrid.css';
import { Grid } from 'semantic-ui-react';
import classNames from 'classnames';

function CollectionGridHeader({ title, menuItems }) {
  const shouldRenderTitle = title.length > 0;
  const shouldRenderMenu = menuItems.length > 0;
  const shouldRenderTopPart = shouldRenderTitle || shouldRenderMenu;

  if (!shouldRenderTopPart) {
    return null;
  }

  const className = classNames('CollectionGrid__header', {
    'CollectionGrid__header--has-title': shouldRenderTitle,
    'CollectionGrid__header--has-menu': shouldRenderMenu
  });

  return (
    <div className={className} data-testid="header">
      {shouldRenderTitle && (
        <h2 className="CollectionGrid__header__title" data-testid="title">
          {title}
        </h2>
      )}
      {shouldRenderMenu && (
        <div className="CollectionGrid__header__menu" data-testid="menu">
          {menuItems.map((menuItem, index) => {
            const className = classNames(
              menuItem.props.className,
              'CollectionGrid__header__menu_item'
            );

            return React.cloneElement(menuItem, {
              key: index,
              className
            });
          })}
        </div>
      )}
    </div>
  );
}

CollectionGridHeader.propTypes = {
  title: PropTypes.string,
  menuItems: PropTypes.arrayOf(PropTypes.element)
};

CollectionGridHeader.defaultProps = {
  title: '',
  menuItems: []
};

function BaseGrid({ collection, renderItem, ...rest }) {
  return (
    <Grid className="CollectionGrid__items" {...rest}>
      {collection.map((item, index) => {
        const renderedItem = renderItem(item, index);

        if (!React.isValidElement(renderedItem)) {
          return null;
        }

        const className = classNames(
          renderedItem.className,
          'CollectionGrid__column_content'
        );

        return (
          <Grid.Column
            key={index}
            className="CollectionGrid__column"
            data-testid="grid-item"
          >
            {React.cloneElement(renderedItem, { className })}
          </Grid.Column>
        );
      })}
    </Grid>
  );
}

BaseGrid.propTypes = {
  collection: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ).isRequired,
  renderItem: PropTypes.func.isRequired
};

function GridPlaceholder({
  placeholderItemsCount,
  renderPlaceholderItem,
  ...rest
}) {
  const collection = Array(placeholderItemsCount).fill({});
  return (
    <BaseGrid
      collection={collection}
      renderItem={renderPlaceholderItem}
      {...rest}
    />
  );
}

GridPlaceholder.propTypes = {
  placeholderItemsCount: PropTypes.number.isRequired,
  renderPlaceholderItem: PropTypes.func.isRequired
};

function CollectionGrid({
  title,
  collection,
  renderItem,
  noResultsMessage,
  renderPlaceholderItem,
  placeholderItemsCount,
  loading,
  menuItems,
  ...rest
}) {
  return (
    <div className="CollectionGrid">
      <CollectionGridHeader
        title={title}
        menuItems={loading ? [] : menuItems}
      />
      {loading ? (
        <GridPlaceholder
          renderPlaceholderItem={renderPlaceholderItem}
          placeholderItemsCount={placeholderItemsCount}
          {...rest}
          data-testid="grid-placeholder"
        />
      ) : collection.length > 0 ? (
        <BaseGrid
          collection={collection}
          renderItem={renderItem}
          {...rest}
          data-testid="grid"
        />
      ) : (
        <p className="CollectionGrid__no-results-message">{noResultsMessage}</p>
      )}
    </div>
  );
}

CollectionGrid.propTypes = {
  collection: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ).isRequired,
  renderItem: PropTypes.func.isRequired,
  title: PropTypes.string,
  noResultsMessage: PropTypes.string,
  renderPlaceholderItem: PropTypes.func,
  placeholderItemsCount: PropTypes.number,
  loading: PropTypes.bool,
  menuItems: PropTypes.arrayOf(PropTypes.element)
};

CollectionGrid.defaultProps = {
  title: '',
  noResultsMessage: 'No results found.',
  renderPlaceholderItem: () => null,
  placeholderItemsCount: 0,
  loading: true,
  menuItems: []
};

export default CollectionGrid;
