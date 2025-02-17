import { create } from "zustand";

//types
import { ItemType } from "@/components/global/ItemAdder";

type State = {
  phoneNumber: string;
};
type Action = {
  updatePhoneNumber: (phoneNumber: State["phoneNumber"]) => void;
};

export const usePhoneNumberStore = create<State & Action>()((set) => ({
  phoneNumber: "",
  updatePhoneNumber: (phoneNumber) => set(() => ({ phoneNumber: phoneNumber })),
}));

//~~~~myBusinessesTab~~~~
type businessState = {
  currentBusiness: string;
};
type businessAction = {
  updateCurrentBusiness: (
    currentBusiness: businessState["currentBusiness"]
  ) => void;
};
export const useCurrentBusinessStore = create<businessState & businessAction>(
  (set) => ({
    currentBusiness: "",
    updateCurrentBusiness: (currentBusiness: string) =>
      set(() => ({ currentBusiness: currentBusiness })),
  })
);

//~~~~Slider~~~~
type ActiveHandler<T> = (value: T) => void;

type TabsStateType = {
  sectionCount: number;
  stepCount: number;
  activeSection: number;
  activeStepHeight: number;
  activeStep: number;
  updateHeight: ActiveHandler<number>;
  updateSectionCount: ActiveHandler<number>;
  updateActiveStepCount: ActiveHandler<number>;
  setActiveStep: ActiveHandler<number>;
  next: () => void;
  previous: () => void;
  reset: () => void;
};

export const useSlider = create<TabsStateType>()((set, get) => ({
  //sections
  activeSection: 1,
  sectionCount: 1,
  updateSectionCount: (sectionCount) =>
    set(() => ({ sectionCount: sectionCount })),

  //steps
  activeStep: 1,
  stepCount: 1,
  activeStepHeight: 0,
  updateActiveStepCount: (stepCount) => set(() => ({ stepCount: stepCount })),

  //set active step to a desired number
  setActiveStep: (stepNum) =>
    set((state) => ({
      activeStep:
        stepNum <= state.stepCount && stepNum >= 1 ? stepNum : state.activeStep,
    })),

  //update the height of the tabs container according to the height of active step
  updateHeight: (height) => set(() => ({ activeStepHeight: height })),

  // next function
  next: () => {
    const state = get(); // Use get to access the current state
    if (state.activeStep != state.stepCount) {
      set({ activeStep: state.activeStep + 1 });
    } else if (
      state.activeStep == state.stepCount &&
      state.activeSection != state.sectionCount
    ) {
      set({
        activeSection: state.activeSection + 1,
        activeStep: state.activeStep == state.stepCount ? 1 : state.stepCount,
      });
    }
  },
  // previous function
  previous: () => {
    const state = get(); // Use get to access the current state
    if (state.activeStep > 1) {
      set({ activeStep: state.activeStep - 1 });
    } else if (state.activeStep === 1 && state.activeSection !== 1) {
      set({
        activeSection: state.activeSection - 1,
      });
      setTimeout(() => {
        const updatedState = get(); // Re-fetch the state inside the timeout
        set({
          activeStep:
            updatedState.activeStep === updatedState.stepCount
              ? 1
              : updatedState.stepCount,
        });
      });
    }
  },

  reset: () =>
    set({
      activeStep: 1,
      activeSection: 1,
      sectionCount: 1,
      stepCount: 1,
      activeStepHeight: 0,
    }),
}));

//~~~~slider titles & subtitles~~~~
type builderTitleType = {
  title: string;
  updateTitle: (title: string) => void;
  subtitle: string;
  updateSubtitle: (subtitle: string) => void;
};

export const useSliderTitle = create<builderTitleType>()((set) => ({
  title: "",
  updateTitle: (title) => set(() => ({ title: title })),
  subtitle: "",
  updateSubtitle: (subtitle) => set(() => ({ subtitle: subtitle })),
}));

//~~~~ItemAdder ActionButton~~~~
type ActionButtonType = {
  id: number | string;
  icon: string;
  name: string;
  resetValue: () => void;
  setValue: (item: ItemType) => void;
};
export const useActionButton = create<ActionButtonType>((set) => ({
  id: 0,
  icon: "",
  name: "",
  resetValue: () =>
    set(() => ({
      id: 0,
      icon: "",
      name: "",
    })),
  setValue: (item) =>
    set(() => ({ id: item.id, icon: item.icon, name: item.name })),
}));

//~~~~ItemAdder ActionButton~~~~
type CategoryBtn = {
  activeCategory: string;
  shouldAutoAnimate: boolean;
  updateShouldAutoAnimate: (value: boolean) => void;
  updateActiveCategory: (id: string) => void;
};

export const useCategoryBtn = create<CategoryBtn>()((set) => ({
  activeCategory: "",
  shouldAutoAnimate: true,
  updateShouldAutoAnimate: (value) =>
    set(() => ({
      shouldAutoAnimate: value,
    })),
  updateActiveCategory: (id) => set(() => ({ activeCategory: id })),
}));

//~~~~ItemCart~~~~
type ItemCartType = { id: number; count: number };
type ItemCart = {
  items: ItemCartType[];
  incrementItemCount: (id: number) => void;
  decrementItemCount: (id: number) => void;
  removeItem: (id: number) => void;
  updateItems: (id: number) => void;
};
export const useItemCart = create<ItemCart>()((set) => ({
  items: [],
  updateItems: (newItemId) => {
    set((state) => ({
      items: [...state.items, { id: newItemId, count: 1 }],
    }));
  },
  incrementItemCount: (id) => {
    set((state) => ({
      items: state.items.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem
      ),
    }));
  },
  decrementItemCount: (id) => {
    set((state) => ({
      items: state.items.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count - 1 }
          : cartItem
      ),
    }));
  },
  removeItem: (id) => {
    set((state) => {
      return { items: state.items.filter((item) => item.id != id) };
    });
  },
}));

//~~~~MenuItem/item-info-drawer~~~~
type useMenuItemDrawerType = {
  isOpen: boolean;
  updateIsOpen: () => void;
};
export const useMenuItemDrawer = create<useMenuItemDrawerType>()((set) => ({
  isOpen: false,
  updateIsOpen: () => {
    set((state) => {
      return { isOpen: !state.isOpen };
    });
  },
}));

//~~~~ColorPalette~~~~
type useColorPaletteType = {
  colors: string[];
  selectedColor: string;
  updateSelectedColor: (color: string) => void;
  updateColor: (color: string) => void;
  removeColor: (Index?: number) => void;
  changeColorPalette: (palette: string[]) => void; //for changing the entire color palette with a new one
};
export const useColorPalette = create<useColorPaletteType>()((set) => ({
  colors: ["#ff7118", "#fffed5"],
  selectedColor: "#ff7118",
  updateSelectedColor: (color) => set(() => ({ selectedColor: color })),
  updateColor: (color) => {
    set((state) => {
      if (state.colors.length <= 4) {
        return {
          colors: [...state.colors, color],
        };
      }
      return state;
    });
  },
  removeColor: (index) => {
    set((state) => {
      if (state.colors.length >= 3) {
        if (index !== undefined) {
          //remove an specific color
          return { colors: state.colors.filter((_, i) => i !== index) };
        } else {
          //remove last color
          return { colors: state.colors.slice(0, -1) };
        }
      }
      return state;
    });
  },
  changeColorPalette: (palette) => {
    set(() => ({ colors: palette }));
  },
}));
