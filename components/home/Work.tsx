import { Row, Col } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import WorkCard from "../common/WorkCard";
import SectionHeader from "../common/SectionHeader";
import styles from "../../styles/Home.module.css";
import { TFunction } from "next-i18next";
import { useRouter } from "next/navigation";

/**
 * Function to generate localized work items.
 */
const getWorkItems = (t: TFunction) => [
  {
    title: t("works.workItems.0.title", "Innovative Solutions"),
    subTitle: t("works.workItems.0.subTitle", "Transforming the Future"),
    description: t(
      "works.workItems.0.description",
      "We leverage cutting-edge technology to create impactful solutions tailored to your needs."
    ),
    backgroundColor: "rgb(40 89 152)",
    image: "/work1.jpeg",
    // image: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg',
    reverse: false,
    url: "https://devkirtifoundation.in/#/",
  },
  {
    title: t("works.workItems.1.title", "AI - DEVELOPMENT"),
    subTitle: t(
      "works.workItems.1.subTitle",
      "We have developed an AI system for automated customer support"
    ),
    description: t(
      "works.workItems.1.description",
      "We leverage cutting-edge technology to create impactful solutions tailored to your needs."
    ),
    backgroundColor: "#306357",
    image: "/work2.jpeg",
    reverse: true,
    url: "https://hydrocareinnovation.com/",
  },
  {
    title: t("works.workItems.2.title", "E-Commerce App"),
    subTitle: t("works.workItems.2.subTitle", "Fast & Secure Online Shopping"),
    description: t(
      "works.workItems.2.description",
      "Our mobile app revolutionized online shopping, providing a seamless experience for users worldwide."
    ),
    backgroundColor: "#d64902",
    image: "/work3.jpeg",
    reverse: false,
    url: "https://hydrocareinnovation.com/",
  },
];

const WorksSection: FC = () => {
  const router = useRouter();

  const handleSubmit = async (work: {
    title: string;
    subTitle: string;
    description: string;
    backgroundColor: string;
    image: string;
    // image: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg',
    reverse: boolean;
    url: string;
  }) => {
    window.open(work.url, "_blank");
    console.log("button clicked", work);
  };
  const { t } = useTranslation("common");
  const workItems = getWorkItems(t);

  return (
    <section className={styles.worksSection}>
      <SectionHeader
        title={t("works.title", "WORKS")}
        subTitle={t("works.subTitle", "Our Works")}
        description={t(
          "works.description",
          "We provide high-quality development services to help your business grow faster."
        )}
        // buttonText={t("works.buttonText", "View All Works")}
        id="2"
      />
      <Row gutter={[32, 32]}>
        {workItems.map((work, index) => (
          <Col key={index} span={24}>
            <article>
              <WorkCard {...work} onButtonClick={() => handleSubmit(work)} />
            </article>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default WorksSection;
