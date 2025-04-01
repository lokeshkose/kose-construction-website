import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import Image from 'next/image';
import Style from '../../styles/Home.module.css';

const { Title, Text } = Typography;

const About = () => {
  return (
    <div className={Style.aboutContainer}>
      <Row gutter={[16, 16]}>
        {/* Image Column */}
        <Col xs={24} md={12}>
          <div className={Style.imageWrapper}>
            <Image
              src="https://templatekits.themewarrior.com/solvero/wp-content/uploads/sites/65/elementor/thumbs/about-sect-puhjksm2lu4f1zq1nmzjuocvg38aocc5vwetj6wfw8.jpg"
              alt="A man and a woman working together on a laptop in a bright room with wooden beams and a large window"
              layout="responsive"
              width={600}
              height={500}
              className={Style.aboutImage}
            />
          </div>
        </Col>

        {/* Text Column */}
        <Col xs={24} md={12}>
          <Text
            style={{
              // color: '#38b2ac',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
            About Us
          </Text>
          <Title level={1} style={{ color: 'white', marginTop: '0.5rem' }}>
            We’re On Mission To Help Business Grow Faster Than Ever.
          </Title>
          <Text
            style={{
              color: '#a0aec0',
              marginTop: '1rem',
              display: 'block',
            }}>
            Commodo elementum, sed imperdiet nunc euismod etiam aliquet viverra
            enim. Adipiscing nunc condimentum risus id. Aquam mattis magna
            facilisi fermentum, euismod vitae. Porttitor sit tincidunt dictum
            facilisi eget orci velit. Nulla laoreet nunc gravida augue aenean
            sed elementum, in.
          </Text>
          <Button
            type="primary"
            size="large"
            style={{
              marginTop: '1.5rem',
              backgroundColor: '#38b2ac',
              borderColor: '#38b2ac',
            }}>
            Learn More
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default About;
