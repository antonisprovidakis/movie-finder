import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import '../styles/CollectionGrid.css';
import concatClasses from '../utils/concatClasses';

function CollectionGridHeader({ title, menuItems }) {
    const shouldRenderTitle = title.length > 0;
    const shouldRenderMenu = menuItems.length > 0;
    const shouldRenderTopPart = shouldRenderTitle || shouldRenderMenu;

    if (!shouldRenderTopPart) {
        return null;
    }

    const className = concatClasses([
        'CollectionGrid__header',
        shouldRenderTitle ? 'CollectionGrid__header--has-title' : '',
        shouldRenderMenu ? 'CollectionGrid__header--has-menu' : ''
    ]);

    return (
        <div className={className}>
            {shouldRenderTitle &&
                <h2 className='CollectionGrid__header__title'>{title}</h2>
            }
            {shouldRenderMenu &&
                <div className='CollectionGrid__header__menu'>
                    {menuItems.map((menuItem, index) => {
                        const className = concatClasses([
                            menuItem.props.className,
                            'CollectionGrid__header__menu_item'
                        ]);

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

CollectionGridHeader.propTypes = {
    title: PropTypes.string,
    menuItems: PropTypes.arrayOf(PropTypes.element)
}

CollectionGridHeader.defaultProps = {
    title: '',
    menuItems: []
}

function BaseGrid({ collection, renderItem, ...rest }) {
    return (
        <Grid className='CollectionGrid__items' {...rest}>
            {collection.map((item, index) => {
                const renderedItem = renderItem(item, index);

                if (!React.isValidElement(renderedItem)) {
                    return null;
                }

                const className = concatClasses([
                    renderedItem.className,
                    'CollectionGrid__column_content'
                ]);

                return (
                    <Grid.Column key={index} className='CollectionGrid__column'>
                        {React.cloneElement(renderedItem, { className })}
                    </Grid.Column>
                )
            })}
        </Grid>
    );
}

BaseGrid.propTypes = {
    collection: PropTypes.arrayOf(
        PropTypes.object
    ),
    renderItem: PropTypes.func.isRequired
}

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
}

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
        <div className='CollectionGrid'>
            <CollectionGridHeader title={title} menuItems={loading ? [] : menuItems} />
            {loading
                ? (
                    <GridPlaceholder
                        renderPlaceholderItem={renderPlaceholderItem}
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

CollectionGrid.propTypes = {
    title: PropTypes.string,
    collection: PropTypes.arrayOf(PropTypes.object),
    renderItem: PropTypes.func.isRequired,
    noResultsMessage: PropTypes.string,
    renderPlaceholderItem: PropTypes.func,
    placeholderItemsCount: PropTypes.number,
    loading: PropTypes.bool,
    menuItems: PropTypes.arrayOf(PropTypes.element)
}

CollectionGrid.defaultProps = {
    title: '',
    noResultsMessage: 'No results found.',
    renderPlaceholderItem: () => null,
    placeholderItemsCount: 0,
    loading: false,
    menuItems: []
}

export default CollectionGrid;
