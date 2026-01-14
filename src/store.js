export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    characters: [], 
    locations: [], 
    favoritesCharacters: [], 
    favoritesLocations: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
      
    case 'set_characters': {
      return {
        ...store,
        characters: action.payload
      };
    }

    case 'set_locations': {
      return {
        ...store,
        locations: action.payload
      };
    }

    case 'toggle_favoriteCharacters': {
      const exists = store.favoritesCharacters.some(
        fav => fav.id === action.payload.id
      );

      return {
        ...store,
        favoritesCharacters: exists
          ? store.favoritesCharacters.filter(fav => fav.id !== action.payload.id)
          : [...store.favoritesCharacters, action.payload]
      };
    }

    case 'toggle_favoriteLocations': {
      const exists = store.favoritesLocations.some(
        fav => fav.id === action.payload.id
      );

      return {
        ...store,
        favoritesLocations: exists
          ? store.favoritesLocations.filter(fav => fav.id !== action.payload.id)
          : [...store.favoritesLocations, action.payload]
      };
    }

    default:
      throw Error('Unknown action.');
  }
}

