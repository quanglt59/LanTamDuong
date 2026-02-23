import { useState } from 'react';

export default function Logo({ className = "w-32 h-12", variant = "light" }) {
  const [imageError, setImageError] = useState(false);
  
  // Nếu có logo mới (file SVG), sử dụng nó
  if (!imageError) {
    return (
      <img
        src="/images/logoltd1.png"
        alt="Vị Bắc Kạn - Quà Nông Sản Sạch"
        className={`${className} object-contain`}
        onError={() => setImageError(true)}
      />
    );
  }
  
  // Fallback: Logo SVG cũ nếu không tìm thấy logo mới
  const isDark = variant === "dark";
  const textColor = isDark ? "#f4ede0" : "#2a7148";
  const lineColor = isDark ? "#d7bf9a" : "#8b5a35";
  const strokeColor = isDark ? "#8fcea8" : "#2a7148";
  const gradientId = `leafGradient-${variant}`;
  
  return (
    <svg
      className={className}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Leaf/Plant icon - representing clean agriculture */}
      <path
        d="M15 45C15 35 20 25 30 20C25 15 25 10 30 5C35 10 35 15 30 20C40 25 45 35 45 45C45 50 40 55 30 55C20 55 15 50 15 45Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M30 20L30 5M30 20L20 15M30 20L40 15"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Text "Vị Bắc Kạn" */}
      <text
        x="60"
        y="35"
        fontFamily="Playfair Display, serif"
        fontSize="24"
        fontWeight="600"
        fill={textColor}
      >
        Vị Bắc Kạn
      </text>
      
      {/* Decorative line */}
      <line
        x1="60"
        y1="42"
        x2="190"
        y2="42"
        stroke={lineColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      <defs>
        <linearGradient id={`${gradientId}`} x1="15" y1="5" x2="45" y2="55" gradientUnits="userSpaceOnUse">
          {isDark ? (
            <>
              <stop offset="0%" stopColor="#8fcea8" />
              <stop offset="100%" stopColor="#5cb07d" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#3a8f5c" />
              <stop offset="100%" stopColor="#2a7148" />
            </>
          )}
        </linearGradient>
      </defs>
    </svg>
  );
}
