import React, { useState, useEffect } from 'react';
import PeopleGrid from '../components/PeopleGrid';
import '../styles/People.css';
import { personAPI } from '../api';
import Pagination from '../components/Pagination';
import PeopleGridPlaceholder from '../components/PeopleGridPlaceholder';

function People(props) {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page') || 1; // TODO: 0 < page < 1000

    const [people, setPeople] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPeople();
    }, [page]);

    async function fetchPeople() {
        setLoading(true);
        const res = await personAPI.getPopularPeople({ page });
        // TODO: check for errors in res (e.g. if page > 1000, an error is returned)

        setTotalPages(res.total_pages);

        const people = res.results;
        setPeople(people);
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
        <div className="People">
            <div className="People__people-container">
                {loading
                    ?
                    <PeopleGridPlaceholder
                        title='Popular People'
                        numberOfCards={12}
                        columns={4}
                        doubling
                    />
                    :
                    <PeopleGrid
                        title='Popular People'
                        columns={4}
                        doubling
                        people={people}
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

export default People;
