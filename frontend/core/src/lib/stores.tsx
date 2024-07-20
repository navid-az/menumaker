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

//~~~~BuilderTabs~~~~
type ActiveHandler<T> = (value: T) => void;

type TabsStateType = {
  sectionCount: number;
  stepCount: number;
  activeSection: number;
  activeStepHeight: number;
  activeStep: number;
  updateHeight: ActiveHandler<number>;
  increaseActiveSection: ActiveHandler<number>;
  decreaseActiveSection: ActiveHandler<number>;
  increaseActiveStep: ActiveHandler<number>;
  decreaseActiveStep: ActiveHandler<number>;
  updateActiveStepCount: ActiveHandler<number>;
  updateActiveStep: () => void;
};

export const useBuilderTabs = create<TabsStateType>()((set) => ({
  //sections
  activeSection: 1,
  sectionCount: 3,
  increaseActiveSection: () =>
    set((state) => ({ activeSection: state.activeSection + 1 })),
  decreaseActiveSection: () =>
    set((state) => ({ activeSection: state.activeSection - 1 })),
  //steps
  activeStep: 1,
  stepCount: 1,
  activeStepHeight: 0,
  increaseActiveStep: () =>
    set((state) => ({ activeStep: state.activeStep + 1 })),
  decreaseActiveStep: () =>
    set((state) => ({ activeStep: state.activeStep - 1 })),
  updateActiveStepCount: (stepCount) => set(() => ({ stepCount: stepCount })),
  //if at last step update active step to 1
  //if at first step update active step to stepCount
  updateActiveStep: () =>
    set((state) => ({
      activeStep: state.activeStep == state.stepCount ? 1 : state.stepCount,
    })),
  //update the height of the tabs container according to the height of active step
  updateHeight: (height) => set(() => ({ activeStepHeight: height })),
}));
