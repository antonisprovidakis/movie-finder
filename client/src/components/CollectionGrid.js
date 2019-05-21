import React from 'react';
import { Grid } from 'semantic-ui-react';
import '../styles/CollectionGrid.css';

function CollectionGrid({
    title = '',
    collection = [],
    renderItem,
    noResultsMessage = 'No results found.',
    menuItems = [],
    // TODO: placeholder
    ...rest
}) {
    return (
        <div className='CollectionGrid'>
            <div className='CollectionGrid__top'>
                <h2 className='CollectionGrid__top__title'>{title}</h2>
                <div className='CollectionGrid__top__menu'>
                    {menuItems.map((menuItem, index) => {
                        const className = [
                            menuItem.props.className,
                            'CollectionGrid__top__menu_item'
                        ].join(' ').trim();

                        return React.cloneElement(menuItem, {
                            key: index,
                            className
                        })
                    })}
                </div>
            </div>

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
