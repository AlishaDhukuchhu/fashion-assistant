export default function ShapeVisual({ shape }) {
  const shapeName = shape ? shape.toLowerCase() : '';

  return (
    <svg viewBox="0 0 100 220" style={{ width: '100%', height: '100%' }}>
      {/* Abstract elegant body line art */}
      <path 
        d="M41 33 C33 33 28 40 28 50 C28 65 35 70 35 90 C33 110 25 130 33 210 L43 210 L48 120 L52 120 L57 210 L67 210 C75 130 67 110 65 90 C65 70 72 65 72 50 C72 40 67 33 59 33 C55 33 50 38 50 38 C50 38 45 33 41 33 Z" 
        fill="none" 
        stroke="var(--color-text-main)" 
        strokeWidth="1.5" 
      />
      <circle cx="50" cy="16" r="10" fill="none" stroke="var(--color-text-main)" strokeWidth="1.5" />
      
      {/* Pink Geometric Overlays */}
      {shapeName === 'rectangle' && (
        <rect x="33" y="38" width="34" height="65" fill="rgba(224, 168, 168, 0.7)" />
      )}
      {shapeName === 'pear' && (
        <polygon points="50,38 30,105 70,105" fill="rgba(224, 168, 168, 0.7)" />
      )}
      {shapeName === 'hourglass' && (
        <polygon points="33,38 67,38 50,70 33,105 67,105" fill="rgba(224, 168, 168, 0.7)" />
      )}
      {shapeName === 'inverted_triangle' && (
        <polygon points="30,38 70,38 50,105" fill="rgba(224, 168, 168, 0.7)" />
      )}
      {shapeName === 'apple' && (
        <ellipse cx="50" cy="70" rx="22" ry="32" fill="rgba(224, 168, 168, 0.7)" />
      )}
      {shapeName === 'athletic' && (
        <polygon points="35,38 65,38 55,105 45,105" fill="rgba(224, 168, 168, 0.7)" />
      )}
    </svg>
  );
}
