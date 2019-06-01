import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadPopularPersons } from '../redux/actions/personActions';
import { getPage } from '../utils/queryString';
import CollectionGrid from '../components/CollectionGrid';
import Pagination from '../components/Pagination';
import PersonCard from '../components/PersonCard';
import PersonCardPlaceholder from '../components/PersonCardPlaceholder';
import { updateQueryString } from '../utils/queryString';

function PersonsPage({
    persons,
    isFetching,
    totalPages,
    page,
    history,
    location,
    loadPopularPersons
}) {
    useEffect(() => {
        loadPopularPersons({ page });
    }, [loadPopularPersons, page]);

    function handlePageChange(e, data) {
        const newQueryString = updateQueryString(
            location.search,
            { page: data.activePage }
        );
        history.push(`?${newQueryString}`);
    }

    function renderItem(item) {
        const {
            id,
            name,
            profile_path: image
        } = item;
        return <PersonCard id={id} name={name} image={image} />
    }

    function renderPlaceholderItem() {
        return <PersonCardPlaceholder />;
    }

    const shouldRenderPagination = totalPages > 1 && page <= totalPages;

    return (
        <div className="PersonsPage">
            <div className="PersonsPage__persons-container">
                <CollectionGrid
                    title='Popular People'
                    collection={persons}
                    renderItem={renderItem}
                    placeholderItemsCount={12}
                    renderPlaceholderItem={renderPlaceholderItem}
                    loading={isFetching}
                    columns={4}
                    doubling
                />
            </div>

            {shouldRenderPagination &&
                <Pagination
                    activePage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    topPadded
                    disabled={isFetching}
                />
            }
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const cachedPersons = state.entities.persons;
    const {
        isFetching = false,
        totalPages = undefined,
        pages = {}
    } = state.pagination.personsByPage;
    const page = getPage(ownProps.location.search);
    const personIds = pages[page] || [];
    const persons = personIds.map(id => cachedPersons[id]);

    return {
        isFetching,
        totalPages,
        persons,
        page
    }
}

PersonsPage.propTypes = {
    persons: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    page: PropTypes.number,
    totalPages: PropTypes.number,
    isFetching: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string.isRequired,
    }).isRequired,
    loadPopularPersons: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { loadPopularPersons })(PersonsPage);
