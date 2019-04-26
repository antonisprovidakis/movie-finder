import React, { useState, useEffect } from 'react';
import PersonsGrid from '../components/PersonsGrid';
import '../styles/PersonsPage.css';
import { personAPI } from '../api';
import Pagination from '../components/Pagination';
import PersonsGridPlaceholder from '../components/PersonsGridPlaceholder';

function PersonsPage(props) {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page') || 1; // TODO: 0 < page < 1000

    const [persons, setPersons] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPersons();
    }, [page]);

    async function fetchPersons() {
        setLoading(true);
        const res = await personAPI.getPopularPersons({ page });
        // TODO: check for errors in res (e.g. if page > 1000, an error is returned)

        setTotalPages(res.total_pages);

        const persons = res.results;
        setPersons(persons);
        setLoading(false);
    }

    function gotoPage(newPage) {
        props.history.push({
            pathname: props.location.pathname,
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

export default PersonsPage;
