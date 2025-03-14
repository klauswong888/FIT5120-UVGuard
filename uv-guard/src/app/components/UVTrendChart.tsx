"use client";
import Image from "next/image";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    uvLevel: 4000,
    heat: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    uvLevel: 1800,
    heat: 3600,
    amt: 2210,
  },
  {
    name: 'Mar',
    uvLevel: 2700,
    heat: 1800,
    amt: 2290,
  },
  {
    name: 'Apr',
    uvLevel: 3600,
    heat: 900,
    amt: 2000,
  },
  {
    name: 'May',
    uvLevel: 2700,
    heat: 1800,
    amt: 2181,
  },
  {
    name: 'Jun',
    uvLevel: 1800,
    heat: 2700,
    amt: 2500,
  },
  {
    name: 'Jul',
    uvLevel: 900,
    heat: 3600,
    amt: 2100,
  },
  {
    name: 'Aug',
    uvLevel: 1800,
    heat: 2700,
    amt: 2400,
  },
  {
    name: 'Sep',
    uvLevel: 2700,
    heat: 1800,
    amt: 2210,
  },
  {
    name: 'Oct',
    uvLevel: 3600,
    heat: 900,
    amt: 2290,
  },
  {
    name: 'Nov',
    uvLevel: 2700,
    heat: 1800,
    amt: 2000,
  },
  {
    name: 'Dec',
    uvLevel: 1800,
    heat: 2700,
    amt: 2181,
  },
];

const UvTrendChart = () => {
    return <div className="h-full bg-white rounded-xl p-4">
        {/* TITLE */}
        <div className="flex justify-between items-center">
            <h1 className='font-semibold text-lg'>UV Trend</h1>
        </div>
        {/* CHART */}
        <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd"/>
          <XAxis dataKey="name" axisLine={false} tick={{fill: "#d1d5db"}} tickLine={false} tickMargin={10}/>
          <YAxis axisLine={false} tick={{fill: "#d1d5db"}} tickLine={false} tickMargin={10}/>
          <Tooltip />
          <Legend align='center' verticalAlign='top' wrapperStyle={{paddingTop: 20,paddingBottom: 40}}/>
          <Line type="monotone" dataKey="uvLevel" stroke="#C3EBFA" strokeWidth={5} />
          <Line type="monotone" dataKey="heat" stroke="#CFCEFF" strokeWidth={5}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
}

export default UvTrendChart;