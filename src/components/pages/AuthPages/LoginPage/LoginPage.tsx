import {
    Layout,
    Col,
    Row,
    Form,
    Button,
    Input,
    Typography,
    notification,
  } from "antd";
  import {
    LockOutlined,
    UserOutlined,
    LoginOutlined,
    DeploymentUnitOutlined,
  } from "@ant-design/icons";
  import { useRef, useEffect } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { useDispatch } from "react-redux";
  import { setCredentials } from "../../../../features/auth/authSlice";
  import { useLoginMutation } from "../../../../features/auth/authApiSlice";
  
  const { Header, Content } = Layout;
  const { Title } = Typography;
  
  const validateMessages = {
    required: "Your ${label} is required!",
    types: {
      email: "Your ${label} is not a valid email!",
    },
  };
  
  const LoginPage = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
  
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    let noficationMsg: String;
  
    const openNotification = () => {
      notification.error({
        message: "Ooops, something went wrong!",
        description: `${noficationMsg}`,
        placement: "topLeft",
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    };
  
    useEffect(() => {
      userRef.current?.focus();
    }, []);
  
    const onFinish = async (values: any) => {
      try {
        const userData = await login(values).unwrap();
        dispatch(setCredentials({ ...userData }));
        navigate("/panel");
      } catch (error: any) {
        if (error?.data?.detail) {
          noficationMsg = `${error?.status} error - ${error?.data?.detail} NB: Check your password and username and try again`;
          openNotification();
        } else {
          noficationMsg = `${error?.status} error - Try again later`;
          openNotification();
        }
      }
    };
    return (
      <Layout style={{ height: "100dvh", backgroundColor: "black" }}>
        <Header
          style={{
            backgroundColor: "#e61e2b",
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
        <Content className="inherit-height">
          <Row className="inherit-height" justify="center">
            <Col xs={20} sm={20} md={14} lg={14}>
              <Row justify="center" className="center-div">
                <Col className="login-bg" xs={0} sm={0} md={12} lg={12}></Col>
                <Col xs={24} sm={24} md={10} lg={10}>
                  <Title level={4} style={{ color: "#e61e2b" }}>
                    <LoginOutlined />
                    &nbsp; KooKoo Stats Portal
                  </Title>
                  <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                  >
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "The input is not valid email!",
                        },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="johndoe@etc.com"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        style={{ backgroundColor: "#e61e2b" }}
                        loading={isLoading}
                      >
                        Log in
                      </Button>
                    </Form.Item>
                    <Form.Item style={{ textAlign: "center", color:"white" }}>
                      Or&nbsp;
                      <Link to="/forgot-password" className="thelinks" style={{}}>
                        Forgot password?
                      </Link>
                    </Form.Item>
                    <hr />
                    <Form.Item style={{ textAlign: "center", color: "white" }}>
                      Powered by&nbsp;
                      <a
                        href="https://www.transcommedia.com/"
                        target="_blank"
                        className="thelinks"
                      >
                        Transcom Media Limited
                      </a>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  };
  
  LoginPage.propTypes = {};
  
  export default LoginPage;
  