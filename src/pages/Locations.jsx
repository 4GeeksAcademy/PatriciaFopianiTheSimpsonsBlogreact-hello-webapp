import useGlobalReducer from "../hooks/useGlobalReducer";

export const Locations = () => {
    const { store } = useGlobalReducer();

    if (store.locations.length === 0) {
        return <h2 className="text-center mt-5">Loading locations...</h2>;
    }

    return (
        <div className="container mt-4">
            <h1 className="text-warning mb-4">Locations</h1>

            <div className="row">
                {store.locations.map(location => (
                    <div className="col-md-4 mb-4" key={location.id}>
                        <div className="card h-100">
                            <img
                                src={location.image}
                                className="card-img-top"
                                alt={location.name}
                                style={{ height: "200px", objectFit: "cover" }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                                }}
                            />

                            <div className="card-body">
                                <h5 className="card-title">{location.name}</h5>
                                <p className="card-text">
                                    {location.description || "No description available"}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
