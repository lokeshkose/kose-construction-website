import DirectionAnimation from "@/animations/DirectionAnimation";
import { Button, Col, Row, Typography, Grid } from "antd";
import React, { FC } from "react";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

interface WorkCardProps {
  title: string;
  description: string;
  backgroundColor: string;
  image: string;
  reverse: boolean;
  subTitle: string;
  onButtonClick?: () => void;
}

const WorkCard: FC<WorkCardProps> = ({
  title,
  description,
  backgroundColor,
  image,
  reverse,
  subTitle,
  onButtonClick,
}) => {
  const screens = useBreakpoint();
  return (
    <Row>
      {!reverse && (
        <Col xs={24} md={12}>
          <DirectionAnimation
            id="dfasf"
            start={450}
            end={0}
            duration={2}
            direction="leftToRight"
          >
            <img
              src={image}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                minHeight: "450px",
                maxHeight: "450px",
              }}
            />
          </DirectionAnimation>
        </Col>
      )}
      <Col
        xs={24}
        md={12}
        style={{ backgroundColor, padding: "1rem", minHeight: "450px" }}
      >
        <DirectionAnimation
          id="dfasf"
          start={reverse ? 450 : -450}
          end={0}
          duration={2}
          direction={reverse ? "leftToRight" : "rightToLeft"}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Text
              style={{
                color: "#00bfa6",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: screens.md ? "18px" : "18px",
              }}
            >
              {title}
            </Text>
            <Title
              level={2}
              style={{
                fontSize: screens.md ? "38px" : "38px",
                margin: "0px",
              }}
            >
              {subTitle}
            </Title>
            <Text
              type="secondary"
              style={{
                fontSize: screens.md ? "16px" : "16px",
                lineHeight: "1.6",
              }}
            >
              {description}
            </Text>
            <Button
              type="default"
              shape="round"
              size="large"
              style={{ maxWidth: "150px" }}
              onClick={onButtonClick}
            >
              visit..
            </Button>
          </div>
        </DirectionAnimation>
      </Col>
      {reverse && (
        <Col xs={24} md={12}>
          <DirectionAnimation
            id="dfasf"
            start={-450}
            end={0}
            duration={2}
            direction="rightToLeft"
          >
            <img
              src={image}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                minHeight: "450px",
                maxHeight: "450px",
              }}
            />
          </DirectionAnimation>
        </Col>
      )}
    </Row>
  );
};

export default WorkCard;
