import React from 'react';
import PeopleGrid from '../components/PeopleGrid';
import '../styles/People.css';
import * as peopleApi from '../api/peopleAPI';

function People() {
    const people = peopleApi.all();

    return (
        <div className="People">
            <div className="People__container">
                <PeopleGrid
                    people={people}
                    title='Popular People'
                />
            </div>
        </div>
    );
}

export default People;
