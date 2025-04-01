"use client";

import { useTranslation } from "react-i18next";
import Service from "@/components/home/ServicesSection";
import WorksSection from "@/components/home/Work";
import JoinUs from "@/components/home/JoinUs";
import { Col, Row, theme } from "antd";
import AboutCard from "@/components/common/AboutCard";
import StatsSection from "@/components/home/StatsSection";
import styles from "../../styles/Home.module.css";
import BannerTop from "@/components/common/BannerTop";
import { useRouter } from "next/navigation";
export default function Home() {
  const { t } = useTranslation("common");
  const { token } = theme.useToken();
  const router = useRouter();
  const statsData = [
    { value: 99, description: t("stats.successRate"), suffix: "%" },
    { value: 35, description: t("stats.businesses"), suffix: "+" },
    { value: 30, description: t("stats.clients"), suffix: "+" },
    { value: 4.6, description: t("stats.reviews"), suffix: "" },
  ];

  const aboutData = {
    title: t("abouts.title"),
    subTitle: t("abouts.subtitle", "abouts Us"),
    description: t("abouts.description"),
    buttonText: t("abouts.button"),
    imageUrl: "/about_us.png",
  };

  const bannerData = {
    title: t("homeBanner.title"),
    description: t("homeBanner.description"),
    buttonText: t("homeBanner.buttonText"),
    backgroundVideo: "/home_banner.mp4",
    bannerHeight: 830,
    // backgroundImage:'/home_banner.png'
    // 'https://storage.googleapis.com/a1aa/image/pOuMS3EDbR0tpzgX8wCYrxtCakO4X65QJuOo4t2UkCc.jpg',
  };
  const handleSubmit = async () => {
    router.push("/en/quote");
    console.log("button clicked");
  };
  const handleAboutSubmit = async () => {
    router.push("/en/about");
    console.log("button clicked");
  };
  return (
    <>
      {/* Banner Section */}
      <BannerTop
        {...bannerData}
        isHomeComp={true}
        onButtonClick={handleSubmit}
      />

      {/* Stats Section */}
      <Row
        gutter={[16, 16]}
        justify="center"
        style={{ background: token.colorPrimaryBg, marginBottom: 50 }}
        className={styles.statsWrapper}
      >
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <StatsSection stats={statsData} />
        </Col>
      </Row>

      {/* About Section */}
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: 0 }}>
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <AboutCard
            {...aboutData}
            onButtonClick={handleAboutSubmit}
            isHome={true}
          />
        </Col>
      </Row>

      {/* Service Section */}
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: 30 }}>
        <Col xs={22} sm={22} md={20} lg={18} xl={16}>
          <Service />
        </Col>
      </Row>

      {/* Works Section */}
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: 120 }}>
        <Col xs={22} sm={22} md={20} lg={18} xl={16}>
          <WorksSection />
        </Col>
      </Row>

      {/* Join Us Section */}
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: "0px" }}>
        <Col xs={22} sm={22} md={22} lg={22} xl={20}>
          <JoinUs />
        </Col>
      </Row>
    </>
  );
}
