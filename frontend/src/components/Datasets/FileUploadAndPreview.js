import React, { useState } from 'react';
import { Upload, Button, List, message, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const FileUploadAndPreview = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [percentUploaded, setPercentUploaded] = useState(0);

  const handleUpload = (info) => {
    if (info.file.status === 'uploading') {
      setUploading(true);
      // Simulate upload progress
      let percent = 0;
      const interval = setInterval(() => {
        percent += 10;
        setPercentUploaded(percent);
        if (percent >= 100) {
          clearInterval(interval);
          setUploading(false);
          message.success(`${info.file.name} uploaded successfully`);
        }
      }, 1000);
    }
    let fileList = [...info.fileList];
    fileList = fileList.slice(-5); // Limit to only 5 files
    setFileList(fileList);
  };

  const handleRemove = () => {
    setFileList([]);
  };

  const handlePreview = async file => {
    if (window.FileReader) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Display file content in a new window or modal
        // Example: window.open(reader.result);
        message.info('Preview functionality is not implemented in this demo.');
      };
      reader.readAsDataURL(file.originFileObj);
    } else {
      message.error('Your browser does not support file preview.');
    }
  };

  return (
    <div>
      <Upload
        fileList={fileList}
        onChange={handleUpload}
        showUploadList={{ showDownloadIcon: false }}
        beforeUpload={(file) => {
          const isAllowedType = ['text/csv', 'application/vnd.ms-excel', 'text/plain'].includes(file.type);
          const isLt10M = file.size / 1024 / 1024 < 10; // Maximum 10MB file size
          if (!isAllowedType) {
            message.error('You can only upload CSV, Excel, or TXT files!');
          }
          if (!isLt10M) {
            message.error('File must be smaller than 10MB!');
          }
          return isAllowedType && isLt10M;
        }}
        multiple
      >
        <Button icon={<UploadOutlined />}>Upload Files</Button>
      </Upload>
      {uploading && (
        <div style={{ marginTop: '16px' }}>
          <Progress percent={percentUploaded} status="active" />
        </div>
      )}
      {fileList.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <List
            dataSource={fileList}
            renderItem={file => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => handlePreview(file)}>Preview</Button>,
                  <Button type="link" onClick={handleRemove}>Remove</Button>
                ]}
              >
                <List.Item.Meta
                  title={<a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default FileUploadAndPreview;