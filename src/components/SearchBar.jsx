import React from "react";
import PropTypes from 'prop-types';
import Button from "./Button.jsx";

const SearchBar = (
    {
        label,
        onSearch = () => {console.log('search event is not defined')},
    }) => {

    const search = (e) => {
        e.preventDefault();
        const keyword = e.target.keyword.value;
        onSearch(keyword);
    }

    return (
        <div className='w-full'>
            <form onSubmit={e=>search(e)} className='flex w-full'>
                <input type='text' name='keyword' className='w-full'/>
                <Button type='submit' label={label} size='sm'/>
            </form>
        </div>

    );
};

SearchBar.propTypes = {
    label: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;