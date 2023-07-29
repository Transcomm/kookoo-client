import {
    CompassOutlined,
    PoweroffOutlined,
    DeploymentUnitOutlined,
  } from "@ant-design/icons";
  import { Button, Col, Layout, Menu, Row, Typography } from "antd";
  import { useLocation, Navigate, Link, Outlet } from "react-router-dom";
  import { useSelector } from "react-redux";
  import {
    //selectCurrentRefresh,
    selectCurrentToken,
  } from "../../../features/auth/authSlice";
  import { useDispatch } from "react-redux";
  import { logOut } from "../../../features/auth/authSlice";
  import { apiSlice } from "../../../app/api/apiSlice";
  //import { useRefreshMutation } from "../../../features/auth/authApiSlice";
  
  const { Title } = Typography;
  const { Header, Content, Sider } = Layout;
  
  function getItem(label: any, key: any, icon: any) {
    return {
      key,
      icon,
      label,
    };
  }
  
  const Panel = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectCurrentToken);
    //const refreshToken = useSelector(selectCurrentRefresh);
    const location = useLocation();
    //const [logout] = useRefreshMutation();
  
    const logOutUser = async () => {
      // const data = {
      //   refresh: refreshToken,
      // };
      // try {
      //   const res = await logout(data).unwrap();
      //   dispatch(logOut());
      //   dispatch(apiSlice.util.resetApiState());
      //   console.log("logout clicked", res);
      // } catch (error) {
      //   console.log(error);
      // }
      dispatch(logOut());
      dispatch(apiSlice.util.resetApiState());
    };
  
    let items: any = [];
    items = [
      getItem(<Link to="">Dashboard</Link>, "dashboard", <CompassOutlined />),
      // getItem(
      //   <Link to="profile">Bulk SMS</Link>,
      //   "profile",
      //   <SolutionOutlined/>
      // ),
      getItem(
        <Button style={{ border: "none" }} ghost onClick={() => logOutUser()}>
          Log out
        </Button>,
        "logout",
        <PoweroffOutlined />
      ),
    ];
    return (
      <Layout>
        <Header
          style={{
            backgroundColor: "black",
            padding: 5,
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <Row justify={"center"}>
            <Col xs={12} sm={12} md={24} lg={24}>
              <Title style={{ margin: 0, paddingTop: "5px", color: "white" }}>
                <DeploymentUnitOutlined />
                Stats
              </Title>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider
            style={{ backgroundColor: "black" }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo" />
            <Menu
              style={{ backgroundColor: "black" }}
              mode="inline"
              items={items}
              className="menuText"
            />
          </Sider>
          <Layout>
            <Content>
              {token ? (
                <Outlet />
              ) : (
                <Navigate to="/login" state={{ from: location }} replace />
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  };
  
  Panel.propTypes = {};
  
  export default Panel;
  