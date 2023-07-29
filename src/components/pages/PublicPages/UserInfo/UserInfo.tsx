import {
    Layout,
    Col,
    Row,
    Form,
    Button,
    Input,
    Typography,
    notification,
    Checkbox,
    Space,
    Radio,
    Alert,
  } from "antd";
  import { useUserDataMutation } from "../../../../features/auth/registerUserApiSlice";
  import type { RadioChangeEvent } from "antd";
  import { useState } from "react";
  
  const { Header, Content } = Layout;
  const { Title } = Typography;
  
  const validateMessages = {
    required: "Your ${label} is required!",
    types: {
      email: "Your ${label} is not a valid email!",
    },
  };
  
  const UserInfo = () => {
    const [register, { isLoading }] = useUserDataMutation();
    const [form] = Form.useForm();
    const [value, setValue] = useState("");
    const [gender, setGender] = useState("");
  
    const onChange = (e: RadioChangeEvent) => {
      console.log("radio checked", e.target.value);
      setValue(e.target.value);
    };
  
    const onChangeGender = (e: RadioChangeEvent) => {
      console.log("radio checked", e.target.value);
      setGender(e.target.value);
    };
  
    let noficationMsg: String;
  
    const openNotificationSuccess = () => {
      notification.success({
        message: "Hey there!",
        description: `${noficationMsg}`,
        onClick: () => {
          console.log("Notification Clicked!");
        },
        duration: 6.5,
      });
    };
  
    const openNotification = () => {
      notification.error({
        message: "Ooops, something went wrong!",
        description: `${noficationMsg}`,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    };
  
    function addMinutesToCurrentTime(minutesToAdd: number): Date {
      const currentTime = new Date();
      const updatedTime = new Date(currentTime.getTime() + minutesToAdd * 60000);
      return updatedTime;
    }
  
    const minutesToAdd = 5;
    const updatedTime = addMinutesToCurrentTime(minutesToAdd);
  
    const onFinish = async (values: any) => {
      // Declare redirect_url
      let redirect_url;
  
      // Get URL searchParams
      var url_string = window.location.href;
      var url = new URL(url_string);
      var res = url.searchParams.get("res");
      var mac = url.searchParams.get("mac");
      var user = url.searchParams.get("user");
      var uamport = url.searchParams.get("uamport");
      var userurl = url.searchParams.get("userurl");
      var nasid = url.searchParams.get("nasid");
      var uamip = url.searchParams.get("uamip");
      var error = url.searchParams.get("error");
      var chap_id = url.searchParams.get("chap-id");
      var chap_challenge = url.searchParams.get("chap-challenge");
      var ssl_login = url.searchParams.get("ssl-login");
  
      // Create an object with the url data
      const data = {
        res,
        mac,
        user,
        uamport,
        userurl,
        nasid,
        uamip,
        error,
        chap_id,
        chap_challenge,
        ssl_login,
      };
  
      console.log(data);
  
      //format phone number to kenyan code
      var str = "+254";
      var p = values.phone_number;
      p = p.substr(1, 9);
      values.phone_number = str + p;
  
      try {
        const userDetails = await register(values).unwrap();
        console.log(userDetails);
        noficationMsg = "You can now enjoy your coke data";
        openNotificationSuccess();
        form.resetFields();
        redirect_url = `https://customer.hotspotsystem.com/customer/hotspotlogin.php?res=${data.res}&mac=${data.mac}&user=${data.user}&uamport=${data.uamport}&userurl=${data.userurl}&nasid=${data.nasid}&uamip=${data.uamip}&error=${data.error}&chap-id=${data.chap_id}&chap-challenge=${data.chap_challenge}&ssl-login=${data.ssl_login}`;
        window.location.replace(redirect_url);
      } catch (error: any) {
        console.log(error);
        if (error?.data?.message) {
          noficationMsg = `${error?.data?.message}`;
          openNotification();
        }
        if (error?.data?.code) {
          if (error?.data?.code[0]) {
            noficationMsg = `The promotion code has already been used`;
            openNotification();
          }
        }
      }
    };
    return (
      <Layout style={{ minHeight: "100dvh" }}>
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
            <Col xs={24} sm={24} md={24} lg={24}>
              <Title style={{ margin: 0, paddingTop: "5px", color: "white" }}>
                KOOKOO
              </Title>
            </Col>
          </Row>
        </Header>
        <Content className="inherit-height registration-bg">
          <Row className="inherit-height" justify="center">
            <Col className="inherit-height" xs={20} sm={20} md={12} lg={12}>
              <Row justify="center" className="center-div">
                <Col
                  className="bg-white box-shadow"
                  xs={24}
                  sm={24}
                  md={18}
                  lg={18}
                >
                  <Title
                    level={4}
                    type="secondary"
                    style={{ color: "#e61e2b", textAlign: "center" }}
                  >
                    &nbsp; Enjoy Free Data With Kookoo!
                  </Title>
                  <Alert
                    style={{ marginBottom: "10px" }}
                    message="Dear Customer,"
                    description={`Enter your one time promo code and enjoy unlimited data until ${updatedTime}`}
                    type="info"
                  />
                  <Form
                    form={form}
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                  >
                    <Form.Item
                      name="first_name"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input style={{ width: "100%" }} placeholder="First Name" />
                    </Form.Item>
                    <Form.Item
                      name="last_name"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input style={{ width: "100%" }} placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: "The input is not valid email!",
                        },
                      ]}
                    >
                      <Input
                        style={{ width: "100%" }}
                        placeholder="Email eg. johndoe@example.com"
                      />
                    </Form.Item>
                    <Form.Item
                      name="phone_number"
                      rules={[
                        {
                          required: true,
                          message: "Your 10 digit phone number is required",
                        },
                      ]}
                    >
                      <Input
                        style={{ width: "100%" }}
                        maxLength={10}
                        placeholder="Phone Number eg. 0700444777"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Age Category"
                      name="age"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                          <Radio value={"13-18"}>13-18</Radio>
                          <Radio value={"19-24"}>19-24</Radio>
                          <Radio value={"25-30"}>25-30</Radio>
                          <Radio value={">30"}>above 30</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      label="Gender"
                      name="gender"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Radio.Group onChange={onChangeGender} value={gender}>
                        <Space direction="vertical">
                          <Radio value={"male"}>Male</Radio>
                          <Radio value={"female"}>Female</Radio>
                          <Radio value={"other"}>Other</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      name="code"
                      rules={[
                        {
                          required: true,
                          message: "Your 10 digit promo code is required",
                        },
                      ]}
                    >
                      <Input
                        style={{ width: "100%" }}
                        maxLength={10}
                        placeholder="Promo Code"
                      />
                    </Form.Item>
                    <Form.Item
                      name="Terms&Conditions"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      valuePropName="checked"
                    >
                      <Checkbox>
                        I agree to the{" "}
                        <a
                          href="/terms"
                          target="_blank"
                          style={{ color: "#fd4901" }}
                        >
                          Terms & Conditions
                        </a>
                      </Checkbox>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        style={{ backgroundColor: "#e61e2b" }}
                        loading={isLoading}
                      >
                        Continue
                      </Button>
                    </Form.Item>
                    <hr />
                    <Form.Item style={{ textAlign: "center", color: "black" }}>
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
  
  UserInfo.propTypes = {};
  
  export default UserInfo;
  