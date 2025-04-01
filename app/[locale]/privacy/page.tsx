"use client";
import { Col, Row } from "antd";
import BannerTop from "@/components/common/BannerTop";
import { useTranslation } from "react-i18next";
import PrivacyStatement from "@/components/common/PrivacyStatement"; // ✅ Custom component for privacy statement

const PrivacyStatementPage = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <BannerTop
        title={t("privacyStatement.title")}
        buttonText={t("learnMore")}
        backgroundVideo="/service_banner.mp4"
        onButtonClick={() => console.log("Learn More Button Clicked")}
        breadcrumbs={[
          { title: t("home") },
          { title: t("privacyStatement.title") },
        ]}
        bannerHeight={600}
      />
      <div className="container mx-auto px-4 py-16">
        {/* Privacy Statement Section */}
        <Row
          gutter={[16, 16]}
          justify="center"
          style={{ marginBottom: 30, marginTop: "40px" }}
        >
          <Col xs={24} sm={22} md={20} lg={18} xl={16}>
            <PrivacyStatement />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PrivacyStatementPage;
