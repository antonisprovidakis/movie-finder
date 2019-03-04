import React, { useState, useEffect } from 'react';
import { Image, Grid, Header, List } from 'semantic-ui-react';
import '../styles/Person.css';
import * as peopleAPI from '../api/peopleAPI';

function Person(props) {
    const id = parseInt(props.match.params.id);
    const [person, setPerson] = useState(null);

    useEffect(() => {
        fetchPerson(id);
    }, [id]);

    async function fetchPerson(id) {
        const person = await peopleAPI.get(id);
        setPerson(person);
    }

    if (!person) {
        // TODO: place a Loader here
        return <div>loading...</div>;
    }

    return (
        <div className='Person'>
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <div className='Person__info__picture-container'>
                            <Image
                                className='Person__info__picture'
                                src={person.image}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <div className='Person__title'>
                            <Header size='huge' className='Person__name'>
                                {person.name}
                            </Header>
                        </div>
                        <div className='Person__biography'>
                            <Header
                                size='medium'
                                className='Person__biography__header'
                            >
                                Biography
                            </Header>
                            <div className='Person__biography__content'>
                                {person.biography || 'biography goes here...'}
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div className='Person__info__personal'>
                            <Header
                                size='medium'
                                className='Person__info__personal_header'
                            >
                                Personal Info
                            </Header>

                            <List relaxed='very'>
                                <List.Item>
                                    <List.Header>Known For</List.Header>
                                    Acting
                                </List.Item>
                                <List.Item>
                                    <List.Header>Full Name</List.Header>
                                    {person.name}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Gender</List.Header>
                                    Male
                                </List.Item>
                                <List.Item>
                                    <List.Header>San Francisco</List.Header>
                                    1967-07-26
                                </List.Item>
                                <List.Item>
                                    <List.Header>Place of Birth</List.Header>
                                    Shirebrook, Derbyshire, England, UK
                                </List.Item>
                            </List>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default Person;
