import React from "react";

//libraries
import { cn } from "@/lib/utils";

export function CloudCheck({
  size = 24,
  primaryColor = "#EDFDFF",
  secondaryColor = "#94D9E2",
  strokeWidth = 2,
  className,
}: {
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      className={cn(className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 15L11.5 20.5L9 18"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.00003 17.743C4.08292 17.104 3.33217 16.2547 2.81058 15.2661C2.28899 14.2775 2.01172 13.1784 2.00198 12.0606C1.99223 10.9429 2.25029 9.83912 2.75456 8.84157C3.25884 7.84403 3.99467 6.98175 4.90049 6.32686C5.80632 5.67198 6.8558 5.24354 7.96114 5.07738C9.06648 4.91122 10.1955 5.01218 11.2539 5.3718C12.3122 5.73143 13.269 6.33926 14.0443 7.14446C14.8196 7.94966 15.3907 8.92881 15.71 10H17.5C18.5612 10.0004 19.5882 10.3759 20.3994 11.06C21.2106 11.7442 21.7539 12.6931 21.9334 13.739C22.1129 14.7849 21.9169 15.8606 21.3802 16.7761C20.8434 17.6915 20.0004 18.3878 19 18.742"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClockAlert({
  size = 24,
  primaryColor = "#EDFDFF",
  secondaryColor = "#94D9E2",
  strokeWidth = 2,
  className,
}: {
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      className={cn(className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6V12L16 14"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12V17"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 21H20.01"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.25 8.2C20.4957 6.36137 19.2106 4.7892 17.5588 3.68413C15.9071 2.57905 13.9635 1.99121 11.9761 1.99561C9.98881 2.00001 8.04785 2.59646 6.40098 3.70884C4.75412 4.82122 3.47605 6.39907 2.72989 8.24102C1.98373 10.083 1.80332 12.1055 2.21169 14.0504C2.62005 15.9954 3.59868 17.7745 5.02265 19.1608C6.44663 20.5471 8.25138 21.4777 10.2066 21.8338C12.1617 22.1898 14.1787 21.9553 16 21.16"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Users({
  size = 24,
  primaryColor = "#EDFDFF",
  secondaryColor = "#94D9E2",
  strokeWidth = 2,
  className,
}: {
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      className={cn(className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
        stroke={secondaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Infinity({
  size = 24,
  primaryColor = "#EDFDFF",
  secondaryColor = "#94D9E2",
  strokeWidth = 2,
  className,
}: {
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      className={cn(className)}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.00008 13.3333C9.16675 13.3333 10.8334 6.66666 15.0001 6.66666C15.8841 6.66666 16.732 7.01785 17.3571 7.64297C17.9822 8.2681 18.3334 9.11594 18.3334 10C18.3334 10.8841 17.9822 11.7319 17.3571 12.357C16.732 12.9821 15.8841 13.3333 15.0001 13.3333C10.8334 13.3333 9.16675 6.66666 5.00008 6.66666C4.11603 6.66666 3.26818 7.01785 2.64306 7.64297C2.01794 8.2681 1.66675 9.11594 1.66675 10C1.66675 10.8841 2.01794 11.7319 2.64306 12.357C3.26818 12.9821 4.11603 13.3333 5.00008 13.3333Z"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0001 10.0001C9.16675 10.4167 8.75008 12.9168 5.00008 13.3334C4.11603 13.3334 3.26818 12.9821 2.64306 12.357C2.01794 11.7319 1.66675 10.8841 1.66675 10C1.66675 9.11594 2.01794 8.2681 2.64306 7.64298C3.26818 7.01786 4.12144 6.56902 5.00008 6.66667C7.76572 6.97401 7.77796 7.77794 10.0001 10.0001Z"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
