export function LocationIcon({
  color = '#094A54',
  size = 20,
  style = {},
  ...props
}) {
  const width = size * 0.9;
  
  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...props}
    >
      <g clipPath="url(#clip0_location)">
        <path
          d="M16.3637 8.33334C16.3637 14.1667 9.00011 19.1667 9.00011 19.1667C9.00011 19.1667 1.63647 14.1667 1.63647 8.33334C1.63647 6.34422 2.41228 4.43657 3.79323 3.03004C5.17418 1.62352 7.04715 0.833344 9.00011 0.833344C10.9531 0.833344 12.826 1.62352 14.207 3.03004C15.5879 4.43657 16.3637 6.34422 16.3637 8.33334Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.99996 10.8333C10.3556 10.8333 11.4545 9.71406 11.4545 8.33334C11.4545 6.95263 10.3556 5.83334 8.99996 5.83334C7.64435 5.83334 6.54541 6.95263 6.54541 8.33334C6.54541 9.71406 7.64435 10.8333 8.99996 10.8333Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_location">
          <rect width="18" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}