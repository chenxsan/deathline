import React from 'react';

type Orient = 'left' | 'right' | 'top' | 'bottom';

interface Scale {
  (value: any): any;

  domain: Function;
  range: Function;
  copy: Function;

  // scaleBand
  bandwidth?: Function;
  round?: Function;

  // scaleLinear
  ticks?: Function;
  tickFormat?: Function;
}

export interface Props {
  scale: Scale;
  orient: Orient;
  tickSizeInner: number;
  tickSizeOuter: number;
  tickPadding: number;
  count?: number;
}

Axis.defaultProps = {
  tickSizeInner: 6,
  tickSizeOuter: 6,
  tickPadding: 3,
  count: 3
};

function translateX(x: number): string {
  return `translate(${x + 0.5}, 0)`;
}

function translateY(y: number): string {
  return `translate(0, ${y + 0.5})`;
}

function identity<T>(arg: T): T {
  return arg;
}

function number(scale: Scale) {
  return function<T>(d: T) {
    return +scale(d);
  };
}

function center(scale: Scale) {
  if (!scale.bandwidth) {
    return function<T>(d: T) {
      return +scale(d);
    };
  }
  var offset = Math.max(0, scale.bandwidth() - 1) / 2; // Adjust for 0.5px offset.
  if (scale.round) offset = Math.round(offset);
  return function<T>(d: T) {
    return +scale(d) + offset;
  };
}

function Axis({
  scale,
  orient,
  tickSizeInner,
  tickSizeOuter,
  tickPadding,
  count
}: Props) {
  const values = scale.ticks ? scale.ticks(count) : scale.domain();
  const format = scale.tickFormat ? scale.tickFormat(count) : identity;
  const range = scale.range();
  const rangeStart = range[0] + 0.5;
  const rangeEnd = range[range.length - 1] + 0.5;
  const spacing = Math.max(tickSizeInner, 0) + tickPadding;
  const scaleCopy = scale.copy();
  const transform =
    orient === 'top' || orient === 'bottom' ? translateX : translateY;
  const position = (scale.bandwidth ? center : number)(scaleCopy);
  const k = orient === 'top' || orient === 'left' ? -1 : 1;
  const x = orient === 'left' || orient === 'right' ? 'x' : 'y';
  const y = orient === 'left' || orient === 'right' ? 'y' : 'x';
  function transformer(value: string): string {
    const d = position(value);
    return transform(isFinite(d) ? d : position(value));
  }
  return (
    <>
      <path
        stroke="currentColor"
        d={
          orient === 'left' || orient === 'right'
            ? tickSizeOuter
              ? `M${k * tickSizeOuter},${rangeStart}H0.5V${rangeEnd}H${k *
                  tickSizeOuter}`
              : `M0.5,${rangeStart}V${rangeEnd}`
            : tickSizeOuter
            ? `M${rangeStart},${k * tickSizeOuter}V0.5H${rangeEnd}V${k *
                tickSizeOuter}`
            : `M${rangeStart},0.5H${rangeEnd}`
        }
      />
      {values.map((value: string, index: number) => {
        const lineProps = {
          stroke: 'currentColor',
          [`${x}2`]: k * tickSizeInner
        };
        const textProps = {
          fill: 'currentColor',
          [x]: k * spacing,
          [y]: 0.5,
          dy:
            orient === 'top' ? '0em' : orient === 'bottom' ? '0.71em' : '0.32em'
        };
        return (
          <g key={index} opacity={1} transform={transformer(value)}>
            <line {...lineProps} />
            <text {...textProps}>{format(value)}</text>
          </g>
        );
      })}
    </>
  );
}
export default Axis;
