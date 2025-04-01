import React from "react";
import { Card, Typography, Space, Divider, Collapse } from "antd";
import { useTranslation } from "react-i18next";

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const PrivacyStatement = () => {
  const { t } = useTranslation("common");

  return (
    <Card title={t("privacyStatement.title")} bordered={true}>
      <Space direction="vertical" size="large">
        {/* Introduction */}
        <Space direction="vertical">
          <Title level={4}>{t("privacyStatement.subtitle")}</Title>
          <Paragraph>{t("privacyStatement.introduction")}</Paragraph>
        </Space>

        <Divider />

        {/* Data Collection Section */}
        <Title level={5}>{t("privacyStatement.dataCollection.title")}</Title>
        <Paragraph>{t("privacyStatement.dataCollection.description")}</Paragraph>

        <Divider />

        {/* Data Usage Section */}
        <Title level={5}>{t("privacyStatement.dataUsage.title")}</Title>
        <Paragraph>{t("privacyStatement.dataUsage.description")}</Paragraph>

        <Divider />

        {/* FAQs Section */}
        <Title level={5}>{t("privacyStatement.faqs.title")}</Title>
        <Collapse accordion>
          <Panel header={t("privacyStatement.faqs.question1")} key="1">
            <Text>{t("privacyStatement.faqs.answer1")}</Text>
          </Panel>
          <Panel header={t("privacyStatement.faqs.question2")} key="2">
            <Text>{t("privacyStatement.faqs.answer2")}</Text>
          </Panel>
          <Panel header={t("privacyStatement.faqs.question3")} key="3">
            <Text>{t("privacyStatement.faqs.answer3")}</Text>
          </Panel>
        </Collapse>
      </Space>
    </Card>
  );
};

export default PrivacyStatement;