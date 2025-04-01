import React from "react";
import { Card, Typography, Space, Divider, Collapse } from "antd";
import { useTranslation } from "react-i18next";

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const TermsOfUse = () => {
  const { t } = useTranslation("common");

  return (
    <Card title={t("termsOfUse.title")} bordered={true}>
      <Space direction="vertical" size="large">
        {/* Introduction */}
        <Space direction="vertical">
          <Title level={4}>{t("termsOfUse.subtitle")}</Title>
          <Paragraph>{t("termsOfUse.introduction")}</Paragraph>
        </Space>

        <Divider />

        {/* User Responsibilities Section */}
        <Title level={5}>{t("termsOfUse.userResponsibilities.title")}</Title>
        <Paragraph>{t("termsOfUse.userResponsibilities.description")}</Paragraph>

        <Divider />

        {/* Prohibited Activities Section */}
        <Title level={5}>{t("termsOfUse.prohibitedActivities.title")}</Title>
        <Paragraph>{t("termsOfUse.prohibitedActivities.description")}</Paragraph>

        <Divider />

        {/* FAQs Section */}
        <Title level={5}>{t("termsOfUse.faqs.title")}</Title>
        <Collapse accordion>
          <Panel header={t("termsOfUse.faqs.question1")} key="1">
            <Text>{t("termsOfUse.faqs.answer1")}</Text>
          </Panel>
          <Panel header={t("termsOfUse.faqs.question2")} key="2">
            <Text>{t("termsOfUse.faqs.answer2")}</Text>
          </Panel>
          <Panel header={t("termsOfUse.faqs.question3")} key="3">
            <Text>{t("termsOfUse.faqs.answer3")}</Text>
          </Panel>
        </Collapse>
      </Space>
    </Card>
  );
};

export default TermsOfUse;