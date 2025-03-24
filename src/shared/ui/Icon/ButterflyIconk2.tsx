export default function ButterflyIcon({
  color = "#094A54",
  size = 88,
  style = {},
  ...props
}) {
  const width = Math.round((90 / 88) * size);
  
  return (
    <svg 
      width={width} 
      height={size} 
      viewBox="0 0 90 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...props}
    >
      <path 
        d="M33.75 35.5C33.75 49.9975 45 61.75 45 61.75C45 61.75 56.25 49.9975 56.25 35.5C56.25 21.0025 45 9.25 45 9.25C45 9.25 33.75 21.0025 33.75 35.5Z" 
        stroke={color} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M23.7375 28C15.4313 24.4225 7.5 24.25 7.5 24.25C7.5 24.25 7.86 40.6787 18.2137 51.0362C28.5675 61.3937 45 61.75 45 61.75C45 61.75 61.4287 61.39 71.7862 51.0362C82.1437 40.6825 82.5 24.25 82.5 24.25C82.5 24.25 74.5725 24.4225 66.2625 28M45.075 61.75C44.4525 66.7487 47.475 76.75 58.1775 76.75C65.6587 76.75 69.4012 69.25 82.5 76.75C81 69.25 78 64.45 73.6237 61.75M44.9213 61.75C45.5475 66.7487 42.5213 76.75 31.8263 76.75C24.3375 76.75 20.5988 69.25 7.5 76.75C9 69.25 12 64.45 16.3763 61.75" 
        stroke={color} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
