import React, { useState } from 'react';
import { Layout, Breadcrumb, Button, message, Card, Spin, Modal } from 'antd';
import BasicInformationForm from './BasicInformationForm';
import FileUploadAndPreview from './FileUploadAndPreview';
import AdvancedOptions from './AdvancedOptions';
import DashboardMenu from '../Common/SideMenu'; 
import DashboardFooter from '../Common/Footer';
import DashboardHeader from '../Common/Header';

const { Content } = Layout;

const RegisterDatasetFormPage = () => {
  const [loading, setLoading] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const handleSaveDataset = () => {
    setLoading(true);
    // Example: Perform form validation before saving
    const basicFormValid = BasicInformationForm.validateFields();
    const fileUploadFormValid = FileUploadAndPreview.validateFields();
    const advancedOptionsFormValid = AdvancedOptions.validateFields();

    if (basicFormValid && fileUploadFormValid && advancedOptionsFormValid) {
      // Example: Simulate dataset saving
      setTimeout(() => {
        setLoading(false);
        setConfirmModalVisible(true);
        // message.success('Dataset saved successfully');
      }, 1500);
    } else {
      setLoading(false);
      message.error('Please fill in all required fields');
    }
  };

  const handleClearForm = () => {
    Modal.confirm({
      title: 'Clear Form',
      content: 'Are you sure you want to clear the form? This action cannot be undone.',
      onOk() {
        BasicInformationForm.resetFields();
        FileUploadAndPreview.resetFields();
        AdvancedOptions.resetFields();
      }
    });
  };

  const handleConfirmModalOk = () => {
    setConfirmModalVisible(false);
    // Navigate to another page or continue adding datasets
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardMenu />
      <Layout className="site-layout">
        <DashboardHeader />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Register Dataset</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background dashboard-content">
            <Card title="Register Dataset" style={{ borderRadius: '10px' }}>
              <BasicInformationForm />
              <FileUploadAndPreview />
              <AdvancedOptions />
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <Button type="primary" onClick={handleSaveDataset} loading={loading}>Save Dataset</Button>
                <Button style={{ marginLeft: '12px' }} onClick={handleClearForm}>Clear Form</Button>
              </div>
              {loading && (
                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                  <Spin tip="Saving dataset..." />
                </div>
              )}
            </Card>
          </div>
        </Content>
        <DashboardFooter />
      </Layout>
      <Modal
        title="Dataset Saved"
        visible={confirmModalVisible}
        onOk={handleConfirmModalOk}
        onCancel={() => setConfirmModalVisible(false)}
      >
        <p>Your dataset has been saved successfully.</p>
        <p>What would you like to do next?</p>
      </Modal>
    </Layout>
  );
};

export default RegisterDatasetFormPage;
