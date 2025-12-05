import Image from "next/image";
import { useContext } from "react";
import { colors } from "../page";
import Skeleton from "react-loading-skeleton";

export default function Tag({
  name,
  iconSrc = "",
  justIcon = false,
  isLoading,
}) {
  const color = useContext(colors);
  const iconStyles = "relative h-[14px] w-[14px] sm:h-[16px] sm:w-[16px]";

  const defaultTags = {
    vegan: {
      name: "وگان",
      iconSrc: "/images/menu-items/svg/leaf.svg",
    },
    hot: {
      name: "تند",
      iconSrc: "/images/menu-items/svg/fire.svg",
    },
  };
  return (
    <>
      {isLoading ? (
        <Skeleton width={40} className="rounded-full!" />
      ) : (
        <div
          className={`flex bg-${color.secondary} h-full w-max items-center gap-1 rounded-full px-2 py-1`}
        >
          {defaultTags[name] ? (
            <>
              <div className={iconStyles}>
                <Image
                  src={defaultTags[name].iconSrc}
                  alt={defaultTags[name].name}
                  fill={true}
                ></Image>
              </div>
              {justIcon && (
                <p className="text-xs sm:text-sm">{defaultTags[name].name}</p>
              )}
            </>
          ) : (
            <>
              {iconSrc ? (
                <div className={iconStyles}>
                  <Image src={iconSrc} alt={name} fill={true}></Image>
                </div>
              ) : (
                ""
              )}
              <p className="text-xs sm:text-sm">{name}</p>
            </>
          )}
        </div>
      )}
    </>
  );
}
