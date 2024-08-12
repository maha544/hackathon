import React, { useEffect, useState } from 'react';
import { Card, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import api from '../apihandling/AxiosConfig'; 
import { deleteData } from '../apihandling/AxiosMethods'; 

const { Meta } = Card;

interface DataItem {
  id: number;
  title: string;
  body: string;
}
const url = '';

const DataCard: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    api.get(url)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log('Error: ' + err.message);
      });
  }, []);
  

  const handleDelete = (id: number) => {
    deleteData(id)
      .then(() => {
        message.success('Item deleted successfully.');
        setData((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((error) => {
        message.error('Failed to delete item.');
        console.error(error);
      });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {data.map((item) => (
        <Card
          key={item.id}
          hoverable
          style={{ width: 300 }}
          cover={<img alt={item.title} src="https://via.placeholder.com/300x200" />} // Replace with actual image URL from API if available
          actions={[
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>
          ]}
        >
          <Meta
            title={item.title}
            description={item.body.substring(0, 50) + '...'} // Short description
          />
        </Card>
      ))}
    </div>
  );
};

export default DataCard;
