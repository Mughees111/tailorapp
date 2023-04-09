import * as React from "react"
import Svg, { ClipPath, Defs, Path, G, LinearGradient, Stop, Circle } from "react-native-svg"
import useColors from "../hooks/useColors"

export function ArrowRight(props) {
  return (
    <Svg
      width={17}
      height={15}
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 7.725a.75.75 0 01.648-.743l.102-.007 13.184.001-4.763-4.744a.75.75 0 01.974-1.135l.084.073 6.05 6.024a.751.751 0 01.22.502l.001.03v.028l-.003.045.003-.074a.753.753 0 01-.148.447l-.006.009a.75.75 0 01-.066.075l-6.05 6.025a.75.75 0 01-1.132-.979l.073-.083 4.761-4.743H.75a.75.75 0 01-.75-.75z"
        fill={props.color ? props.color : "#111"}
      />
    </Svg>
  )
}

export function ArrowDown(props) {
  return (
    <Svg
      width={10}
      height={6}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M.5.75L5 5.25 9.5.75"
        stroke="#FCFCFC"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function FbIcon(props) {
  return (
    <Svg
      width={9}
      height={14}
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.469 14V7.875h2.25l.428-2.534H5.469V3.697c0-.693.374-1.369 1.573-1.369H8.26V.171S7.155 0 6.099 0C3.893 0 2.452 1.214 2.452 3.41v1.931H0v2.534h2.452V14h3.017z"
        fill={useColors('primary')}
      />
    </Svg>
  )
}


export function GoogleIcon(props) {
  return (
    <Svg
      width={15}
      height={14}
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.64 6v2.4h3.97c-.16 1.03-1.2 3.018-3.97 3.018C5.25 11.418 3.3 9.441 3.3 7s1.952-4.418 4.34-4.418c1.36 0 2.27.577 2.791 1.078l1.898-1.83C11.11.692 9.53 0 7.64 0c-3.87 0-7 3.13-7 7s3.13 7 7 7c4.041 0 6.72-2.84 6.72-6.84 0-.46-.049-.811-.11-1.16H7.64z"
        fill={useColors('primary')}
      />
    </Svg>
  )
}

// export function ArrowLeft(props) {
//   return (
//     <Svg
//       width={10}
//       height={15}
//       viewBox="0 0 10 15"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       {...props}
//     >
//       <Path
//         d="M8.118 1.601l-6 6 6 6"
//         stroke={props.color ?? "#FCFCFC"}
//         strokeWidth={2.5}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </Svg>
//   )
// }


export function ChatBtmIcon(props) {
  return (
    <Svg width={25} height={23} viewBox="0 0 25 23" fill="none" {...props}>
      <Path
        d="M15.883 4.846A8.14 8.14 0 00.442 8.413a8.023 8.023 0 00.776 3.466l-.762 3.812a.7.7 0 00.816.818l3.859-.763a8.002 8.002 0 001.611.561 9.51 9.51 0 019.141-11.461z"
        fill={props.color}
      />
      <Path
        d="M23.393 17.81a8.08 8.08 0 00.348-.858h-.023a8.119 8.119 0 00-7.3-10.708 8.11 8.11 0 10-.389 16.21 8.022 8.022 0 003.456-.776c4.227.836 3.9.776 3.994.776a.702.702 0 00.682-.831l-.768-3.813z"
        fill={props.color}
      />
    </Svg>
  )
}


export function HomeActiveBtmIcon(props) {
  return (
    <Svg width={18} height={28.001} viewBox="0 0 18 28.001" {...props}>
      <Defs>
        <LinearGradient
          id="a"
          x1={0.5}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#fbb040" />
          <Stop offset={1} stopColor="#ef4136" />
        </LinearGradient>
      </Defs>
      <Path
        data-name="Union 22"
        d="M-2698 110.5a2.5 2.5 0 012.5-2.5 2.5 2.5 0 012.5 2.5 2.5 2.5 0 01-2.5 2.5 2.5 2.5 0 01-2.5-2.5zm5.26-7.5a.527.527 0 01-.526-.527v-4.237a.887.887 0 00-.886-.885h-1.695a.886.886 0 00-.885.885v4.236a.527.527 0 01-.527.527h-2.873a1.941 1.941 0 01-1.939-1.939v-5.4h-.344a1.645 1.645 0 01-1.1-.483 1.659 1.659 0 010-2.34l.008-.007 7.34-7.339A1.646 1.646 0 01-2695 85a1.646 1.646 0 011.172.486l7.343 7.342a1.66 1.66 0 010 2.343 1.646 1.646 0 01-1.172.486h-.271v5.4a1.941 1.941 0 01-1.94 1.939z"
        transform="translate(2704 -85)"
        fill="url(#a)"
      />
    </Svg>
  )
}

export function HomeBtmIcon(props) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" {...props}>
      <Path
        d="M17.516 7.828L10.172.485a1.657 1.657 0 00-2.344 0L.488 7.823l-.007.008a1.656 1.656 0 001.1 2.823h.344v5.4A1.942 1.942 0 003.867 18H6.74a.527.527 0 00.527-.527v-4.237a.886.886 0 01.885-.885h1.695a.886.886 0 01.885.885v4.236a.527.527 0 00.527.527h2.873a1.942 1.942 0 001.94-1.939v-5.4h.271a1.657 1.657 0 001.173-2.828zm0 0"
        transform="translate(0 .001)"
        fill={props.color ? props.color : "#112d4e"}
      />
    </Svg>
  )
}

