type TrackArrowProps = {
  color: string;
};

export function TrackArrow({ color }: TrackArrowProps) {
  return <polygon points="0,-5 3,3.5 -3,3.5" fill={color} />;
}
