import { create } from "zustand";

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

//for myPlacesTab component
type placeState = {
  currentPlace: string;
};
type placeAction = {
  updateCurrentPlace: (currentPlace: placeState["currentPlace"]) => void;
};
export const useCurrentPlaceStore = create<placeState & placeAction>((set) => ({
  currentPlace: "",
  updateCurrentPlace: (currentPlace: string) =>
    set(() => ({ currentPlace: currentPlace })),
}));

//BuilderTabs
type TabsStateType = {
  sectionCount: number;
  activeSection: number;
  activeSectionHeight: number;
  changeActiveSectionHeight: (height: number) => void;
  increaseActiveSection: (activeSection: number) => void;
  decreaseActiveSection: (activeSection: number) => void;
};
export const useBuilderTabs = create<TabsStateType>()((set) => ({
  sectionCount: 4,
  activeSection: 1,
  activeSectionHeight: 0,
  changeActiveSectionHeight: (height) =>
    set(() => ({ activeSectionHeight: height })),
  increaseActiveSection: () =>
    set((state) => ({ activeSection: state.activeSection + 1 })),
  decreaseActiveSection: () =>
    set((state) => ({ activeSection: state.activeSection - 1 })),
}));