export function ProfileActiveBtmIcon(props) {
  return (
    <Svg width={15.017} height={28} viewBox="0 0 15.017 28" {...props}>
      <Defs>
        <LinearGradient
          id="a"
          x1={0.5}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#fbb040" />
          <Stop offset={1} stopColor="#ef4136" />
        </LinearGradient>
      </Defs>
      <Path
        data-name="Union 23"
        d="M-4067 1106.5a2.5 2.5 0 012.5-2.5 2.5 2.5 0 012.5 2.5 2.5 2.5 0 01-2.5 2.5 2.5 2.5 0 01-2.5-2.5zm-1.825-7.5a3.194 3.194 0 01-2.287-.835 2.986 2.986 0 01-.888-2.26c0-.362.012-.719.036-1.063a10.75 10.75 0 01.146-1.138 8.727 8.727 0 01.28-1.144 5.69 5.69 0 01.469-1.067 4.023 4.023 0 01.709-.923 3.119 3.119 0 011.018-.64 3.513 3.513 0 011.3-.236 1.32 1.32 0 01.705.3c.214.139.461.3.735.473a4.172 4.172 0 00.948.418 3.776 3.776 0 001.162.188 3.774 3.774 0 001.162-.188 4.184 4.184 0 00.949-.418c.276-.177.523-.335.734-.473a1.318 1.318 0 01.705-.3 3.512 3.512 0 011.3.236 3.106 3.106 0 011.018.64 4.008 4.008 0 01.709.924 5.671 5.671 0 01.47 1.066 9.135 9.135 0 01.28 1.144 10.467 10.467 0 01.145 1.137c.025.342.037.7.037 1.063a2.985 2.985 0 01-.888 2.262 3.193 3.193 0 01-2.287.835zm1.155-10.6a4.2 4.2 0 01-1.27-3.066 4.2 4.2 0 011.27-3.065 4.2 4.2 0 013.065-1.27 4.2 4.2 0 013.066 1.27 4.194 4.194 0 011.27 3.065 4.194 4.194 0 01-1.27 3.066 4.2 4.2 0 01-3.066 1.27 4.2 4.2 0 01-3.065-1.27z"
        transform="translate(4072 -1081)"
        fill="url(#a)"
      />
    </Svg>
  )
}

