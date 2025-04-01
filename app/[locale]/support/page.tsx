"use client";
import { Col, Row } from "antd";
import BannerTop from "@/components/common/BannerTop";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";
import SupportCard from "@/components/common/SupportCard"; // ✅ Custom component for support details

const SupportPage = () => {
  const { t } = useTranslation("common");
  const position: [number, number] = [22.704, 75.9412];

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
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    shadowSize: [41, 41],
  });

  return (
    <>
      <BannerTop
        title={t("supports")}
        buttonText={t("getSupport")}
        backgroundVideo="/service_banner.mp4"
        onButtonClick={() => console.log("Support Button Clicked")}
        breadcrumbs={[{ title: t("home") }, { title: t("supports") }]}
        bannerHeight={600}
      />
      <div className="container mx-auto px-4 py-16">
        {/* Support Card Section */}
        <Row gutter={[16, 16]} justify="center" style={{ marginBottom: 30, marginTop: "40px" }}>
          <Col xs={24} sm={22} md={20} lg={18} xl={16}>
            <SupportCard />
          </Col>
        </Row>

        {/* Map Section */}
        <Row gutter={[16, 16]} justify="center" style={{ marginTop: "4rem" }}>
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
                <Popup>{t("mapPopup")}</Popup>
              </Marker>
            </MapContainer>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SupportPage;