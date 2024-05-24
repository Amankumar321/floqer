import { Table, TableColumnType } from 'antd';
import React from 'react'

type AnalyticsData = {
    key: string,
    job_title: string,
    job_count: number
}

interface Props {
    data: Data[];
    analyticsYear: number;
}

const AnalyticsTable: React.FC<Props> = ({data, analyticsYear}: Props) => {
    const analyticsData: AnalyticsData[] = []

    const jobCountByTitle:Map<string, number> = new Map<string, number>()

    for (let i:number = 0; i < data.length; i++) {
        if (analyticsYear === data[i].work_year)
            jobCountByTitle.set(data[i].job_title, (jobCountByTitle.get(data[i].job_title) ?? 0) + 1);
    }

    jobCountByTitle.forEach((value: number, key: string) => {
        analyticsData.push({key: key, job_title: key, job_count: value});
    })

    const columns: TableColumnType<AnalyticsData>[] = [
        {title: "Job Title",dataIndex: "job_title",key: "job_title"},
        {title: "Job Count",dataIndex: "job_count",key: "job_count", sorter: {compare: (a,b) => a.job_count - b.job_count}},
    ];


    return (
        <Table<AnalyticsData>
            dataSource={analyticsData}
            columns={columns}
            bordered
            size='middle'
        ></Table>
    )
}

export default AnalyticsTable