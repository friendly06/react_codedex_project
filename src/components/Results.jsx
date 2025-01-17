import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Results({ element, artwork, resetQuiz }) {
  // reference the context for the "name".
  const { name } = useContext(UserContext);

  const handleReset = () => {
    resetQuiz();
  };

  return (
    <>
    <div>
      <p>
        <strong>{name.trim() ? name.trim().charAt(0).toUpperCase() + name.slice(1) : "Unknown Player"}</strong>, your element is: <strong>{element}</strong>
      </p>
      {artwork ? (
        <div className="artwork">
          <h2>Breeds: {artwork.title}</h2>
          <img src={artwork.primaryImage} alt={artwork.title} />
          <p className="picSource">Picture name: {artwork.artistDisplayName}</p>
          {/* <p>{artwork.objectDate}</p> */}
          <button className="resetBtn"
              onClick={handleReset}>Reset Quiz</button>
        </div>
      ) : (
        <p>No artwork found.</p>
      )}
    </div>
    </>
  );
}
