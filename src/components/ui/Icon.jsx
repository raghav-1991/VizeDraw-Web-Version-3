/** Small line-icon set, drawn on a 20px grid at 1.5px stroke to match the drawing line weight. */
const PATHS = {
  'arrow-up-right': 'M6.5 13.5l7-7M8 6.5h5.5V12',
  'arrow-right': 'M4 10h11.5M11 5.5l4.5 4.5-4.5 4.5',
  chevron: 'M6 8l4 4 4-4',
  plus: 'M10 4.5v11M4.5 10h11',
  close: 'M5.5 5.5l9 9M14.5 5.5l-9 9',
  menu: 'M3.5 6.5h13M3.5 10h13M3.5 13.5h13',
  check: 'M4.5 10.5l3.5 3.5 7.5-8',
};
export default function Icon({ name, size = 18, className = '' }) {
  return (
    <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}
