import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CollectionGrid from '../components/CollectionGrid';
import Pagination from '../components/Pagination';
import PersonCard from '../components/PersonCard';
import PersonCardPlaceholder from '../components/PersonCardPlaceholder';
import { getPage, updateQueryString } from '../utils/queryString';
import { loadPopularPersons } from '../redux/actions/personActions';

function PersonsPage({
  persons,
  pagination,
  page,
  history,
  location,
  loadPopularPersons
}) {
  useEffect(() => {
    loadPopularPersons({ page });
  }, [loadPopularPersons, page]);

  function handlePageChange(e, data) {
    const newQueryString = updateQueryString(location.search, {
      page: data.activePage
    });
    history.push(`?${newQueryString}`);
  }

  function renderItem(person) {
    const { id, name, profile_path: image } = person;
    return (
      <PersonCard
        id={id}
        name={name}
        image={image}
        as={Link}
        to={`/person/${id}`}
        data-testid="person-card"
      />
    );
  }

  function renderPlaceholderItem() {
    return <PersonCardPlaceholder />;
  }

  const { totalPages, selectedPageData } = pagination;
  const { isFetching } = selectedPageData;

  const shouldRenderPagination = totalPages > 1 && page <= totalPages;

  return (
    <div className="PersonsPage" data-testid="persons-page">
      <div className="PersonsPage__persons-container">
        <CollectionGrid
          title="Popular People"
          collection={persons}
          renderItem={renderItem}
          placeholderItemsCount={12}
          renderPlaceholderItem={renderPlaceholderItem}
          loading={isFetching}
          columns={4}
          doubling
        />
      </div>

      {shouldRenderPagination && (
        <Pagination
          activePage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          topPadded
          disabled={isFetching}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const page = getPage(ownProps.location.search);
  const cachedPersons = state.entities.persons;
  const pagination = state.pagination.persons;
  const selectedPageData = pagination.pages[page] || { ids: [] };
  const persons = selectedPageData.ids.map(id => cachedPersons[id]);

  return {
    pagination: {
      totalPages: pagination.totalPages,
      selectedPageData
    },
    persons,
    page
  };
};

PersonsPage.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  page: PropTypes.number,
  pagination: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired,
  loadPopularPersons: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { loadPopularPersons }
)(PersonsPage);
