import { Row, Col, Typography, Button, Grid } from "antd";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "../../styles/Home.module.css";
import DirectionAnimation from "@/animations/DirectionAnimation";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const JoinSection: FC = () => {
  const router = useRouter();

  const { t, i18n } = useTranslation("common");
  const screens = useBreakpoint();

  // Memoized content
  const content = useMemo(
    () => ({
      title: t("joinUs.title"),
      subTitle: t("joinUs.subTitle"),
      description: t("joinUs.description"),
      buttonText: t("joinUs.buttonText"),
    }),
    [t]
  );

  // Memoized images
  const images = useMemo(
    () => [
      {
        src: "https://storage.googleapis.com/a1aa/image/kCvybbspamb_XZRoRa_ahr33ldJ-cPxzeJoI6STfR9k.jpg",
        alt: "Person using VR headset",
      },
      {
        src: "https://storage.googleapis.com/a1aa/image/7SAdRNBpV5_wpClA4-kHmh4LCUzEvHXKZtXvobPEoRk.jpg",
        alt: "Two people discussing over a tablet",
      },
    ],
    []
  );
  const handleClick = async()=>{
    router.push("/en/quote");

  }
  return (
    <section className={styles.joinSection}>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Row gutter={[24, 24]}>
            {images.map((image, index) => (
              <Col span={12} key={index}>
                <DirectionAnimation
                  id="dfasf"
                  start={index === 0 ? 100 : 80}
                  end={0}
                  duration={index === 0 ? 1 : 1.5}
                  direction={"bottomToTop"}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{
                      width: "100%",
                      height: "500px",
                      position: index === 0 ? "relative" : "static",
                      top: index === 0 ? "-45px" : "0",
                    }}
                  />
                </DirectionAnimation>
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={24} lg={12} style={{ paddingLeft: "1rem" }}>
          <DirectionAnimation
            id="dfasf"
            start={-100}
            end={0}
            duration={1}
            direction={"topToBottom"}
          >
            <Text
              style={{
                color: "#38b2ac",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: screens.md ? "18px" : "18px",
              }}
            >
              {content.title}
            </Text>
            <Title
              level={1}
              style={{
                marginTop: "0.5rem",
                fontSize: screens.md ? "38px" : "38px",
              }}
            >
              {content.subTitle}
            </Title>
            <Text
              type="secondary"
              style={{
                display: "block",
                marginBottom: "1.5rem",
                fontSize: screens.md ? "16px" : "16px",
              }}
            >
              {content.description}
            </Text>
            <Button
              type="default"
              shape="round"
              size="large"
              onClick={handleClick}
            >
              {content.buttonText}
            </Button>
          </DirectionAnimation>
        </Col>
      </Row>
    </section>
  );
};

export default JoinSection;
