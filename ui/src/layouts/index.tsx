import {
  BookTwoTone,
  HomeFilled,
  KeyOutlined,
  SmileTwoTone,
} from "@ant-design/icons";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import { App, ConfigProvider, notification } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation, Icon, history } from "umi";
import useApi from "@/utils/fetcher";

interface UserInfo {
  data: {
    nickname: string;
  };
}

const Layout = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    history.push("/login");
  }

  const location = useLocation();

  const [userInfo, setUserInfo] = useState<UserInfo>();

  const refresh = async () => {
    try {
      const res = await useApi("/api/admin/userInfo");

      setUserInfo(await res.json());

      if (res.status != 200) throw new Error("获取用户信息失败");
    } catch (err) {
      setUserInfo({
        data: {
          nickname: "获取失败",
        },
      });
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ConfigProvider>
      <App>
        <ProLayout
          title="reblog"
          logo={<BookTwoTone />}
          siderWidth={216}
          location={location}
          route={{
            path: "/",
            routes: [
              {
                path: "/",
                name: "首页",
                icon: <HomeFilled />,
              },
            ],
          }}
          avatarProps={{
            src: <SmileTwoTone />,
            title: userInfo ? userInfo["data"]["nickname"] : "Loading",
            size: "small",
          }}
          actionsRender={(props) => {
            if (props.isMobile) return [];
            return [
              <KeyOutlined
                onClick={() => {
                  localStorage.removeItem("token");
                  history.push("/login");
                }}
              />,
            ];
          }}
        >
          <PageContainer>
            <ProCard style={{ minHeight: 700 }}>
              <Outlet />
            </ProCard>
          </PageContainer>
        </ProLayout>
      </App>
    </ConfigProvider>
  );
};

export default Layout;