export function ProfileBtmIcon(props) {
  return (
    <Svg width={15.017} height={18} viewBox="0 0 15.017 18" {...props}>
      <Path
        data-name="Union 11"
        d="M-2661.825 830a3.2 3.2 0 01-2.287-.834 2.988 2.988 0 01-.888-2.266c0-.361.012-.719.036-1.063a10.726 10.726 0 01.146-1.138 9 9 0 01.28-1.143 5.668 5.668 0 01.47-1.067 4.033 4.033 0 01.709-.924 3.123 3.123 0 011.018-.64 3.515 3.515 0 011.3-.235 1.318 1.318 0 01.7.3c.214.14.462.3.735.474a4.2 4.2 0 00.949.418 3.775 3.775 0 001.162.188 3.769 3.769 0 001.161-.188 4.208 4.208 0 00.95-.418c.276-.176.523-.335.734-.473a1.32 1.32 0 01.7-.3 3.52 3.52 0 011.3.235 3.126 3.126 0 011.018.64 4.019 4.019 0 01.709.924 5.657 5.657 0 01.47 1.066 8.959 8.959 0 01.28 1.144 10.7 10.7 0 01.146 1.137c.024.343.036.7.036 1.063a2.988 2.988 0 01-.888 2.261 3.2 3.2 0 01-2.287.834zm1.155-10.6a4.2 4.2 0 01-1.27-3.065 4.2 4.2 0 011.27-3.065 4.2 4.2 0 013.07-1.27 4.2 4.2 0 013.065 1.27 4.2 4.2 0 011.27 3.065 4.2 4.2 0 01-1.27 3.065 4.2 4.2 0 01-3.065 1.27 4.2 4.2 0 01-3.07-1.27z"
        transform="translate(2665 -812)"
        fill={props.color ? props.color : "#112d4e"}
      />
    </Svg>
  )
}


export function PlusIcon(props) {
  return (
    <Svg width={props.width ?? 30} height={props.height ? props.height : 30} viewBox="0 0 30 30" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.363 29.5c-1.001 0-1.813-1.104-1.813-2.464V2.964c0-1.36.812-2.464 1.813-2.464 1 0 1.812 1.104 1.812 2.464v24.072c0 1.36-.812 2.464-1.813 2.464z"
        fill={props.color ?? "#fff"}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.056 17.175H2.964C1.601 17.175.5 16.363.5 15.362c0-1 1.1-1.812 2.464-1.812h24.092c1.36 0 2.464.812 2.464 1.813 0 1-1.104 1.812-2.464 1.812z"
        fill={props.color ?? "#fff"}
      />
    </Svg>
  )
}

