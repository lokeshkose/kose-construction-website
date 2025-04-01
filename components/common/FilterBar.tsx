import { Input, Button, Space, Row, Col } from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';

interface FilterBarProps {
  onSearch: (value: string) => void;
  onAdd: () => void;
  onImport: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onSearch, onAdd, onImport }) => {
  return (
    <Row
      gutter={[16, 16]}
      align='middle'
      justify='space-between'>
      <Col
        xs={24}
        sm={12}
        md={8}
        lg={6}>
        <Input
          placeholder='Search'
          prefix={<SearchOutlined />}
          allowClear
          onChange={(e) => onSearch(e.target.value)}
        />
      </Col>
      <Col
        xs={24}
        sm={12}
        md={8}
        lg={6}
        style={{ textAlign: 'right' }}>
        <Space wrap>
          {/* <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={onAdd}>
            Add Product
          </Button> */}
          <Button
            icon={<UploadOutlined />}
            onClick={onImport}>
            Import
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

export default FilterBar;
