import React, { useState, useEffect } from 'react';
import PeopleGrid from '../components/PeopleGrid';
import '../styles/People.css';
import * as peopleApi from '../api/peopleAPI';

function People() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetchPeople();
    }, []);

    async function fetchPeople() {
        const people = await peopleApi.all();
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
