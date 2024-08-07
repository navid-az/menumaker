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

//~~~~Slider~~~~
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
  updateSectionCount: ActiveHandler<number>;
  increaseActiveStep: ActiveHandler<number>;
  decreaseActiveStep: ActiveHandler<number>;
  updateActiveStepCount: ActiveHandler<number>;
  updateActiveStep: () => void;
  setActiveStep: ActiveHandler<number>;
};

export const useSlider = create<TabsStateType>()((set) => ({
  //sections
  activeSection: 1,
  sectionCount: 1,
  increaseActiveSection: () =>
    set((state) => ({ activeSection: state.activeSection + 1 })),
  decreaseActiveSection: () =>
    set((state) => ({ activeSection: state.activeSection - 1 })),
  updateSectionCount: (sectionCount) =>
    set(() => ({ sectionCount: sectionCount })),

  //steps
  activeStep: 1,
  stepCount: 1,
  activeStepHeight: 0,
  increaseActiveStep: () =>
    set((state) => ({ activeStep: state.activeStep + 1 })),
  decreaseActiveStep: () =>
    set((state) => ({ activeStep: state.activeStep - 1 })),
  updateActiveStepCount: (stepCount) => set(() => ({ stepCount: stepCount })),

  //update active step when active section changes
  updateActiveStep: () =>
    set((state) => ({
      activeStep: state.activeStep == state.stepCount ? 1 : state.stepCount,
    })),

  //set active step to a desired number
  setActiveStep: (stepNum) =>
    set((state) => ({
      activeStep:
        stepNum <= state.stepCount && stepNum >= 1 ? stepNum : state.activeStep,
    })),

  //update the height of the tabs container according to the height of active step
  updateHeight: (height) => set(() => ({ activeStepHeight: height })),
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
