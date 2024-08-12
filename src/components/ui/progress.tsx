// @ts-nocheck
import React from "react";

const cleanPercentage = (percentage) => {
    const tooLow = !Number.isFinite(+percentage) || percentage < 0;
    const tooHigh = percentage > 100;
    return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ colour, pct }) => {
    const r = 30;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - pct) * circ) / 100;
    return (
        <circle
            r={r}
            cx={40}
            cy={40}
            fill="transparent"
            stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
            strokeWidth={"0.5rem"}
            strokeDasharray={circ}
            strokeDashoffset={pct ? strokePct : 0}
            strokeLinecap="round"
        ></circle>
    );
};

const Text = ({ text }) => {
    return (
        <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            className="text-[10px] font-bold fill-white"
        >
            {text}
        </text>
    );
};

const Progress = ({ percentage, colour, text }) => {
    const pct = cleanPercentage(percentage);
    let overflow = null;
    if (percentage > 100)
        overflow = percentage % 100;
    return (
        <svg width={80} height={80}>
            <g transform={`rotate(-90 ${"40 40"})`}>
                <Circle colour="#506ac0" />
                <Circle colour={colour} pct={pct} />
                {overflow && <Circle colour={'lightpink'} pct={overflow} />}
            </g>
            <Text text={text} />
        </svg>
    );
};

export default Progress;
