import React, { useState, useEffect } from 'react';
import PeopleGrid from '../components/PeopleGrid';
import '../styles/People.css';
import { personAPI } from '../api';
import Pagination from '../components/Pagination';

function People() {
    const [people, setPeople] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPeople();
    }, [pagination.page]);

    async function fetchPeople() {
        setLoading(true);

        const res = await personAPI.getPopularPeople({ page: pagination.page });

        setPagination({
            page: res.data.page,
            totalPages: res.data.total_pages
        });

        const people = res.data.results;
        setPeople(people);

        setLoading(false);
    }

    function handlePageChange(e, data) {
        setPagination(prevState => ({ ...prevState, page: data.activePage }));
    }

    return (
        <div className="People">
            {loading
                ? <div>Loading...</div>
                :
                <>
                    <div className="People__people-container">
                        <PeopleGrid
                            title='Popular People'
                            columns={4}
                            doubling
                            people={people}
                        />
                    </div>
                    <Pagination
                        activePage={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                        topPadded
                    />
                </>
            }
        </div>
    );
}

export default People;
