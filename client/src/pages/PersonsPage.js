import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadPopularPersons } from '../redux/actions';
import { extractPageFromQueryString, determinePage } from '../utils/page';
import PersonsGrid from '../components/PersonsGrid';
import '../styles/PersonsPage.css';
import Pagination from '../components/Pagination';
import PersonsGridPlaceholder from '../components/PersonsGridPlaceholder';

function PersonsPage({ persons, loading, totalPages, page, history, location, loadPopularPersons }) {
    useEffect(() => {
        loadPopularPersons({ page });
    }, [page]);

    function gotoPage(newPage) {
        history.push({
            pathname: location.pathname,
            search: `?page=${newPage}`
        });
    }

    function handlePageChange(e, data) {
        gotoPage(data.activePage);
    }

    return (
        <div className="PersonsPage">
            <div className="PersonsPage__persons-container">
                {loading
                    ?
                    <PersonsGridPlaceholder
                        title='Popular People'
                        numberOfCards={12}
                        columns={4}
                        doubling
                    />
                    :
                    <PersonsGrid
                        title='Popular People'
                        columns={4}
                        doubling
                        persons={persons}
                    />
                }
            </div>

            <Pagination
                activePage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                topPadded
                disabled={loading}
            />
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const cachedPersons = state.entities.persons;
    const personsByPage = state.pagination.personsByPage;
    const pages = personsByPage.pages || {};
    const totalPages = personsByPage.totalPages || null;
    const pageFromQuery = extractPageFromQueryString(ownProps.location.search);
    // TODO: (SSR) - To be implemented
    // if page > totalPages, set page equals to totalPages
    const page = determinePage(pageFromQuery);
    const personIds = pages[page] || [];
    const persons = personIds.map(id => cachedPersons[id]);
    const loading = personsByPage.isFetching || false;

    return {
        loading,
        totalPages: totalPages > 1000 ? 1000 : totalPages,
        persons,
        page
    }
}

export default connect(mapStateToProps, { loadPopularPersons })(PersonsPage);
