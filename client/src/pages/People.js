import React, { useState, useEffect } from 'react';
import PeopleGrid from '../components/PeopleGrid';
import '../styles/People.css';
import { personAPI } from '../api';

function People() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetchPeople();
    }, []);

    async function fetchPeople() {
        const res = await personAPI.getPopularPeople();
        const people = res.data.results;
        setPeople(people);
    }

    return (
        <div className="People">
            <div className="People__container">
                <PeopleGrid
                    people={people}
                    title='Popular People'
                    mobileColumnWidthPerRow={8}
                    tabletColumnWidthPerRow={4}
                />
            </div>
        </div>
    );
}

export default People;
