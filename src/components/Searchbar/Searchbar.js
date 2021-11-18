import { useState } from "react";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => setQuery(e.currentTarget.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (query.trim() === "") {
      alert("Enter the query");
      return;
    }

    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
