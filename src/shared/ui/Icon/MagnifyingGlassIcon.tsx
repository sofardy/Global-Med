export default function MagnifyingGlassIcon({
  color = '#094A54',
  size = 216,
  style = {},
  ...props
}) {
  // Calculate width while maintaining aspect ratio
  const aspectRatio = 167/216;
  const width = size * aspectRatio;
  
  return (
    <svg 
      width={width} 
      height={size} 
      viewBox="0 0 167 216" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...props}
    >
      <path 
        d="M149.468 89.5602C140.634 120.838 108.109 139.031 76.8209 130.194C45.533 121.357 27.3309 88.8375 36.1649 57.5596C44.9988 26.2817 77.5237 8.08912 108.812 16.9259C140.099 25.7626 158.302 58.2823 149.468 89.5602Z" 
        stroke={color} 
        strokeWidth="1.5"
      />
      <path 
        d="M76.8383 130.045L57.3505 199.045M35.1962 167.077L92.1379 183.159" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}