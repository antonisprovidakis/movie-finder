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

function CollectionGrid({
    title = '',
    collection = [],
    renderItem,
    noResultsMessage = 'No results found.',
    menuItems = [],
    ...rest
}) {
    return (
        <div className='CollectionGrid'>
            <CollectionGridHeader title={title} menuItems={menuItems} />

            {collection.length === 0
                ? noResultsMessage
                :
                <Grid
                    className='CollectionGrid__items'
                    {...rest}
                >
                    {collection.map(item => {
                        const renderedItem = renderItem(item);

                        const className = [
                            renderedItem.className,
                            'CollectionGrid__column_content'
                        ].join(' ').trim();

                        const updatedRenderedItem = React.cloneElement(renderedItem, { className });

                        return (
                            <Grid.Column key={item.id} className='CollectionGrid__column'>
                                {updatedRenderedItem}
                            </Grid.Column>
                        )
                    })}
                </Grid>
            }
        </div>
    );
}

export default CollectionGrid;
