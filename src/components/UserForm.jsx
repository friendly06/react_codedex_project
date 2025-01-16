import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);  // Set the name in context
    window.history.pushState({}, '', '/quiz');  // Change the URL without reloading the page
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);  // Dispatch a navigation event
  }

  return (
    // Add the form here
    <>
    <form>
      <label htmlFor="username">Name:</label>
      <input type="text" 
          name="username" 
          id="username"
          value={inputName}
          onChange={(e)=> setInputName(e.target.value)} />
      <button type="submit" onClick={handleSubmit} >Start Quiz</button>
    </form>
    </>
  );
}