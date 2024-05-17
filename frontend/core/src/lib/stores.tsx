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
