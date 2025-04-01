import { Card, Typography, Space, Button, Divider, Collapse, Flex } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const SupportCard = () => {
  const { t } = useTranslation("common");

  return (
    <Card
      title={<Title level={4}>{t("support.title")}</Title>}
      bordered={true}
      style={{ maxWidth: 900, margin: "auto", borderRadius: 15 }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Contact Details */}
        <Space direction="vertical" style={{ width: "100%" }}>
          <Flex align="center" gap={8}>
            <MailOutlined style={{ fontSize: 16, color: "#1890ff" }} />
            <Link href="mailto:earlytech.info@gmail.com" passHref>
              <Text strong>{t("support.email")}</Text>
            </Link>
          </Flex>
          <Flex align="center" gap={8}>
            <PhoneOutlined style={{ fontSize: 16, color: "#52c41a" }} />
            <Link href="tel:+919098518231" passHref>
              <Text strong>{t("support.phone")}</Text>
            </Link>
          </Flex>
          <Flex align="center" gap={8}>
            <EnvironmentOutlined style={{ fontSize: 16, color: "#faad14" }} />
            <Link
              href="https://www.google.com/maps/search/?api=1&query=Pragati Vihar, Badia Keema, Madhya Pradesh 452016"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text strong>{t("support.address")}</Text>
            </Link>
          </Flex>
          <Flex align="center" gap={8}>
            <ClockCircleOutlined style={{ fontSize: 16, color: "#722ed1" }} />
            <Text strong>{t("support.operatingHours")}</Text>
          </Flex>
        </Space>

        <Divider />

        {/* FAQ Section */}
        <Title level={5} style={{ marginBottom: 0 }}>
          <QuestionCircleOutlined /> {t("support.faqs.title")}
        </Title>
        <Collapse accordion>
          <Panel header={t("support.faqs.howToGetSupport")} key="1">
            <Text>{t("support.faqs.answers.howToGetSupport")}</Text>
          </Panel>
          <Panel header={t("support.faqs.responseTime")} key="2">
            <Text>{t("support.faqs.answers.responseTime")}</Text>
          </Panel>
          <Panel header={t("support.faqs.liveSupport")} key="3">
            <Text>{t("support.faqs.answers.liveSupport")}</Text>
          </Panel>
        </Collapse>

        <Divider />

        {/* Contact Support Button */}
        <Flex justify="center">
          <Link href="/contact" passHref>
            <Button type="primary" size="large">
              {t("support.contactUs")}
            </Button>
          </Link>
        </Flex>
      </Space>
    </Card>
  );
};

export default SupportCard;
