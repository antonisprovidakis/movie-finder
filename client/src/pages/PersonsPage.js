import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadPopularPersons } from '../redux/actions';
import { getPageFromQueryString } from '../utils/page';
import CollectionGrid from '../components/CollectionGrid';
import '../styles/PersonsPage.css';
import Pagination from '../components/Pagination';
import PersonCard from '../components/PersonCard';
import PersonCardPlaceholder from '../components/PersonCardPlaceholder';

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

    function gotoPage(newPage) {
        history.push({
            pathname: location.pathname,
            search: `?page=${newPage}`
        });
    }

    function handlePageChange(e, data) {
        gotoPage(data.activePage);
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
    const page = getPageFromQueryString(ownProps.location.search);
    const personIds = pages[page] || [];
    const persons = personIds.map(id => cachedPersons[id]);

    return {
        isFetching,
        totalPages,
        persons,
        page
    }
}

export default connect(mapStateToProps, { loadPopularPersons })(PersonsPage);
