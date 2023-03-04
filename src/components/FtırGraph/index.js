import { Legend, Line, LineChart, XAxis, YAxis } from "recharts";

const data = [
    { x: "360", react: 0.19, y: "0", vue: 60 },
    { x: "400", react: 0.18, y: "0.2", vue: 54 },
    { x: "440", react: 0.17, y: "0.4", vue: 54 },
    { x: "480", react: 0.30, y: "0.4", vue: 28 },
    { x: "520", react: 1.15, y: "0.6", vue: 27 },
    { x: "560", react: 0.10, y: "0.8", vue: 49 },
    { x: "600", react: 0.09, y: "1", vue: 49 },
    { x: "640", react: 0.08, y: "1.2", vue: 49 },
];

const FtırGraph = () => {
    return (
        <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="react" stroke="#2196f3"></Line>
            <XAxis dataKey="x"></XAxis>
            <YAxis dataKey="y"></YAxis>

        </LineChart>
    )
};

export default FtırGraph;