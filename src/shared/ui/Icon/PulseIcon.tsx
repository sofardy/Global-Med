
export default function PulseIcon({
  color = '#094A54',
  size = 24,
  style = {},
  className = '',
  ...props
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
      {...props}
    >
      <path 
        d="M22 12H18L15 21L9 3L6 12H2" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}