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
        strokeWidth={strokeWidth}
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
export function Radar({
  size = 24,
  primaryColor = "#C5E5E9",
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
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.9001 19.1C1.0001 15.2 1.0001 8.8 4.9001 4.9"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.79995 16.2C5.49995 13.9 5.49995 10.1 7.79995 7.7"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2 7.8C18.5 10.1 18.5 13.9 16.2 16.3"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.1001 4.9C23.0001 8.8 23.0001 15.1 19.1001 19"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ScrollText({
  size = 24,
  primaryColor = "#C5E5E9",
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
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 21H20C20.5304 21 21.0391 20.7893 21.4142 20.4142C21.7893 20.0391 22 19.5304 22 19V17H10V19C10 19.5304 9.78929 20.0391 9.41421 20.4142C9.03914 20.7893 8.53043 21 8 21ZM8 21C7.46957 21 6.96086 20.7893 6.58579 20.4142C6.21071 20.0391 6 19.5304 6 19V5C6 4.46957 5.78929 3.96086 5.41421 3.58579C5.03914 3.21071 4.53043 3 4 3C3.46957 3 2.96086 3.21071 2.58579 3.58579C2.21071 3.96086 2 4.46957 2 5V8H6"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 17V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H4"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 8H10"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 12H10"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Chart({
  size = 24,
  primaryColor = "#C5E5E9",
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
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 3V21H21"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 17V9"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 17V5"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 17V14"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Settings({
  size = 24,
  primaryColor = "#C5E5E9",
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
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.22 2H11.78C11.2496 2 10.7409 2.21071 10.3658 2.58579C9.99072 2.96086 9.78 3.46957 9.78 4V4.18C9.77964 4.53073 9.68706 4.87519 9.51154 5.17884C9.33602 5.48248 9.08374 5.73464 8.78 5.91L8.35 6.16C8.04596 6.33554 7.70108 6.42795 7.35 6.42795C6.99893 6.42795 6.65404 6.33554 6.35 6.16L6.2 6.08C5.74107 5.81526 5.19584 5.74344 4.684 5.88031C4.17217 6.01717 3.73555 6.35154 3.47 6.81L3.25 7.19C2.98526 7.64893 2.91345 8.19416 3.05031 8.706C3.18717 9.21783 3.52154 9.65445 3.98 9.92L4.13 10.02C4.43228 10.1945 4.68362 10.4451 4.85905 10.7468C5.03448 11.0486 5.1279 11.391 5.13 11.74V12.25C5.1314 12.6024 5.03965 12.949 4.86405 13.2545C4.68844 13.5601 4.43521 13.8138 4.13 13.99L3.98 14.08C3.52154 14.3456 3.18717 14.7822 3.05031 15.294C2.91345 15.8058 2.98526 16.3511 3.25 16.81L3.47 17.19C3.73555 17.6485 4.17217 17.9828 4.684 18.1197C5.19584 18.2566 5.74107 18.1847 6.2 17.92L6.35 17.84C6.65404 17.6645 6.99893 17.5721 7.35 17.5721C7.70108 17.5721 8.04596 17.6645 8.35 17.84L8.78 18.09C9.08374 18.2654 9.33602 18.5175 9.51154 18.8212C9.68706 19.1248 9.77964 19.4693 9.78 19.82V20C9.78 20.5304 9.99072 21.0391 10.3658 21.4142C10.7409 21.7893 11.2496 22 11.78 22H12.22C12.7504 22 13.2591 21.7893 13.6342 21.4142C14.0093 21.0391 14.22 20.5304 14.22 20V19.82C14.2204 19.4693 14.3129 19.1248 14.4885 18.8212C14.664 18.5175 14.9163 18.2654 15.22 18.09L15.65 17.84C15.954 17.6645 16.2989 17.5721 16.65 17.5721C17.0011 17.5721 17.346 17.6645 17.65 17.84L17.8 17.92C18.2589 18.1847 18.8042 18.2566 19.316 18.1197C19.8278 17.9828 20.2645 17.6485 20.53 17.19L20.75 16.8C21.0147 16.3411 21.0866 15.7958 20.9497 15.284C20.8128 14.7722 20.4785 14.3356 20.02 14.07L19.87 13.99C19.5648 13.8138 19.3116 13.5601 19.136 13.2545C18.9604 12.949 18.8686 12.6024 18.87 12.25V11.75C18.8686 11.3976 18.9604 11.051 19.136 10.7455C19.3116 10.4399 19.5648 10.1862 19.87 10.01L20.02 9.92C20.4785 9.65445 20.8128 9.21783 20.9497 8.706C21.0866 8.19416 21.0147 7.64893 20.75 7.19L20.53 6.81C20.2645 6.35154 19.8278 6.01717 19.316 5.88031C18.8042 5.74344 18.2589 5.81526 17.8 6.08L17.65 6.16C17.346 6.33554 17.0011 6.42795 16.65 6.42795C16.2989 6.42795 15.954 6.33554 15.65 6.16L15.22 5.91C14.9163 5.73464 14.664 5.48248 14.4885 5.17884C14.3129 4.87519 14.2204 4.53073 14.22 4.18V4C14.22 3.46957 14.0093 2.96086 13.6342 2.58579C13.2591 2.21071 12.7504 2 12.22 2Z"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
