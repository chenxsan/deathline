import { scaleOrdinal, scaleLinear, scaleBand } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { max } from 'd3-array';
import { useState, useMemo } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import useMeasure from 'react-use-measure';

StackedBar.defaultProps = {
  data: {
    series: [],
    xAxis: [],
    title: ''
  },
  inset: {
    top: 30,
    bottom: 30,
    left: 30,
    right: 30
  },
  height: 350
};
interface Serie {
  name: string;
  data: number[];
}
interface Props {
  height: number; // svg height
  data: {
    series: Serie[];
    xAxis: {
      categories: string[];
    };
    title: string;
  };
  inset: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

function calculateMaxStackedValue(arr: number[][]): number {
  return max(
    arr.slice(1).reduce(
      (acc, cur) =>
        acc.map((i, index) => {
          return i + cur[index];
        }),
      arr.slice(0, 1)[0]
    )
  );
}
export default function StackedBar(props: Props) {
  const { data, inset } = props;

  if (data.series.length === 0) return null;

  const [height] = useState(props.height);

  const [ref, { width }] = useMeasure({ polyfill: ResizeObserver });

  const colors = useMemo(
    () =>
      scaleOrdinal()
        .domain(data.series.map(d => d.name))
        .range(schemeCategory10),
    [data.series]
  );

  const arr = data.series.map(serie => serie.data);

  // find the max stacked value
  const maxStackedValue = useMemo(() => calculateMaxStackedValue(arr), [arr]);

  const boundaryY = height - inset.top - inset.bottom;
  const boundaryX = width - inset.left - inset.right;

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([maxStackedValue, 0])
        .range([0, boundaryY]),
    [maxStackedValue, boundaryY]
  );

  const xScale = useMemo(
    () =>
      scaleBand()
        .domain(data.xAxis.categories)
        .range([0, boundaryX])
        .padding(0.3),
    [data.xAxis.categories, boundaryX]
  );

  return (
    <section ref={ref}>
      <header>
        <h2 className="font-bold py-2 text-lg">{data.title}</h2>
        {data.series.map(serie => (
          <span className="inline-flex items-center mr-3" key={serie.name}>
            <span
              className="inline-block w-4 h-4 rounded mr-1"
              style={{
                backgroundColor: colors(serie.name)
              }}
            ></span>
            {serie.name}
          </span>
        ))}
      </header>
      <svg width={width} height={height}>
        <g transform={`translate(${inset.left}, ${inset.top})`}>
          {data.series.map(({ name, data: d }, index) => {
            return d.map((x, idx) => {
              return (
                <g
                  key={idx}
                  transform={`translate(${xScale(
                    data.xAxis.categories[idx]
                  )}, ${yScale(x) +
                    yScale(
                      data.series
                        .slice(0, index)
                        .reduce((acc, cur) => acc + cur.data[idx], 0)
                    ) -
                    boundaryY})`}
                >
                  <rect
                    width={xScale.bandwidth()}
                    height={boundaryY - yScale(x)}
                    fill={colors(name)}
                  ></rect>
                  {x > 0 && (
                    <text
                      x={xScale.bandwidth() / 2}
                      y={(boundaryY - yScale(x)) / 2}
                      fill="#fff"
                      dominantBaseline="middle"
                      textAnchor="middle"
                    >
                      {x}
                    </text>
                  )}
                </g>
              );
            });
          })}
        </g>
      </svg>
    </section>
  );
}
