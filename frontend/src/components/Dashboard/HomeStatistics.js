import React from 'react';
import { Row, Col, Card, Statistic, Typography, Divider, Timeline, Button, Progress, Tag, Space } from 'antd';
import { Link } from 'react-router-dom';
import { DatabaseOutlined, HistoryOutlined, BarChartOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const HomeStatistics = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Datasets" value={87} prefix={<DatabaseOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Annotations" value={56} prefix={<BarChartOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Methods" value={8} prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total References" value={256} prefix={<HistoryOutlined />} />
          </Card>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Dataset Overview">
            <Statistic title="Total Datasets" value={87} />
            <p>Explore all datasets managed in your system.</p>
            <Button type="primary" size="small"><Link to="/datasets">View Datasets</Link></Button>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Recent Activities">
            <Timeline>
              <Timeline.Item color="green">Uploaded new dataset</Timeline.Item>
              <Timeline.Item color="blue">Analyzed DNA sequence</Timeline.Item>
              <Timeline.Item color="red">Updated project settings</Timeline.Item>
            </Timeline>
            <Button type="primary" size="small"><Link to="/activity">View All Activities</Link></Button>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Data Quality Metrics">
            <Space direction="vertical">
              <Text>Data Accuracy:</Text>
              <Progress percent={65} status="exception" />
              <Text>Data Consistency:</Text>
              <Progress percent={90} />
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="System Health">
            <Space direction="vertical">
              <Text>Database Status:</Text>
              <Tag color="green">Online</Tag>
              <Text>Server Load:</Text>
              <Progress percent={50} />
              <Text>CPU Usage:</Text>
              <Progress percent={70} />
              <Text>Memory Usage:</Text>
              <Progress percent={40} />
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomeStatistics;
