import React from 'react';
import { Grid } from 'semantic-ui-react';
import '../styles/CollectionGrid.css';

function CollectionGridHeader({ title = '', menuItems = [] }) {
    const shouldRenderTitle = title.length > 0;
    const shouldRenderMenu = menuItems.length > 0;
    const shouldRenderTopPart = shouldRenderTitle || shouldRenderMenu;

    if (!shouldRenderTopPart) {
        return null;
    }

    const classes = [
        'CollectionGrid__header',
        shouldRenderTitle ? 'CollectionGrid__header--has-title' : '',
        shouldRenderMenu ? 'CollectionGrid__header--has-menu' : ''
    ].join(' ').trim();

    return (
        <div className={classes}>
            {shouldRenderTitle && <h2 className='CollectionGrid__header__title'>{title}</h2>}
            {shouldRenderMenu &&
                <div className='CollectionGrid__header__menu'>
                    {menuItems.map((menuItem, index) => {
                        const className = [
                            menuItem.props.className,
                            'CollectionGrid__header__menu_item'
                        ].join(' ').trim();

                        return React.cloneElement(menuItem, {
                            key: index,
                            className
                        })
                    })}
                </div>
            }
        </div>
    );
}

function BaseGrid({ collection, renderItem, ...rest }) {
    return (
        <Grid className='CollectionGrid__items' {...rest}>
            {
                collection.map((item, index) => {
                    const renderedItem = renderItem(item, index);

                    if (!React.isValidElement(renderedItem)) {
                        return null;
                    }

                    const className = [
                        renderedItem.className,
                        'CollectionGrid__column_content'
                    ].join(' ').trim();

                    return (
                        <Grid.Column key={index} className='CollectionGrid__column'>
                            {React.cloneElement(renderedItem, { className })}
                        </Grid.Column>
                    )
                })
            }
        </Grid>
    );
}

function GridPlaceholder({ placeholderItemsCount, renderItem, ...rest }) {
    const collection = Array(placeholderItemsCount).fill({});
    return (
        <BaseGrid
            collection={collection}
            renderItem={renderItem}
            {...rest}
        />
    );
}

function CollectionGrid({
    title = '',
    collection = [],
    renderItem,
    noResultsMessage = 'No results found.',
    renderPlaceholderItem = () => null,
    placeholderItemsCount = 0,
    loading = false,
    menuItems = [],
    ...rest
}) {
    return (
        <div className='CollectionGrid'>
            <CollectionGridHeader title={title} menuItems={loading ? [] : menuItems} />
            {
                loading
                    ? (
                        <GridPlaceholder
                            renderItem={renderPlaceholderItem}
                            placeholderItemsCount={placeholderItemsCount}
                            {...rest}
                        />
                    )
                    : (
                        collection.length > 0
                            ? (
                                <BaseGrid
                                    collection={collection}
                                    renderItem={renderItem}
                                    {...rest}
                                />
                            )
                            : (
                                <p className='CollectionGrid__no-results-message'>
                                    {noResultsMessage}
                                </p>
                            )
                    )
            }
        </div>
    );
}

export default CollectionGrid;
