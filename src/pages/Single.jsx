// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams, useLocation } from "react-router-dom";  // To use link for navigation, useParams to get URL parameters, and useLocation to detect the current route
import PropTypes from "prop-types";  // To define prop types for this component
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state

// Define and export the Single component which displays individual item details.
export const Single = props => {

  // Access the global state using the custom hook.
  const { store } = useGlobalReducer();

  // Retrieve the 'id' URL parameter using useParams hook.
  const { id } = useParams();

  // Detect the current route to know if we are showing a character or a location.
  const location = useLocation();
  const isCharacter = location.pathname.includes("/character/");
  const isLocation = location.pathname.includes("/location/");

  // Variable to store the selected item (character or location).
  let item = null;

  // If the route corresponds to a character, search inside store.characters.
  if (isCharacter) {
    item = store.characters.find(character => character.id === parseInt(id));
  }

  // If the route corresponds to a location, search inside store.locations.
  if (isLocation) {
    item = store.locations.find(loc => loc.id === parseInt(id));
  }

  // If the item is not found yet (store still loading), show a loading message.
  if (!item) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="container text-center">
      {/* Display the name of the character or location dynamically retrieved from the store using the id. */}
      <h1 className="display-4">{item.name}</h1>
      <hr className="my-4" />  {/* A horizontal rule for visual separation. */}

      {/* Display the correct image depending on whether it's a character or a location. */}
      {isCharacter && (
        <img
          src={`https://cdn.thesimpsonsapi.com/500/character/${item.id}.webp`}
          alt={item.name}
          className="img-fluid mb-4"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      )}

      {isLocation && (
        <img
          src={item.image}
          alt={item.name}
          className="img-fluid mb-4"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      )}

      {/* Display the description or use depending on the type of item. */}
      {isCharacter && (
        <div className="text-start mx-auto" style={{ maxWidth: "600px" }}>
          <p><strong>AGE:</strong> {item.age}</p>
          <p><strong>GENDER:</strong> {item.gender}</p>
          <p><strong>STATUS:</strong> {item.status}</p>
          <p><strong>OCCUPATION:</strong> {item.occupation}</p>

          <h5 className="mt-4">FAMOUS PHRASES</h5>

          {/* Render phrases from the API if available */}
          {item.phrases && item.phrases.length > 0 ? (
            <ul>
              {item.phrases.slice(0, 5).map((phrase, index) => (
                <li key={index}>{phrase}</li>
              ))}
            </ul>
          ) : (
            <p>No famous phrases available.</p>
          )}
        </div>
      )}

      {isLocation && (
        <div className="text-start mx-auto" style={{ maxWidth: "600px" }}>
          <p><strong>USE:</strong> {item.use}</p>
          <p><strong>TOWN:</strong> {item.town}</p>
        </div>
      )}

      {/* A Link component acts as an anchor tag but is used for client-side routing to prevent page reloads. */}
      <Link to="/">
        <span className="btn btn-primary btn-lg" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Single.propTypes = {
  match: PropTypes.object  // Although 'match' prop is defined here, it is not used in the component.
};
