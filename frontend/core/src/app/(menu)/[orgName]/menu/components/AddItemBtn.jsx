import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AddItemBtn({
  primaryColor,
  secondaryColor,
  type = "square",
}) {
  const [borderRadius, setBorderRadius] = useState("");
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (type == "circle") {
      setBorderRadius("rounded-full");
    } else if (type == "square") {
      setBorderRadius("rounded-md");
    }
  }, []);

  const handleValue = (btnName) => {
    if (btnName === "increment") {
      setValue((prevValue) => prevValue + 1);
    } else {
      setValue((prevValue) => prevValue - 1);
    }
  };

  return (
    <div className={`flex h-full w-20 sm:w-28 ${borderRadius}`}>
      {value > 0 ? (
        <section
          className={`flex h-full w-full items-center ${borderRadius} bg-${secondaryColor} justify-between p-[2px] sm:p-1`}
        >
          {value > 1 ? (
            <ValueChangerBtn
              borderRadius={borderRadius}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              name="decrement"
              iconSrc={"/images/menu-items/svg/minus.svg"}
              action={(name) => handleValue(name)}
            ></ValueChangerBtn>
          ) : (
            <ValueChangerBtn
              borderRadius={borderRadius}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              name="decrement"
              iconSrc={"/images/menu-items/svg/trash.svg"}
              action={(name) => handleValue(name)}
            ></ValueChangerBtn>
          )}

          <span className="mt-[3px] flex-initial">
            <p className={`sm:text-xl text-${primaryColor}`}>{value}</p>
          </span>
          <ValueChangerBtn
            borderRadius={borderRadius}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            name="increment"
            iconSrc={"/images/menu-items/svg/plus.svg"}
            action={(name) => handleValue(name)}
          ></ValueChangerBtn>
        </section>
      ) : (
        <button
          className={`flex h-full w-full flex-none items-center ${borderRadius} gap-2 bg-${secondaryColor} justify-center px-4 sm:gap-4`}
          onClick={() => setValue((prevValue) => prevValue + 1)}
        >
          <p className=" flex-initial text-xs font-semibold sm:text-base">
            افزودن
          </p>
          <div className="relative h-4 w-4 flex-none justify-center sm:h-6 sm:w-6">
            <Image
              src={"/images/menu-items/svg/plus.svg"}
              alt="افزودن"
              style={{ objectFit: "cover" }}
              fill={true}
            ></Image>
          </div>
        </button>
      )}
    </div>
  );
}

const ValueChangerBtn = ({
  name,
  iconSrc,
  action,
  primaryColor,
  secondaryColor,
  borderRadius,
}) => {
  const valueBtn = useRef(null);
  useEffect(() => {
    let height = valueBtn.current.offsetHeight + "px";
    valueBtn.current.style.width = height;
  }, []);
  return (
    <button
      ref={valueBtn}
      name={name}
      onClick={() => action(name)}
      className={`relative h-full w-8 rounded-[4px] ${borderRadius} bg-${primaryColor}`}
    >
      <Image
        style={{
          filter:
            "invert(87%) sepia(20%) saturate(653%) hue-rotate(144deg) brightness(92%) contrast(91%)",
        }}
        fill={true}
        src={iconSrc}
        alt={name}
      ></Image>
    </button>
  );
};
