import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NotFound from '../components/NotFound';
import { loadPersonInfo } from '../redux/actions/personActions';
import { Image, Grid, Header, List } from 'semantic-ui-react';
import '../styles/PersonPage.css';
import { getGenderNameFromId } from '../api/config/gender';
import { createImageSrc } from '../api/config/image';

function PersonPage({ personId, person, loading, loadPersonInfo }) {
    useEffect(() => {
        loadPersonInfo(personId, ['biography']);
    }, [loadPersonInfo, personId]);

    if (loading) {
        // TODO: place a Loader here
        return <div>Loading...</div>;
    }

    if (!person) {
        return <NotFound />;
    }

    return (
        <div className='PersonPage'>
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <div className='PersonPage__info__picture-container'>
                            <Image
                                className='PersonPage__info__picture'
                                src={createImageSrc({ path: person.profile_path, type: 'profile', size: 'h632' })}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <div className='PersonPage__title'>
                            <Header size='huge' className='Person__name'>
                                {person.name}
                            </Header>
                        </div>
                        <div className='PersonPage__biography'>
                            <Header
                                size='medium'
                                className='PersonPage__biography__header'
                            >
                                Biography
                            </Header>
                            <div className='PersonPage__biography__content'>
                                {person.biography || `We don't have a biography for ${person.name}.`}
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div className='PersonPage__info__personal'>
                            <Header
                                size='medium'
                                className='PersonPage__info__personal_header'
                            >
                                Personal Info
                            </Header>

                            <List relaxed='very'>
                                <List.Item>
                                    <List.Header>Known For</List.Header>
                                    {person.known_for_department}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Full Name</List.Header>
                                    {person.name}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Gender</List.Header>
                                    {getGenderNameFromId(person.gender)}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Birthday</List.Header>
                                    {person.birthday || '-'}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Place of Birth</List.Header>
                                    {person.place_of_birth || '-'}
                                </List.Item>
                            </List>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const personId = parseInt(ownProps.match.params.id);
    const persons = state.entities.persons;
    const person = persons[personId];
    const loading = state.ui.isFetchingPersonInfo;

    return {
        personId,
        person,
        loading,
    }
}

export default connect(mapStateToProps, { loadPersonInfo })(PersonPage);
