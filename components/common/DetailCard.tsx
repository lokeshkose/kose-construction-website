import { Card, Typography } from 'antd';
import { ReactNode } from 'react';

const { Title, Paragraph } = Typography;

interface DetailCardProps {
  title: string;
  icon?: ReactNode;
  description: string;
  showHeader?: boolean;
}

const DetailCard: React.FC<DetailCardProps> = ({ title, icon, description, showHeader = false }) => {
  return (
    <Card 
      hoverable 
      style={{ 
        borderRadius: 10, 
        textAlign: 'center' 
      }}
    >
      {showHeader && (
        <Title level={2} style={{ marginBottom: 20, color: '#1E3A8A' }}>
          {title}
        </Title>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {icon}
        <Title level={4} style={{ marginTop: 10 }}>{title}</Title>
        <Paragraph>{description}</Paragraph>
      </div>
    </Card>
  );
};

export default DetailCard;
