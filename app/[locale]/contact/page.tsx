"use client";
import { Form, Input, Button } from "antd";
import BannerTop from "@/components/common/BannerTop";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import ContactUsCard from "@/components/common/ContactUsCard";
import L from "leaflet";
const ContactPage = () => {
  const { t } = useTranslation("common");
  const position: [number, number] = [21.861, 77.789];

  const SetView = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, 13);
      }
    }, [center, map]);
    return null;
  };
  const customIcon = new L.Icon({
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    iconUrl: require("leaflet/dist/images/marker-icon.png"), // ✅ Ensure correct path
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"), // ✅ Ensure shadow loads
    shadowSize: [41, 41],
  });
  return (
    <>
      <BannerTop
        title={t("contactUs")}
        buttonText="Get Started"
        backgroundVideo="/contact_banner.mp4"
        // backgroundImage='/service_banner.png'
        onButtonClick={() => console.log("Button clicked")}
        breadcrumbs={[{ title: t("home") }, { title: t("contactUs") }]}
        bannerHeight={600}
      />
      <div className="container mx-auto px-4 py-16">
        <Row
          gutter={[16, 16]}
          justify="center"
          style={{ marginBottom: 30, marginTop: "40px" }}
        >
          <Col xs={24} sm={22} md={20} lg={18} xl={16}>
            <ContactUsCard />
          </Col>
        </Row>
        {/* Map Section */}
        <Row gutter={[16, 16]} justify="center" style={{ paddingBottom: "30px"}}>
          <Col xs={24} sm={22} md={20} lg={18} xl={16}>
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "400px", width: "100%", borderRadius: "10px" }}
              scrollWheelZoom={false}
            >
              <SetView center={position} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position} icon={customIcon}>
                <Popup>
                  {t("Kose Construction Office, Betul, MP")}
                </Popup>
              </Marker>
            </MapContainer>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ContactPage;
