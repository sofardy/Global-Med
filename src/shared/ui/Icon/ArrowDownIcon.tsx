export default function ArrowDownIcon({
  color = '#094A54',
  size = 12,
  style = {},
  ...props
}) {
  const height = size / 2;
  
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 12 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...props}
    >
      <path
        d="M0.857178 0.75L6.00003 5.25L11.1429 0.75"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}