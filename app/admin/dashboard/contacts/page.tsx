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
  message,
  Input,
} from "antd";
import CustomTable from "../../../../components/common/Table";
import FilterBar from "../../../../components/common/FilterBar";
import { EyeOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useContacts from "@/hooks/useContacts";
import dynamic from "next/dynamic";
import { useMessageContext } from "@/components/common/MessageProvider";

const QuillEditor = dynamic(() => import("@/components/common/QuillEdiitor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const { Title, Paragraph } = Typography;

// Define Contact Type
interface Contact {
  key: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  createdAt?: Date;
}

const ContactPage = () => {
  const { fetchResponse, loading, setQuery, handleSearch, sendMail } =
    useContacts();
  const { success, error } = useMessageContext();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [formLoading, setLoading] = useState(false);

  // View Contact Details
  const handleView = (contact: Contact) => {
    setSelectedContact(contact);
    setIsViewModalVisible(true);
  };

  // Edit Contact
  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    form.setFieldsValue({
      subject: "Your Inquiry – We're Here to Assist You!",
      message: contact.message,
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

  const columns: ColumnsType<Contact> = [
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
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Contact) => (
        <Space>
          <Button onClick={() => handleView(record)} icon={<EyeOutlined />} />
          <Button onClick={() => handleEdit(record)} icon={<EditOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <Row gutter={[16, 16]} style={{ padding: 20 }}>
      <Col span={24}>
        <Card>
          <Title level={2}>Contact List</Title>
          <Paragraph>Manage your Contacts efficiently</Paragraph>
        </Card>
      </Col>

      <Col span={24}>
        <Card>
          <FilterBar
            onSearch={handleSearch}
            onAdd={() => alert("Add Contact")}
            onImport={() => alert("Import Contacts")}
          />
        </Card>
      </Col>

      <Col span={24}>
        <Card>
          <CustomTable<Contact>
            data={fetchResponse?.data}
            columns={columns}
            loading={loading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: fetchResponse?.total || 0,
            }}
            onChange={handleTableChange}
          />
        </Card>
      </Col>

      <Modal
        title="Contact Details"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedContact && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">
              {selectedContact.name}
            </Descriptions.Item>
            <Descriptions.Item label="Mobile">
              {selectedContact.mobile}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedContact.email}
            </Descriptions.Item>
            <Descriptions.Item label="Message">
              {selectedContact.message}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(selectedContact.createdAt as Date).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        title="Contact"
        open={isEditModalVisible}
        onCancel={onCloseEdit}
        footer={null}
        width={800}
      >
        {selectedContact && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">
              {selectedContact.name}
            </Descriptions.Item>
            <Descriptions.Item label="Mobile">
              {selectedContact.mobile}
            </Descriptions.Item>
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

export default ContactPage;
