"use client";
import { useState } from "react";
import {
  Row,
  Col,
  Space,
  Button,
  Card,
  Typography,
  Modal,
  Descriptions,
  Form,
  Input,
  message,
} from "antd";
import CustomTable from "../../../../components/common/Table";
import FilterBar from "../../../../components/common/FilterBar";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useQuotations from "@/hooks/useQuotations";
import { Quotation } from "@/types/request.types";
import dynamic from "next/dynamic";
import { useMessageContext } from "@/components/common/MessageProvider";

const QuillEditor = dynamic(() => import("@/components/common/QuillEdiitor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
const { Title, Paragraph } = Typography;

// Define Quote Type

const QuotePage = () => {
  const { fetchResponse, loading, setQuery, handleSearch, sendMail } =
    useQuotations();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { success, error } = useMessageContext();
  const [formLoading, setLoading] = useState(false);

  // View Quote Details
  const handleView = (Quote: Quotation) => {
    setSelectedQuote(Quote);
    setIsViewModalVisible(true);
  };
  // Edit Quote
  const handleEdit = (Quote: Quotation) => {
    setSelectedQuote(Quote);
    form.setFieldsValue({
      subject: "Your Inquiry – We're Here to Assist You!",
      message: "",
    });
    setIsEditModalVisible(true);
  };
  const onCloseEdit = () => {
    form.resetFields();
    setIsEditModalVisible(false);
  };

  const handleSubmit = async (values: { subject: string; message: string }) => {
    setLoading(true);
    try {
      const response = await sendMail({
        email: selectedQuote?.email as string,
        subject: values.subject,
        message: values.message,
      });
      if (response?.success) {
        success("Mail sent successfully!");
        form.resetFields();
        setIsEditModalVisible(false);
      } else {
        throw new Error("Failed to send mail");
      }
    } catch (err) {
      error("An error occurred while sending the mail.");
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination: any) => {
    const newSkip = (pagination.current - 1) * pagination.pageSize;

    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });

    setQuery((prev) => ({
      ...prev,
      skip: newSkip,
    }));
  };

  const columns: ColumnsType<Quotation> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      responsive: ["md", "lg"],
    },
    {
      title: "Service Type",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    // {
    //   title: "Description",
    //   dataIndex: "projectInfo",
    //   key: "description",
    //   responsive: ["lg"],
    // },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Quotation) => (
        <Space>
          <Button onClick={() => handleView(record)} icon={<EyeOutlined />} />
          <Button onClick={() => handleEdit(record)} icon={<EditOutlined />} />
          {/* <Button icon={<DeleteOutlined />} danger /> */}
        </Space>
      ),
    },
  ];

  return (
    <Row gutter={[16, 16]} style={{ padding: 20 }}>
      {/* Title & Description */}
      <Col span={24}>
        <Card>
          <Title level={2}>Quote List</Title>
          <Paragraph>Manage your quotes efficiently</Paragraph>
        </Card>
      </Col>

      {/* Filter Bar */}
      <Col span={24}>
        <Card>
          <FilterBar
            onSearch={handleSearch}
            onAdd={() => alert("Add Quote")}
            onImport={() => alert("Import Quotes")}
          />
        </Card>
      </Col>

      {/* Table Section */}
      <Col span={24}>
        <Card>
          <CustomTable<Quotation>
            data={fetchResponse.data}
            columns={columns}
            loading={loading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: fetchResponse.total, // Update this if fetching from API
            }}
            onChange={handleTableChange} // ✅ Handle pagination change
          />
        </Card>
      </Col>
      <Modal
        title="Quote Details"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedQuote && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">
              {selectedQuote.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedQuote.email}
            </Descriptions.Item>
            <Descriptions.Item label="Mobile">
              {selectedQuote.mobile}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {selectedQuote.projectInfo}
            </Descriptions.Item>
            <Descriptions.Item label="Service">
              {selectedQuote.service}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(selectedQuote.createdAt as Date).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* Edit Quote Modal */}
      <Modal
        title="Edit Quote"
        open={isEditModalVisible}
        onCancel={onCloseEdit}
        footer={null}
        width={800}
      >
        {selectedQuote && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">
              {selectedQuote.name}
            </Descriptions.Item>
            <Descriptions.Item label="Mobile">
              {selectedQuote.mobile}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedQuote.email}
            </Descriptions.Item>
            <Descriptions.Item label="Company">
              {selectedQuote.company}
            </Descriptions.Item>{" "}
            <Descriptions.Item label="Service">
              {selectedQuote.service}
            </Descriptions.Item>
            <Descriptions.Item label="Project Info">
              {selectedQuote.projectInfo}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(selectedQuote.createdAt as Date).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        )}
        <h4 style={{ margin: "16px 0" }}>Share Mail</h4>

        <Form
          form={form}
          onFinish={handleSubmit}
          style={{ marginTop: "2rem" }}
          layout="vertical"
        >
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: "Please enter Subject" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please enter a message" }]}
          >
            <QuillEditor />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "2rem",
            }}
          >
            <Button
              htmlType="submit"
              type="default"
              shape="round"
              size="large"
              loading={formLoading}
              disabled={formLoading}
            >
              Send Mail
            </Button>
          </div>
        </Form>
      </Modal>
    </Row>
  );
};

export default QuotePage;
