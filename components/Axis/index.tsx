import React from 'react';
import Axis from './Axis';
type TextAnchor = 'start' | 'end' | 'middle';

interface GProps {
  transform: string;
  textAnchor: TextAnchor;
  children: React.ReactNode;
}
function G({ transform, children, textAnchor }: GProps) {
  return (
    <g fill="none" transform={transform} textAnchor={textAnchor}>
      {children}
    </g>
  );
}

interface Props {
  scale: any;
  transform: string;
}
export function AxisTop(props: Props) {
  return (
    <G transform={props.transform} textAnchor="middle">
      <Axis scale={props.scale} orient="top" />
    </G>
  );
}
export function AxisRight(props: Props) {
  return (
    <G transform={props.transform} textAnchor="start">
      <Axis scale={props.scale} orient="right" />
    </G>
  );
}
export function AxisBottom(props: Props) {
  return (
    <G transform={props.transform} textAnchor="middle">
      <Axis scale={props.scale} orient="bottom" />
    </G>
  );
}
export function AxisLeft(props: Props) {
  return (
    <G transform={props.transform} textAnchor="end">
      <Axis scale={props.scale} orient="left" />
    </G>
  );
}
