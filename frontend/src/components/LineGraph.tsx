import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, ArcElement, Legend, Title } from "chart.js";
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, ArcElement, Legend, Title)

type LineData = {
    labels: number[],
    datasets: [{
        label: string,
        data: number[],
        backgroundColor: string,
        borderColor: string,
    }]
}

interface Props {
    data: Data[];
}

const LineGraph: React.FC<Props> = ({data}: Props) => {
    const lineData: LineData = {labels: [], datasets: 
        [{label: "Job Count", data: [], backgroundColor: "#1677ff", borderColor: "#1677ff"}]};

    const jobCountByYear:Map<number, number> = new Map<number, number>()

    for (let i:number = 0; i < data.length; i++) {
        jobCountByYear.set(data[i].work_year, (jobCountByYear.get(data[i].work_year) ?? 0) + 1);
    }

    const yearsSorted = [...jobCountByYear.keys()].sort() 

    for (let year of yearsSorted) {
        lineData.labels.push(year);
        lineData.datasets[0].data.push(jobCountByYear.get(year) ?? 0);
    }

    return (
        <Line data={lineData} style={{backgroundColor: 'white'}}></Line>
    )
}

export default LineGraph