"use client";

import { useEffect, useState } from "react";
import { Layout, Menu, Button, Drawer, Row, Col } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  FileTextOutlined,
  ContactsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Determine selected menu item based on pathname
  const getSelectedKey = () => {
    if (pathname.startsWith("/admin/dashboard/quotes")) return "1";
    if (pathname.startsWith("/admin/dashboard/subscriptions")) return "2";
    if (pathname.startsWith("/admin/dashboard/contacts")) return "3";
    return "1"; // Default
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    localStorage.clear();
    router.replace("/"); // Redirect to login/home

    // Prevent back navigation
    window.history.pushState(null, "", "/");
    window.addEventListener("popstate", () => {
      router.replace("/");
    });
  };

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", () => {
      window.history.pushState(null, "", window.location.href);
    });
  }, []);
  // Sidebar menu items
  const menuItems = (
    <Menu mode="inline" selectedKeys={[getSelectedKey()]} theme="dark">
      <Menu.Item key="1" icon={<FileTextOutlined />}>
        <Link href="/admin/dashboard/quotes">Quote</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <Link href="/admin/dashboard/subscriptions">Subscription</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<ContactsOutlined />}>
        <Link href="/admin/dashboard/contacts">Contacts</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Row>
      {/* Desktop Sidebar (hidden on small screens) */}
      <Col xs={0} sm={0} md={6} lg={5} xl={4}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          style={{ height: "100vh" }}
        >
          <div style={{ textAlign: "center", padding: "16px" }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                width: collapsed ? "40px" : "180px",
                height: "50px",
                transition: "width 0.3s",
              }}
            />
          </div>
          {menuItems}
          {/* Logout Button */}
          <div
            style={{
              position: "absolute",
              bottom: "5vh",
              width: "100%",
              padding: "16px",
            }}
          >
            <Button
              onClick={handleLogout}
              type="default"
              size="large"
              shape="round"
              icon={<LogoutOutlined />}
              danger
              block
            >
              Logout
            </Button>
          </div>
        </Sider>
      </Col>

      {/* Mobile Menu Button (Fixed Position) */}
      <Col xs={24} sm={0}>
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
          style={{
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 1000,
            background: "#001529",
            color: "white",
            borderRadius: "6px",
            padding: "10px",
          }}
        />
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          style={{ height: "100vh" }}
        >
          {menuItems}
        </Drawer>
      </Col>
    </Row>
  );
};

export default Sidebar;
