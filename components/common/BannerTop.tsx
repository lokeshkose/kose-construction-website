// 'use client';

// import { Button, Typography, Grid, Row, Col, Breadcrumb, theme } from 'antd';
// import React from 'react';
// import styles from '../../styles/BannerTop.module.css';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import ZoomInEffect from '@/animations/ZoomAnimation';
// import ImageStrip from '@/animations/ImageStripAnimation';
// import DirectionAnimation from '@/animations/DirectionAnimation';

// const { useBreakpoint } = Grid;
// const { Title, Paragraph } = Typography;

// interface BreadcrumbItem {
//   title: string;
//   href?: string;
// }

// interface BannerSectionProps {
//   title: string;
//   description?: string;
//   buttonText?: string;
//   onButtonClick?: () => void;
//   backgroundImage?: string;
//   breadcrumbs?: BreadcrumbItem[];
//   bannerHeight?: number;
//   isHomeComp?: boolean;
// }

// const BannerTop: React.FC<BannerSectionProps> = ({
//   title,
//   description,
//   buttonText = 'Explore Our Services',
//   onButtonClick,
//   backgroundImage = '/default-banner.jpg',
//   breadcrumbs, // Default breadcrumb
//   bannerHeight = 800,
//   isHomeComp = false,
// }) => {
//   const screens = useBreakpoint();
//   const router = useRouter();
//   const { token } = theme.useToken();

//   return (
//     <section
//       className={styles['banner-container']}
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         height: `${bannerHeight}px`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}>
//       {/* <ZoomInEffect
//         src='https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg'
//         alt='Amazing view'
//         duration={2} // Optional: Customize the animation duration
//         startScale={0.5} // Optional: Customize the initial zoom level
//         endScale={1.2} // Optional: Customize the final zoom level
//         opacityStart={0} // Optional: Set initial opacity
//         opacityEnd={1} // Optional: Set final opacity
//         id='zoom-effect-img' // Optional: Set a custom ID for styling or other purposes
//       /> */}

//       {/* <ImageStrip
//         src='https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg' // Provide the image path
//         alt='Image with strip effect'
//         width={600} // Set the desired width
//         height={400} // Set the desired height
//         stripCount={18} // Optional: Set number of strips (default: 6)
//       /> */}
//       <div
//         className={styles['background-overlay']}
//         style={{ backgroundColor: token.colorBgBase }}></div>
//       <Row
//         align='middle'
//         className={styles['content-wrapper']}
//         style={{ width: '95vw' }}>
//         <Col
//           xs={24}
//           sm={24}
//           md={{ span: 16, offset: 4 }}
//           lg={{ span: 16, offset: 4 }}
//           xl={{ span: 16, offset: 4 }}>
//           {/* Breadcrumb Section */}

//           {/* Main Banner Content */}
//           <article className={styles['text-content']}>
//             <DirectionAnimation
//               id='dfsdfsfs'
//               start={200}
//               end={0}
//               duration={1}
//               direction={isHomeComp ? 'bottomToTop' : 'rightToLeft'}>
//               <Title
//                 style={{ fontSize: screens.md ? '65px' : '38px' }}
//                 level={1}>
//                 {title}
//               </Title>
//             </DirectionAnimation>
//             {breadcrumbs && (
//               <Breadcrumb
//                 separator='   /   '
//                 className={styles['breadcrumb']}>
//                 {breadcrumbs.map((item, index) => (
//                   <Breadcrumb.Item
//                     key={index}
//                     onClick={() => item.href && router.push(item.href)}>
//                     {item.href ? <a>{item.title}</a> : item.title}
//                   </Breadcrumb.Item>
//                 ))}
//               </Breadcrumb>
//             )}
//             {!breadcrumbs && (
//               <>
//                 {' '}
//                 <Paragraph style={{ fontSize: screens.md ? '25px' : '20px' }}>
//                   {description}
//                 </Paragraph>
//                 {buttonText && (
//                   <Button
//                     type='default'
//                     shape='round'
//                     size='large'
//                     // ghost
//                     // className={styles['explore-button']}
//                     onClick={onButtonClick}>
//                     {buttonText}
//                   </Button>
//                 )}
//               </>
//             )}
//           </article>
//         </Col>
//       </Row>
//     </section>
//   );
// };

