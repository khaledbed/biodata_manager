import React from 'react';
import { Row, Col, Card, Space, Tag, Divider, Typography, Layout } from 'antd';
const { Footer } = Layout;
const { Title } = Typography;

const DashboardFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
          <Divider />
      <Row gutter={[16, 16]} style={{ margin: '0', padding: '0' }}>
        <Col span={24}>
          <Title level={3}>Tags</Title>
          <Card>
            <Space>
              <Tag color="blue">Biology</Tag>
              <Tag color="green">Genetics</Tag>
              <Tag color="cyan">Sequencing</Tag>
              <Tag color="magenta">Bioinformatics</Tag>
              <Tag color="geekblue">Data Analysis</Tag>
              <Tag color="purple">Machine Learning</Tag>
            </Space>
          </Card>
        </Col>
      </Row>
      <div>
        BiodAta manAger  ©2024 Created by MBD Team
      </div>

    </Footer>
  );
};

export default DashboardFooter;
