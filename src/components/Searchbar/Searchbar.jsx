import { useState } from 'react';
import { Input, SearchBarHeader, Button } from './Searchbar.styled';
import { SearchBarForm } from './Searchbar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchBarHeader className="searchBar">
      <SearchBarForm className="form" onSubmit={handleSubmit}>
        <Button type="submit" className="button">
          <span className="button-label">Search</span>
        </Button>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </SearchBarForm>
    </SearchBarHeader>
  );
};
