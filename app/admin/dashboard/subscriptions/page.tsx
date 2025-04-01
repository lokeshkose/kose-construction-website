"use client";
import { useState } from "react";
import {
  Row,
  Col,
  Space,
  Button,
  Card,
  Typography,
  Form,
  Descriptions,
  Input,
  Modal,
} from "antd";
import CustomTable from "../../../../components/common/Table";
import FilterBar from "../../../../components/common/FilterBar";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useSubscriptions from "@/hooks/useSubscriptions";
import { Subscription } from "@/types/subscription.types";
import dynamic from "next/dynamic";
import { useMessageContext } from "@/components/common/MessageProvider";
import { error } from "console";

const QuillEditor = dynamic(() => import("@/components/common/QuillEdiitor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
const { Title, Paragraph } = Typography;

const SubscriptionPage = () => {
  const { fetchResponse, loading, setQuery, handleSearch, sendMail } =
    useSubscriptions();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [form] = Form.useForm();
  const [formLoading, setLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Subscription | null>(
    null
  );
  const { success, error } = useMessageContext();

  const handleEdit = (item: Subscription) => {
    setSelectedContact(item);
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
        email: selectedContact?.email as string,
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

  const columns: ColumnsType<Subscription> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["md", "lg"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Subscription) => (
        <Space>
          <Button onClick={() => handleEdit(record)} icon={<EditOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <Row gutter={[16, 16]} style={{ padding: 20 }}>
      {/* Title & Description */}
      <Col span={24}>
        <Card>
          <Title level={2}>Subscription List</Title>
          <Paragraph>Manage your Subscriptions efficiently</Paragraph>
        </Card>
      </Col>

      {/* Filter Bar */}
      <Col span={24}>
        <Card>
          <FilterBar
            onSearch={handleSearch}
            onAdd={() => alert("Add Contact")}
            onImport={() => alert("Import Contacts")}
          />
        </Card>
      </Col>

      {/* Table Section */}
      <Col span={24}>
        <Card>
          <CustomTable<Subscription>
            data={fetchResponse.data}
            columns={columns}
            loading={loading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: fetchResponse?.total, // Update this if fetching from API
            }}
            onChange={handleTableChange} // ✅ Handle pagination change
          />
        </Card>
      </Col>
      <Modal
        title="Contact"
        open={isEditModalVisible}
        onCancel={onCloseEdit}
        footer={null}
        width={800}
      >
        {selectedContact && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Email">
              {selectedContact.email}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(selectedContact.createdAt as Date).toLocaleString()}
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

export default SubscriptionPage;
