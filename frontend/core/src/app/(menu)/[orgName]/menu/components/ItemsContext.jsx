import { createContext, useContext, useReducer } from "react";

export const ItemsContext = createContext(null);
export const ItemsDispatchContext = createContext(null);

export function ItemsProvider({ children }) {
  const [items, dispatch] = useReducer(itemsReducer, []);

  const getItemQuantity = (id) => {
    return items.find((item) => item.id === id)?.count || 0;
  };

  return (
    <ItemsContext.Provider value={{ items, getItemQuantity }}>
      <ItemsDispatchContext.Provider value={dispatch}>
        {children}
      </ItemsDispatchContext.Provider>
    </ItemsContext.Provider>
  );
}
const ACTIONS = {
  ADDED: "added",
  INCREASED: "increased",
  DECREASED: "decreased",
  REMOVED: "removed",
};

function itemsReducer(items, action) {
  switch (action.type) {
    case ACTIONS.ADDED: {
      return [...items, { id: action.id, count: 1 }];
    }
    case ACTIONS.INCREASED: {
      return items.map((item) => {
        if (item.id === action.id) {
          return { ...item, count: item.count++ };
        } else {
          return item;
        }
      });
    }
    case ACTIONS.DECREASED: {
      return items.map((item) => {
        if (item.id === action.id) {
          return { ...item, count: item.count-- };
        } else {
          return item;
        }
      });
    }
    case ACTIONS.REMOVED: {
      return items.filter((item) => item.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

// custom hooks
export function useItems() {
  return useContext(ItemsContext);
}

export function useItemsDispatch() {
  return useContext(ItemsDispatchContext);
}
