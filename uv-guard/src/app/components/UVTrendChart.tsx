"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface UvTrendChartProps {
  uvData: { time: string; uvIndex: number }[];
}

const UvTrendChart: React.FC<UvTrendChartProps> = ({ uvData} ) => {
    return <div className="h-full bg-white rounded-xl p-4">
        {/* TITLE */}
        <div className="flex justify-between items-center">
            <h1 className='font-semibold text-lg'>UV Trend</h1>
        </div>
        {/* CHART */}
        <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={400}
          data={uvData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd"/>
          <XAxis dataKey="time" axisLine={false} tick={{fill: "#d1d5db"}} tickLine={false} tickMargin={10}/>
          <YAxis label={{ value: "UV Index", angle: -90, position: "insideLeft" }} axisLine={false} tick={{fill: "#d1d5db"}} tickLine={false} tickMargin={10}/>
          <Tooltip />
          <Legend align='center' verticalAlign='top' wrapperStyle={{paddingTop: 20,paddingBottom: 20}}/>
          <Line type="monotone" dataKey="uvIndex" stroke="#C3EBFA" strokeWidth={5} />
          {/* <Line type="monotone" dataKey="heat" stroke="#CFCEFF" strokeWidth={5}/> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
}

export default UvTrendChart;