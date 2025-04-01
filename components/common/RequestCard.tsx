import {
  Layout,
  Typography,
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
} from "antd";
const { Title, Text } = Typography;
const { Option } = Select;
import { useTranslation } from "react-i18next";
import DirectionAnimation from "@/animations/DirectionAnimation";
import useQuotations from "../../hooks/useQuotations";
import { useState } from "react";
import { useMessageContext } from "./MessageProvider";
const RequestCard = () => {
  const { addQuotation } = useQuotations();
  const [form] = Form.useForm();
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const { success, error } = useMessageContext();

  const handleSubmit = async (values: {
    name: string;
    email: string;
    mobile: string;
    company: string;
    service: string;
    projectInfo: string;
  }) => {
    console.log("Form Submitted!", values); // Check if this logs
    setLoading(true);
    try {
      const response = await addQuotation(values);
      if (response?.success) {
        success(t("quote.successMessage"));
        form.resetFields();
      } else {
        throw new Error("Failed to add contact");
      }
    } catch (err) {
      error(t("quote.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col xs={24} lg={12} style={{ padding: "1rem" }}>
        <DirectionAnimation
          id="image-animation"
          start={-100}
          end={10}
          duration={2}
          direction="topToBottom"
        >
          <div>
            <Text
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: "20px",
              }}
            >
              {t("start project")}
            </Text>
            <Title style={{ marginTop: "1rem" }}>
              {t("quote.mainSubtitle")}
            </Title>
            <Text style={{ fontSize: "1rem" }}>{t("quote.description")}</Text>
            <img
              src="/request_img.png"
              alt="A person smiling while working on a laptop at a desk"
              style={{
                marginTop: "2rem",
                borderRadius: "8px",
                width: "100%",
              }}
            />
          </div>
        </DirectionAnimation>
      </Col>
      <Col
        xs={24}
        lg={12}
        style={{ backgroundColor: "#2b3a67", padding: "2rem" }}
      >
        <DirectionAnimation
          id="text-animation"
          start={100}
          end={0}
          duration={1}
          direction="bottomToTop"
        >
          <div>
            <Title>{t("quote.secondTitle")}</Title>
            <Text>{t("quote.subtitle")}</Text>
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              style={{ marginTop: "2rem" }}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: t("quote.nameRequired") }]}
              >
                <Input placeholder={t("quote.form.name")} />
              </Form.Item>
              <Form.Item
                name="mobile"
                rules={[
                  { required: true, message: t("quote.mobileRequired") },
                  {
                    pattern: /^\+?[0-9]{10,15}$/,
                    message: t("quote.mobileInvalid"),
                  },
                ]}
              >
                <Input placeholder={t("quote.form.phone")} />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: t("quote.emailRequired") },
                  { type: "email", message: t("quote.emailInvalid") },
                ]}
              >
                <Input type="email" placeholder={t("quote.form.email")} />
              </Form.Item>
              <Form.Item name="company">
                <Input placeholder={t("quote.form.company")} />
              </Form.Item>
              <Form.Item
                name="service"
                rules={[
                  { required: true, message: t("quote.serviceRequired") },
                ]}
              >
                <Select placeholder={t("quote.form.service")}>
                  <Option value="ux-ui">
                    {t("quote.form.services.ux-ui")}
                  </Option>
                  <Option value="web-dev">
                    {t("quote.form.services.web-dev")}
                  </Option>
                  <Option value="seo">{t("quote.form.services.seo")}</Option>
                  <Option value="content">
                    {t("quote.form.services.content")}
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="projectInfo"
                rules={[
                  { required: true, message: t("quote.projectInfoRequired") },
                ]}
              >
                <Input.TextArea
                  placeholder={t("quote.form.projectInfo")}
                  rows={4}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="default"
                  htmlType="submit"
                  size="large"
                  shape="round"
                  loading={loading}
                  disabled={loading}
                  style={{ width: "30%" }}
                  onClick={() => form.submit()}
                >
                  {t("quote.form.button")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </DirectionAnimation>
      </Col>
    </Row>
  );
};
export default RequestCard;
