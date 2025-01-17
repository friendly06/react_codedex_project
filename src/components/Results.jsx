import React, { createContext, useContext } from "react";
import { UserContext } from "./UserContext";

export default function Results({ element, artwork }) {
  // reference the context for the "name".
  const { name } = useContext(UserContext);

  return (
    <div>
      <p>
        <strong>{name ? name : "Unknown Player"}</strong>, your element is: <strong>{element}</strong>
      </p>
      {artwork ? (
        <div className="artwork">
          <h2>Breeds: {artwork.title}</h2>
          <img src={artwork.primaryImage} alt={artwork.title} />
          <p className="picSource">Picture name: {artwork.artistDisplayName}</p>
          {/* <p>{artwork.objectDate}</p> */}
        </div>
      ) : (
        <p>No artwork found.</p>
      )}
    </div>
  );
}
