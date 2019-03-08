import React, { useState, useEffect } from 'react';
import PeopleGrid from '../components/PeopleGrid';
import '../styles/People.css';
import { personAPI } from '../api';
import PersonCard from '../components/PersonCard';

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
                    title='Popular People'
                    columns={4}
                    doubling
                >
                    {people.map(person =>
                        <PersonCard
                            key={person.id}
                            id={person.id}
                            name={person.name}
                            image={person.profile_path}
                        />
                    )}
                </PeopleGrid>
            </div>
        </div>
    );
}

export default People;
