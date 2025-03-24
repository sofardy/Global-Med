export default function LocationPinIcon({
  color = '#094A54',
  size = 191,
  style = {},
  ...props
}) {
  // Calculate width while maintaining aspect ratio
  const aspectRatio = 152/191;
  const width = size * aspectRatio;
  
  return (
    <svg 
      width={width} 
      height={size} 
      viewBox="0 0 152 191" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...props}
    >
      <path 
        d="M92 71.5L141.975 1M141.975 1L150.979 34.3175M141.975 1L103.254 5.50237" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle 
        cx="63.3333" 
        cy="127.667" 
        r="62.5833" 
        stroke={color} 
        strokeWidth="1.5"
      />
    </svg>
  );
}