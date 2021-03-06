import { React, useState } from "react";
import { Button, Form, Input, Card } from "antd";
import axios from "axios";
import calculategcd from "../algorithms/gcdCalculation";
import Historybar from "../components/history";

export default function Calcgcd() {
  const [gcd, setGcd] = useState(null);
  const onFinish = (values) => {
    setGcd(calculategcd(values.firstvalue, values.secondvalue));
    values.operation = "GCD";
    values.result = calculategcd(values.firstvalue, values.secondvalue);
    axios.post("https://ntheorylab-backend.herokuapp.com/doubleop", values);
  };

  return (
    <div
      style={{
        paddingLeft: "5%",
        paddingTop: "5%",
        display: "grid",
        gridTemplateColumns: " 1fr 1fr",
      }}
    >
      <div>
        <Card style={{ width: "90%" }}>
          <div style={{ paddingBottom: "2%" }}>
            <b> Calculates GCD: </b>
            <h3>Input two positive integers</h3>
          </div>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Number 1"
              name="firstvalue"
              rules={[
                {
                  required: true,
                  message: "Please input an integer!",
                },
              ]}
            >
              <Input type="number" autoComplete="off" min="0" />
            </Form.Item>

            <Form.Item
              label="Number 2"
              name="secondvalue"
              rules={[
                {
                  required: true,
                  message: "Please input an integer!",
                },
              ]}
            >
              <Input type="number" autoComplete="off" min="0" />
            </Form.Item>
            <Button style={{ paddingLeft: "0%" }} htmlType="submit">
              Calculate!
            </Button>
          </Form>
          <div
            style={{
              width: "50%",
              display: "block",
              paddingTop: "5%",
            }}
          >
            <Card>
              <b>GCD: </b> <b>{gcd} </b>
            </Card>
          </div>
        </Card>
      </div>
      <div>
        <Historybar name="GCD" />
      </div>
    </div>
  );
}
