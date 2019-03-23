import React, { useState, useEffect } from 'react';
import PeopleGrid from '../components/PeopleGrid';
import '../styles/People.css';
import { personAPI } from '../api';
import Pagination from '../components/Pagination';
import PeopleGridPlaceholder from '../components/PeopleGridPlaceholder';

function People() {
    const [people, setPeople] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

    useEffect(() => {
        fetchPeople();
    }, [pagination.page]);

    async function fetchPeople() {
        const res = await personAPI.getPopularPeople({ page: pagination.page });

        setPagination({
            page: res.data.page,
            totalPages: res.data.total_pages
        });

        const people = res.data.results;
        setPeople(people);
    }

    function handlePageChange(e, data) {
        setPagination(prevState => ({ ...prevState, page: data.activePage }));
    }

    return (
        <div className="People">
            <div className="People__people-container">
                {people.length > 0
                    ?
                    <PeopleGrid
                        title='Popular People'
                        columns={4}
                        doubling
                        people={people}
                    />
                    :
                    <PeopleGridPlaceholder
                        title='Popular People'
                        numberOfCards={12}
                        columns={4}
                        doubling
                    />
                }
            </div>

            {people.length > 0 &&
                <Pagination
                    activePage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                    topPadded
                />
            }
        </div>
    );
}

export default People;
