export default function ConnectionsIcon({
  color = '#094A54',
  size = 80,
  style = {},
  ...props
}) {
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 190 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...props}
    >
      <path
        d="M182.083 94.9993C182.083 143.094 143.095 182.083 95.0001 182.083C46.9053 182.083 7.91675 143.094 7.91675 94.9993C7.91675 46.9045 46.9053 7.91602 95.0001 7.91602C143.095 7.91602 182.083 46.9045 182.083 94.9993Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M102.917 79.166C102.917 92.2828 92.2835 102.916 79.1667 102.916C66.05 102.916 55.4167 92.2828 55.4167 79.166C55.4167 66.0492 66.05 55.416 79.1667 55.416C92.2835 55.416 102.917 66.0492 102.917 79.166Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M150.417 98.9577C150.417 105.516 145.1 110.833 138.542 110.833C131.983 110.833 126.667 105.516 126.667 98.9577C126.667 92.3993 131.983 87.0827 138.542 87.0827C145.1 87.0827 150.417 92.3993 150.417 98.9577Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M110.833 138.541C110.833 145.099 105.517 150.416 98.9584 150.416C92.4 150.416 87.0834 145.099 87.0834 138.541C87.0834 131.983 92.4 126.666 98.9584 126.666C105.517 126.666 110.833 131.983 110.833 138.541Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}