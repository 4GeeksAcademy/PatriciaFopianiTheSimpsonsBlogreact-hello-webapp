// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams, useLocation } from "react-router-dom";  // To use link for navigation, useParams to get URL parameters, and useLocation to detect the current route
import PropTypes from "prop-types";  // To define prop types for this component
import { useState, useEffect } from "react"; // <-- Nuevo: para manejar estado y efectos
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
  // let item = null;  <-- Esto se reemplaza por useState
  const [item, setItem] = useState(null); // <-- Nuevo estado para guardar el detalle

  // Nuevo: hacer una petición para pedir el detalle del personaje o locación cuando se monta el componente
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        let url = "";

        // Si es personaje, pedimos su detalle
        if (isCharacter) {
          url = `https://thesimpsonsapi.com/api/characters/${id}`;
        }

        // Si es locación, pedimos su detalle
        if (isLocation) {
          url = `https://thesimpsonsapi.com/api/locations/${id}`;
        }

        const resp = await fetch(url);
        const data = await resp.json();

        // <-- Corrección: la API de locations devuelve un array
        setItem(Array.isArray(data) ? data[0] : data); // Guardamos el detalle en el estado

      } catch (error) {
        console.error("Error fetching detail:", error);
      }
    };

    fetchDetail();
  }, [id, isCharacter, isLocation]);

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
          src={`https://cdn.thesimpsonsapi.com/1280/location/${item.id}.webp`}
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
