import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/PersonPage.css';
import { connect } from 'react-redux';
import { Image, Grid, Header, List } from 'semantic-ui-react';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import { createImageSrc, getGenderNameFromId } from '../api/config';
import { loadPersonInfo } from '../redux/actions/personActions';

function PersonPage({ personId, person, isFetching, loadPersonInfo }) {
  useEffect(() => {
    loadPersonInfo(personId, ['biography']);
  }, [loadPersonInfo, personId]);

  if (isFetching) {
    return <Loader />;
  }

  if (!person) {
    return <NotFound />;
  }

  return (
    <div className="PersonPage">
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={6}>
            <div className="PersonPage__info__picture-container">
              <Image
                className="PersonPage__info__picture"
                src={createImageSrc({
                  path: person.profile_path,
                  type: 'profile',
                  size: 'h632'
                })}
              />
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className="PersonPage__title">
              <Header size="huge" className="Person__name">
                {person.name}
              </Header>
            </div>
            <div className="PersonPage__biography">
              <Header size="medium" className="PersonPage__biography__header">
                Biography
              </Header>
              <div className="PersonPage__biography__content">
                {person.biography ||
                  `We don't have a biography for ${person.name}.`}
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div className="PersonPage__info__personal">
              <Header
                size="medium"
                className="PersonPage__info__personal_header"
              >
                Personal Info
              </Header>

              <List relaxed="very">
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
  const cachedPersons = state.entities.persons;
  const person = cachedPersons[personId];
  const isFetching = state.ui.isFetchingPersonInfo;

  return {
    personId,
    person,
    isFetching
  };
};

PersonPage.propTypes = {
  personId: PropTypes.number.isRequired,
  person: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  loadPersonInfo: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { loadPersonInfo }
)(PersonPage);