// export default BannerTop;

'use client';

import { Button, Typography, Grid, Row, Col, Breadcrumb, theme } from 'antd';
import React from 'react';
import styles from '../../styles/BannerTop.module.css';
import { useRouter } from 'next/navigation';
import DirectionAnimation from '@/animations/DirectionAnimation';

const { useBreakpoint } = Grid;
const { Title, Paragraph } = Typography;

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BannerSectionProps {
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  backgroundImage?: string;
  backgroundVideo?: string; // New prop for video
  breadcrumbs?: BreadcrumbItem[];
  bannerHeight?: number;
  isHomeComp?: boolean;
}

const BannerTop: React.FC<BannerSectionProps> = ({
  title,
  description,
  buttonText = 'Explore Our Services',
  onButtonClick,
  backgroundImage = '/default-banner.jpg',
  backgroundVideo, // Video prop
  breadcrumbs,
  bannerHeight = 800,
  isHomeComp = false,
}) => {
  const screens = useBreakpoint();
  const router = useRouter();
  const { token } = theme.useToken();

  return (
    <section
      className={styles['banner-container']}
      style={{
        height: `${bannerHeight}px`,
        position: 'relative',
        overflow: 'hidden',
        width: '100vw',
      }}>
      {/* Background Video */}
      {backgroundVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles['background-video']}
          style={{
            // position: 'absolute',
            // top: '50%',
            // left: '50%',
            // width: '100vw',
            // height: '100vh',
            // objectFit: 'fill',
            // transform: 'translate(-50%, -50%)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: 'inherit',
            objectFit: 'fill',
          }}>
          <source
            src={backgroundVideo}
            type='video/mp4'
          />
        </video>
      ) : (
        // Fallback Background Image
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: 'inherit',
            backgroundSize: '100% 100%',
          }}
        />
      )}

      {/* Overlay */}
      <div
        className={styles['background-overlay']}
        style={{
          backgroundColor: token.colorBgBase,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.2, // Adjust opacity if needed
        }}
      />

      {/* Content Section */}
      <Row
        align='middle'
        className={styles['content-wrapper']}
        style={{
          width: '95vw',
          position: 'relative',
          zIndex: 2,
        }}>
        <Col
          xs={24}
          sm={24}
          md={{ span: 16, offset: 4 }}
          lg={{ span: 16, offset: 4 }}
          xl={{ span: 16, offset: 4 }}>
          <article className={styles['text-content']}>
            {/* <DirectionAnimation
              id='dfsdfsfs'
              start={200}
              end={0}
              duration={1}
              direction={isHomeComp ? 'bottomToTop' : 'rightToLeft'}>
              <Title
                style={{ fontSize: screens.md ? '65px' : '38px' }}
                level={1}>
                {title}
              </Title>
            </DirectionAnimation> */}

            {/* {breadcrumbs && (
              <Breadcrumb
                separator=' / '
                className={styles['breadcrumb']}>
                {breadcrumbs.map((item, index) => (
                  <Breadcrumb.Item
                    key={index}
                    onClick={() => item.href && router.push(item.href)}>
                    {item.href ? <a>{item.title}</a> : item.title}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            )} */}

            {/* {!breadcrumbs && (
              <>
                <Paragraph style={{ fontSize: screens.md ? '25px' : '20px' }}>
                  {description}
                </Paragraph>
                {buttonText && (
                  <Button
                    type='default'
                    shape='round'
                    size='large'
                    onClick={onButtonClick}>
                    {buttonText}
                  </Button>
                )}
              </>
            )} */}
          </article>
        </Col>
      </Row>
    </section>
  );
};

export default BannerTop;
