import { Table, TableColumnType, Tooltip } from 'antd'
import React from 'react'

type MainData = {
    key: number,
    work_year: number,
    job_count: number,
    average_salary_in_usd: number
}

interface Props {
    data: Data[];
    setAnalyticsYear: React.Dispatch<React.SetStateAction<number>>;
}

const MainTable: React.FC<Props> = ({data, setAnalyticsYear}: Props) => {
    const mainData: MainData[] = []

    const jobCountByYear:Map<number, number> = new Map<number, number>()
    const totalSalaryByYear:Map<number, number> = new Map<number, number>()

    for (let i:number = 0; i < data.length; i++) {
        jobCountByYear.set(data[i].work_year, (jobCountByYear.get(data[i].work_year) ?? 0) + 1);
        totalSalaryByYear.set(data[i].work_year, (totalSalaryByYear.get(data[i].work_year) ?? 0) + data[i].salary_in_usd);
    }

    jobCountByYear.forEach((value: number, key: number) => {
        mainData.push({key: key, work_year: key, job_count: value, average_salary_in_usd: Math.round(((totalSalaryByYear.get(key) ?? 0) / value))});
    })

    const columns: TableColumnType<MainData>[] = [
        {title: "Work Year",dataIndex: "work_year",key: "work_year", sorter: {compare: (a,b) => a.work_year - b.work_year}},
        {title: "Job Count",dataIndex: "job_count",key: "job_count", sorter: {compare: (a,b) => a.job_count - b.job_count}},
        {title: "Average Salary In USD",dataIndex: "average_salary_in_usd",key: "average_salary_in_usd", sorter: {compare: (a,b) => a.average_salary_in_usd - b.average_salary_in_usd}},
    ];

    return (
        <Table<MainData>
        dataSource={mainData}
            columns={columns}
            bordered
            size='middle'
            components={{
                body: {
                    cell: (data) => {
                        return (
                          <Tooltip title="Show Analytics" placement='bottom'>
                            <td {...data} />
                          </Tooltip>
                        );
                    }
                }
            }}
            onRow={(record: MainData) => {
                return {
                  onClick: () => { setAnalyticsYear(record.work_year) },
                };
            }}
        >
        </Table>
    )
}

export default MainTable