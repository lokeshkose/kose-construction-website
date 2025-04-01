import React, { FC } from "react";
import { Row, Col, Typography, Button, Grid } from "antd";
import Image from "next/image";
import Style from "../../styles/About.module.css";
import DirectionAnimation from "@/animations/DirectionAnimation";

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

interface AboutCardProps {
  title: string;
  subTitle: string;
  isHome?: boolean;
  onButtonClick?: () => void;
  description: string;
  buttonText: string;
  imageUrl: string;
  reverse?: boolean; // Reverse order if true
}

const AboutCard: FC<AboutCardProps> = ({
  title,
  subTitle,
  description,
  buttonText,
  imageUrl,
  onButtonClick,
  isHome = false,
  reverse = false,
}) => {
  const screens = useBreakpoint();

  return (
    <div className={Style.aboutContainer}>
      <Row
        gutter={[16, 16]}
        justify="space-between"
        style={{ flexWrap: "wrap" }}
      >
        {/* Image Column */}
        <Col
          xs={24}
          md={12}
          order={reverse ? 2 : 1} // Order based on `reverse` prop
        >
          <DirectionAnimation
            id="image-animation"
            start={60}
            end={10}
            duration={2}
            direction="bottomToTop"
          >
            <div className={Style.imageWrapper}>
              <Image
                src={imageUrl}
                alt="About Us"
                layout="responsive"
                width={600}
                height={500}
                className={Style.aboutImage}
              />
            </div>
          </DirectionAnimation>
        </Col>

        {/* Text Column */}
        <Col
          xs={24}
          md={12}
          order={reverse ? 1 : 2} // Order based on `reverse` prop
        >
          <DirectionAnimation
            id="text-animation"
            start={-60}
            end={0}
            duration={1}
            direction="topToBottom"
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Text
                type="secondary"
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {subTitle}
              </Text>

              <Title
                level={1}
                style={{
                  fontSize: "38px",
                  marginTop: "24px",
                }}
              >
                {title}
              </Title>

              <Text
                type="secondary"
                style={{
                  fontSize: "16px",
                }}
              >
                {description}
              </Text>

              {isHome && (
                <Button
                  type="default"
                  shape="round"
                  size="large"
                  style={{ maxWidth: "140px" }}
                  onClick={onButtonClick}
                >
                  {buttonText}
                </Button>
              )}
            </div>
          </DirectionAnimation>
        </Col>
      </Row>
    </div>
  );
};

export default AboutCard;
