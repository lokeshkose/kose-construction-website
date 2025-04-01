"use client";

import BannerTop from "@/components/common/BannerTop";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import WorksSection from "@/components/home/Work";
import AboutCard from "@/components/common/AboutCard";

const About = () => {
  const { t } = useTranslation("common");
  const aboutData = {
    title: t("abouts.title"),
    subTitle: t("abouts.subtitle", "abouts Us"),
    description: t("abouts.description"),
    buttonText: t("abouts.button"),
    imageUrl:'/about_us.png'
      // "https://templatekits.themewarrior.com/solvero/wp-content/uploads/sites/65/elementor/thumbs/about-sect-puhjksm2lu4f1zq1nmzjuocvg38aocc5vwetj6wfw8.jpg",
  };
  const aboutData1 = {
    title: t("abouts1.title"),
    subTitle: t("abouts1.subtitle", "abouts Us"),
    description: t("abouts1.description"),
    buttonText: t("abouts1.button"),
    imageUrl: '/who_are_us.png'  };
  const aboutData2 = {
    title: t("abouts2.title"),
    subTitle: t("abouts2.subtitle", "abouts Us"),
    description: t("abouts2.description"),
    buttonText: t("abouts2.button"),
    imageUrl:'/our_mission.png'  };
  return (
    <div className="mb-68">
      <BannerTop
        title={t("about")}
        buttonText="Get Started"
        backgroundVideo="/about_banner.mp4"
        // backgroundImage="/test.png"
        onButtonClick={() => console.log("Button clicked")}
        breadcrumbs={[{ title: t("home") }, { title: t("about") }]}
        bannerHeight={600}
      />
      <Row
        gutter={[16, 16]}
        justify="center"
        style={{ marginBottom: 30, marginTop: "20px" }}
      >
        <Col xs={24} sm={22} md={22} lg={20} xl={18}>
          <AboutCard {...aboutData} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: 30 }}>
        <Col xs={24} sm={22} md={22} lg={20} xl={18}>
          <AboutCard {...aboutData1} reverse />
        </Col>
      </Row>

      <Row gutter={[16, 16]} justify="center" >
        <Col xs={24} sm={22} md={22} lg={20} xl={18}>
          <AboutCard {...aboutData2} />
        </Col>
      </Row>
    </div>
  );
};
export default About;
