import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
// import { useDispatch } from "react-redux";
// import { setFetchingStage } from "../../actions/fetching.actions";
// import { getUserBricks } from "../../Services/bricksService";
import Cards from "react-credit-cards";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { FcApproval } from "react-icons/fc";
import { FaUserAlt } from "react-icons/fa";
import { GiHeartBottle, GiHeartBattery } from "react-icons/gi";
import { FaReceipt } from "react-icons/fa";
import { Input, Card } from "antd";

const Upgrade = ({ user }) => {
  //   const cardNumberValidator = ({ cardNumber, cardType, errorMessages }) => {
  //     if (
  //       cardType.displayName === "Visa" ||
  //       cardType.displayName === "Mastercard"
  //     ) {
  //       console.log("cardType.displayName", cardType.displayName);
  //       return;
  //     }
  //     return "Card must be Visa or Mastercard";
  //   };

  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();

  //   const dispatch = useDispatch();
  //   const [userBricks, setUserBricks] = useState([]);
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [cardIsValid, setCardIsValid] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("influencer");

  //   useEffect(() => {
  //     const fetchUserBricks = async () => {
  //       dispatch(setFetchingStage(true));
  //       const userEmail = { email: user.email };
  //       const response = await getUserBricks(userEmail);
  //       console.log("user bricks: ", response);
  //       setUserBricks(response.data.Bricks);
  //       dispatch(setFetchingStage(false));
  //     };

  //     fetchUserBricks();
  //   }, [dispatch, user]);

  const handleChangeCardNumber = () => {
    handleInputFocus("number");
    const number = getCardNumberProps().ref.current.value;
    setNumber(number);
  };
  const handleChangeExpiry = () => {
    handleInputFocus("expiry");
    const date = getExpiryDateProps().ref.current.value;
    setExpiry(date);
  };
  const handleChangeCvc = () => {
    handleInputFocus("cvc");
    const number = getCVCProps().ref.current.value;
    setCvc(number);
  };
  const handleChangeName = (e) => {
    handleInputFocus("name");
    const name = e.target.value;
    setName(name);
  };
  const handleInputFocus = (name) => {
    setFocus(name);
  };
  const handleSelectPlan = (plan) => {
    console.log("selected plan", plan);
    setSelectedPlan(plan);
  };

  useEffect(() => {
    if (wrapperProps.error === undefined) {
      setCardIsValid(true);
    } else {
      setCardIsValid(false);
    }
  }, [cvc, expiry, focus, number, wrapperProps]);

  return (
    <Row className="margin-top-2 upgrade-body">
      <Col className="" span={17}>
        <Row className="header-1">Select Plan</Row>
        <Row className="plans">
          <Col className="plan-1" span={12}>
            <Card
              onClick={() => handleSelectPlan("influencer")}
              //   hoverable
              style={{ width: "90%" }}
              className={selectedPlan === "influencer" ? "selectedPlan" : ""}
            >
              <Row span={24} className="header-2">
                <Col span={24}>
                  <Col className="icon-wrapper-box" span={2}>
                    <GiHeartBottle className="icon-wrapper" />
                  </Col>
                </Col>
                <Col span={20}>
                  Influencer
                  <div className="secondary-title-small">Monthly</div>
                </Col>
                <Col span={4}> $14.99</Col>
              </Row>
            </Card>
          </Col>
          <Col className="plan-2" span={12}>
            <Card
              onClick={() => handleSelectPlan("business")}
              //   hoverable
              style={{ width: "90%" }}
              className={selectedPlan === "business" ? "selectedPlan" : ""}
            >
              <Row span={24} className="header-2">
                <Col span={24}>
                  <Col className="icon-wrapper-box" span={2}>
                    <GiHeartBattery className="icon-wrapper" />
                  </Col>
                </Col>

                <Col span={20}>
                  Business
                  <div className="secondary-title-small">Monthly</div>
                </Col>
                <Col span={4}> $34.99</Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row className="nameOnCard">
          <Col span={24} className="header-2">
            Name on card
          </Col>
          <Col span={12}>
            <Input
              onChange={(e) => handleChangeName(e)}
              size="large"
              prefix={<FaUserAlt />}
            />
          </Col>
        </Row>
        <Row className="creditCardInfo">
          <Col span={24} className="header-2">
            Credit Card
          </Col>
          <Col span={12}>
            <PaymentInputsWrapper
              className="creditCardWrapper"
              {...wrapperProps}
            >
              <svg {...getCardImageProps({ images })} />
              <input
                className="cardNumber"
                {...getCardNumberProps({
                  onChange: handleChangeCardNumber,
                })}
              />
              <input
                className="cardExperation"
                {...getExpiryDateProps({ onChange: handleChangeExpiry })}
              />
              <input
                className="cardCvc"
                {...getCVCProps({ onChange: handleChangeCvc })}
              />
            </PaymentInputsWrapper>
          </Col>
          <Col className="cardIsValidBox" span={2}>
            {cardIsValid && (
              <span className="cardIsValid">
                <FcApproval />
              </span>
            )}
          </Col>
        </Row>
        <Row className="presToPay">
          <Col span={22}>
            <Button disabled={!cardIsValid || !name} type="primary" block>
              Upgrade Plan
            </Button>
          </Col>
        </Row>
      </Col>
      <Col className="creditCardSection" span={7}>
        <div className="theCard">
          <Cards
            cvc={cvc}
            expiry={expiry}
            focused={focus}
            name={name}
            number={number}
          />
        </div>
        <div className="padding-3">
          <Row>
            <Col className="sm-title-grey" span={12}>
              Plan:
            </Col>
            <Col className="md-title" span={12}>
              {selectedPlan.toLocaleUpperCase()}
            </Col>
          </Row>
          {/* <Row className="margin-top-2">
            <Col className="sm-title-grey" span={12}>
              Amount:
            </Col>
            <Col className="md-title" span={12}>
              $ {selectedPlan === "influencer" ? "14.99" : "34.99"} / Month
            </Col>
          </Row> */}
          <Row className="margin-top-2">
            <Col className="sm-title-grey" span={12}>
              Seats:
            </Col>
            <Col className="md-title" span={12}>
              {selectedPlan === "influencer" ? "1 User" : "3 Users"}
            </Col>
          </Row>
          <Row className="margin-top-2">
            <Col className="sm-title-grey" span={12}>
              Social Acounts:
            </Col>
            <Col className="md-title" span={12}>
              {selectedPlan === "influencer" ? "3" : "9"}
            </Col>
          </Row>
        </div>
        <div className="pl-3 stick-to-bottom">
          <Row span={24}>
            <Col className="sm-title-grey" span={18}>
              You will be charged
            </Col>
            <Col className="lg-title" span={6}>
              <FaReceipt />
            </Col>
          </Row>
          <Col className="lg-title" span={24}>
            {selectedPlan === "influencer" ? "14.99" : "34.99"} USD
          </Col>
        </div>
      </Col>
    </Row>
  );
};

export default Upgrade;
