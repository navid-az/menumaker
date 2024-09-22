import React, { createContext, useContext, useReducer } from "react";

export const ItemsContext = createContext<contextType>({});
export const ItemsDispatchContext = createContext(null);

export function ItemsProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(itemsReducer, []);

  const getItemQuantity = (id: string) => {
    return items.find((item: ItemType) => item.id === id)?.quantity || 0;
  };

  return (
    <ItemsContext.Provider value={{ items, getItemQuantity }}>
      <ItemsDispatchContext.Provider value={dispatch}>
        {children}
      </ItemsDispatchContext.Provider>
    </ItemsContext.Provider>
  );
}

type contextType = {
  items: ItemType[];
  getItemQuantity: (id: string) => number;
};
enum ACTIONS {
  ADDED,
  INCREASED,
  DECREASED,
  REMOVED,
}

type ItemType = {
  id: string;
  quantity: number;
};
type ItemsType = ItemType[];
type ReducerActionType = ItemType & { type: ACTIONS };

const itemsReducer = (items: ItemsType, action: ReducerActionType) => {
  switch (action.type) {
    case ACTIONS.ADDED: {
      return [...items, { id: action.id, quantity: 1 }];
    }
    case ACTIONS.INCREASED: {
      return items.map((item) => {
        if (item.id === action.id) {
          return { ...item, quantity: item.quantity++ };
        } else {
          return item;
        }
      });
    }
    case ACTIONS.DECREASED: {
      return items.map((item) => {
        if (item.id === action.id) {
          return { ...item, quantity: item.quantity-- };
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
};

// custom hooks
export function useItems() {
  return useContext(ItemsContext);
}

export function useItemsDispatch() {
  return useContext(ItemsDispatchContext);
}
