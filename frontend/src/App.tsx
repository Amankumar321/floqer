import React, { useState, useEffect } from 'react';
import './App.css';
import MainTable from './components/MainTable.tsx';
import AnalyticsTable from './components/AnalyticsTable.tsx';
import LineGraph from './components/LineGraph.tsx';
import "./App.d.ts"
import { Button, Col, Flex, FloatButton, Typography } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import ChatBox from './components/ChatBox.tsx';

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState<Data[]>([]);
  const [analyticsYear, setAnalyticsYear] = useState<number>(0);
  const [showAIchat, setShowAIchat] = useState<boolean>(false);

  const chatClickHandler = () => {
    setShowAIchat((v) => !v);
  }

  useEffect(() => {
    fetch('salaries.csv')
    .then((res: Response) => {
      res.text().then((text: string) => {
        const rows: string[] = text.split('\n');
        const data: Array<Data> = [];
        
        for(let i:number = 1; i < rows.length - 1; i++) {
          let rowData: string[] = rows[i].split(',');
          data.push({
            work_year: parseInt(rowData[0]),
            experience_level: rowData[1],
            employment_type: rowData[2],
            job_title: rowData[3],
            salary: parseInt(rowData[4]),
            salary_currency: rowData[5],
            salary_in_usd: parseInt(rowData[6]),
            employee_residence: rowData[7],
            remote_ratio: parseInt(rowData[8]),
            company_location: rowData[9],
            company_size: rowData[10]
          })
        }
        setDataSource(data);
      })
    })  
  }, [])
  

  return (
    <Flex justify='center'>
      <Col xs={22} sm={22} md={20} lg={16} xl={16}>
        <Flex style={{paddingTop: 40, paddingBottom: 40}} vertical={true} gap='large'>
          <Flex vertical={true} gap='large' className='container'>
            <Typography.Title level={4}>ML Engineer salaries from 2020 to 2024</Typography.Title>
            <MainTable data={dataSource} setAnalyticsYear={setAnalyticsYear}></MainTable>
          </Flex>
          {
            analyticsYear !== 0 ?
            <Flex vertical={true} gap='large' className='container'>
              <Flex justify='space-between' align='center'>
                <Typography.Title level={4}>Analytics for year {analyticsYear}</Typography.Title>
                <Button onClick={() => setAnalyticsYear(0)}>Hide Analytics</Button>
              </Flex>
              <AnalyticsTable data={dataSource} analyticsYear={analyticsYear}></AnalyticsTable>
            </Flex>
            : null
          }
          <Flex vertical={true} gap='large' className='container'>
            <Typography.Title level={4}>Line Graph</Typography.Title>
            <LineGraph data={dataSource}></LineGraph>
          </Flex>
        </Flex>
      </Col>
      <FloatButton.Group icon={<CommentOutlined/>} open={showAIchat} trigger='click' onClick={chatClickHandler}>
        <ChatBox></ChatBox>
      </FloatButton.Group>
    </Flex>
  );
}

export default App;
