"use client";

import { forwardRef, useEffect, useState, useRef } from "react";

//components
import Image from "next/image";
import { Button } from "@/components/ui/button";

//types
import { PlatformTypes } from "@/lib/identifyPlatform";
type SelectorButtonType = {
  text: string | undefined;
  ref: React.RefObject<HTMLButtonElement>;
};

//SVGs
import { Link, Unlink } from "lucide-react";

//functions
import identifyPlatform from "@/lib/identifyPlatform";
import isValidLink from "@/lib/isValidLink";

//hooks
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";
import { useActionButton } from "@/lib/stores";

export const LinkAction = forwardRef<HTMLButtonElement, SelectorButtonType>(
  function LinkAction({ text }, ref) {
    const [platform, setPlatform] = useState<PlatformTypes | undefined>();
    const [isValid, setIsValid] = useState(true);
    const src = {
      id: "0",
      name: platform,
      icon: `/media/iconPicker/icons/${platform}.svg`,
    };

    const iconRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    //global state managers
    const setValue = useActionButton((state) => state.setValue);

    //animate button on icon change
    const triggerAnimation = useTactileAnimation(buttonRef, {});

    useEffect(() => {
      if (iconRef.current) {
        if (text) {
          if (isValidLink(text)) {
            const currentPlatform = identifyPlatform(text);
            if (currentPlatform != "Unknown") {
              setPlatform(currentPlatform);
            } else {
              setIsValid(true);
              setPlatform(undefined);
              iconRef.current.style.background = "inherit";
            }
          } else {
            setIsValid(false);
            iconRef.current.style.background = "#FF6F61";
          }
        } else {
          setIsValid(true);
          setPlatform(undefined);
          iconRef.current.style.background = "inherit";
        }
      }
    }, [text]);

    useEffect(() => {
      triggerAnimation();
      if (isValid && platform) {
        setValue(src);
      }
    }, [isValid, platform]);

    return (
      <Button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
              node;
          }
        }}
        size="icon"
        className="h-9 w-9"
        type="button"
      >
        <div
          ref={iconRef}
          className="flex h-full w-full items-center justify-center rounded-md  transition-colors duration-300"
        >
          {isValid ? (
            platform ? (
              <div className="relative aspect-square w-6 sm:w-6">
                <Image
                  src={`/svgs/social/${platform}.svg`}
                  fill={true}
                  alt="card-icon"
                ></Image>
              </div>
            ) : (
              <Link className="h-4 w-4 sm:h-5 sm:w-5"></Link>
            )
          ) : (
            <Unlink className="h-4 w-4 text-primary sm:h-5 sm:w-5"></Unlink>
          )}
        </div>
      </Button>
    );
  }
);