export function ArrowLeft(props) {
  return (
    <Svg
      width={10}
      height={19}
      viewBox="0 0 10 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8.118 1.601l-6 6 6 6"
        stroke={props.color ? props.color : "#FCFCFC"}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}


export function TickIcon(props) {
  return (
    <Svg
      width={props.width ? props.width : 8}
      height={props.height ? props.height : 7}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 11"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            d="M3.031 9.4L.776 6.713a.862.862 0 011.32-1.108L3.685 7.5 10.644.78a.941.941 0 111.308 1.354L4.437 9.392a.939.939 0 01-.318.203A.858.858 0 013.03 9.4z"
            fill="#fff"
          />
        </ClipPath>
      </Defs>
      <Path
        d="M3.918 9.77L1.663 7.083a.862.862 0 011.32-1.108l1.59 1.895L11.53 1.15a.941.941 0 111.308 1.354L5.324 9.762a.939.939 0 01-.319.203.858.858 0 01-1.087-.195z"
        fill="#5b4dbc"
      />
      <Path
        d="M3.031 9.4L.776 6.713a.862.862 0 011.32-1.108L3.685 7.5v0L10.644.78a.941.941 0 111.308 1.354L4.437 9.392a.939.939 0 01-.318.203A.858.858 0 013.03 9.4z"
        fillOpacity={0}
        fill="#fff"
        stroke={props.color ?? "#000"}
        strokeMiterlimit={20}
        strokeWidth={2}
        clipPath='url("#a")'
      />
    </Svg >
  )
}

export function NotifIcon(props) {
  return (
    <Svg
      data-name="Group 294"
      xmlns="http://www.w3.org/2000/svg"
      width={18.975}
      height={21.764}
      viewBox="0 0 18.975 21.764"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 230"
            fill="none"
            d="M0 0H18.975V21.764H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 293" clipPath="url(#a)" fill={props.color ?? "#161615"}>
        <Path
          data-name="Path 1046"
          d="M10.338 0a15.956 15.956 0 012.428 1.305 6.652 6.652 0 012.418 5.4 12.637 12.637 0 003.277 8.257c.425.489.344 1.417.515 2.234H.065A2.915 2.915 0 01.71 14.5a11.089 11.089 0 002.954-7.436c.074-2.226.565-4.318 2.444-5.756A16.756 16.756 0 018.531 0h1.806"
        />
        <Path
          data-name="Path 1047"
          d="M40.93 100.626a2.988 2.988 0 01-2.978 3.5 3.108 3.108 0 01-3.168-3.5z"
          transform="translate(-28.456 -82.361)"
        />
      </G>
    </Svg>
  )
}


export function SettingsIcon(props) {
  return (
    <Svg
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#clip0_117_3787)"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M8 10.376a2 2 0 100-4 2 2 0 000 4z" />
        <Path d="M12.933 10.376a1.1 1.1 0 00.22 1.213l.04.04a1.333 1.333 0 11-1.886 1.887l-.04-.04a1.1 1.1 0 00-1.214-.22 1.1 1.1 0 00-.666 1.007v.113a1.333 1.333 0 01-2.667 0v-.06A1.1 1.1 0 006 13.31a1.1 1.1 0 00-1.213.22l-.04.04a1.333 1.333 0 01-2.176-1.454c.067-.161.165-.308.29-.432l.04-.04a1.1 1.1 0 00.22-1.214 1.1 1.1 0 00-1.008-.666H2a1.333 1.333 0 110-2.667h.06a1.1 1.1 0 001.007-.72 1.1 1.1 0 00-.22-1.213l-.04-.04a1.333 1.333 0 111.886-1.887l.04.04a1.1 1.1 0 001.214.22H6a1.1 1.1 0 00.667-1.007v-.113a1.333 1.333 0 112.666 0v.06A1.1 1.1 0 0010 3.443a1.1 1.1 0 001.213-.22l.04-.04a1.333 1.333 0 111.887 1.886l-.04.04a1.1 1.1 0 00-.22 1.214v.053a1.1 1.1 0 001.007.667H14a1.333 1.333 0 010 2.666h-.06a1.1 1.1 0 00-1.007.667v0z" />
      </G>
      <Defs>
        <ClipPath id="clip0_117_3787">
          <Path fill="#fff" transform="translate(0 .376)" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export function TermsIcon(props) {
  return (
    <Svg
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#clip0_117_3778)"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M8 15.495A6.667 6.667 0 108 2.16a6.667 6.667 0 000 13.334z" />
        <Path d="M10.827 6.001l-1.414 4.24-4.24 1.414 1.414-4.24L10.827 6z" />
      </G>
      <Defs>
        <ClipPath id="clip0_117_3778">
          <Path fill="#fff" transform="translate(0 .828)" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export function LogoutIcon(props) {
  return (
    <Svg
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10 2.36h2.667A1.333 1.333 0 0114 3.693v9.334a1.333 1.333 0 01-1.333 1.333H10M6.667 11.693L10 8.36 6.667 5.027M10 8.36H2"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function PaymentMethodIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#clip0_117_3815)"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M14 2.667H2C1.264 2.667.667 3.263.667 4v8c0 .736.597 1.333 1.333 1.333h12c.736 0 1.333-.597 1.333-1.333V4c0-.737-.597-1.333-1.333-1.333zM.667 6.667h14.666" />
      </G>
      <Defs>
        <ClipPath id="clip0_117_3815">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export function HeartSettingIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.893 3.073a3.667 3.667 0 00-5.186 0L8 3.78l-.707-.707A3.668 3.668 0 002.107 8.26l.706.707L8 14.153l5.187-5.186.706-.707a3.667 3.667 0 000-5.187z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function ArrowForward(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9 18l6-6-6-6"
        stroke={props.color ? props.color : "#FCFCFC"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function ThemeIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 472.586 472.586"
      xmlSpace="preserve"
      enableBackground="new 0 0 472.586 472.586"
      {...props}
    >
      <Circle
        fill={props.color ?? "#111111"}
        cx={236.308} cy={236.308} r={84.569} />
      <Path
        fill={props.color ?? "#111111"}
        d="M226.462 0H246.154V104.635H226.462z" />
      <Path
        fill={props.color ?? "#111111"}
        transform="rotate(-45.001 106.212 106.209)"
        d="M96.367 53.889H116.059V158.525H96.367z"
      />
      <Path
        fill={props.color ?? "#111111"}
        d="M0 226.462H104.635V246.154H0z" />
      <Path
        fill={props.color ?? "#111111"}
        transform="rotate(-45.001 106.17 366.38)"
        d="M53.867 356.544H158.502V376.236H53.867z"
      />
      <Path fill={props.color ?? "#111111"} d="M226.462 367.951H246.154V472.586H226.462z" />
      <Path
        fill={props.color ?? "#111111"}
        transform="rotate(-45.001 366.385 366.404)"
        d="M356.536 314.078H376.228V418.71299999999997H356.536z"
      />
      <Path fill={props.color ?? "#111111"} d="M367.951 226.462H472.586V246.154H367.951z" />
      <Path
        fill={props.color ?? "#111111"}
        transform="rotate(-45.001 366.393 106.217)"
        d="M314.092 96.364H418.727V116.05600000000001H314.092z"
      />
    </Svg>
  )
}


export function AudioPlayIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 58 58"
      xmlSpace="preserve"
      enableBackground="new 0 0 58 58"
      width={35}
      height={35}
      {...props}
    >
      {/* <Circle cx={29} cy={29} r={29} fill={"#455A64"} /> */}
      <Path d="M44 29L22 44 22 29.273 22 14z" fill={props.color ?? "#111"} />
      <Path
        d="M22 45a.999.999 0 01-1-1V14a.999.999 0 011.564-.826l22 15a1.001 1.001 0 01-.001 1.652l-22 15A1.002 1.002 0 0122 45zm1-29.107v26.215L42.225 29 23 15.893z"
        fill={props.color ?? "#111"}
      />
    </Svg>
  )
}

export function AudioStopIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 1000 1000"
      width={35}
      height={35}
      {...props}
    >
      <Path
        d="M4682.9 5006.2c-520-52-826.2-113.6-1234.5-248.4-728-240.7-1363.5-631.7-1914.3-1184.4C777.3 2818.5 309.3 1884.5 145.6 815.6c-50-325.4-61.6-986-21.2-1286.4 148.3-1124.7 618.2-2095.3 1390.5-2869.5 604.7-608.6 1257.6-999.5 2095.3-1259.5 421.8-131 872.4-192.6 1400.1-192.6 697.1 1.9 1271 117.5 1914.3 385.2C8068.5-3927.7 9035.3-2960.9 9514.8-1817 9784.4-1169.9 9900-598 9900 106.9c0 787.7-157.9 1473.3-498.8 2166.6-248.4 502.6-543.1 912.8-953.3 1319.2C7706.5 4330.3 6757 4806 5719 4960c-252.3 36.6-855.1 65.5-1036.1 46.2zM4365.1 106.9v-3139.1h-1348V3246h1348V106.9zm2532.5 0v-3129.5h-1348l-5.8 3110.2c-1.9 1710.1 0 3121.8 5.8 3135.2 5.8 19.3 152.1 23.1 677.9 19.3l670.2-5.8V106.9z"
        transform="matrix(.1 0 0 -.1 0 511)"
        fill={"#ffffff"}
      />
    </Svg>
  )
}
