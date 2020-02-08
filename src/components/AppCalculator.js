import React, { Component } from "react";
import { Card, Form, Input, Select, Button, Icon } from "antd";

import {
  convertDecimalToBinary,
  convertDecimalToOctal,
  convertDecimalToHex,
  convertBinaryToDecimal,
  convertOctalToDecimal,
  convertHexToDecimal
} from "../functions/conversion";

const hasErrors = fieldsError => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

class FormCalculator extends Component {
  state = {
    result: null
  };

  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { calculationBase, firstNumber, secondNumber, operator } = values;
        let result = null;

        switch (calculationBase) {
          case "decimal":
            switch (operator) {
              case "addition":
                result = Number(firstNumber) + Number(secondNumber);
                break;
              case "subtraction":
                result = Number(firstNumber) - Number(secondNumber);
                break;
              case "multiplication":
                result = Number(firstNumber) * Number(secondNumber);
                break;
              case "division":
                result = Number(firstNumber) / Number(secondNumber);
                break;
            }
            break;
          case "binary":
            switch (operator) {
              case "addition":
                result = convertDecimalToBinary(
                  convertBinaryToDecimal(firstNumber) +
                    convertBinaryToDecimal(secondNumber)
                );
                break;
              case "subtraction":
                result = convertDecimalToBinary(
                  convertBinaryToDecimal(firstNumber) -
                    convertBinaryToDecimal(secondNumber)
                );
                break;
              case "multiplication":
                result = convertDecimalToBinary(
                  convertBinaryToDecimal(firstNumber) *
                    convertBinaryToDecimal(secondNumber)
                );
                break;
              case "division":
                result = convertDecimalToBinary(
                  convertBinaryToDecimal(firstNumber) /
                    convertBinaryToDecimal(secondNumber)
                );
                break;
            }
            break;
          case "octal":
            switch (operator) {
              case "addition":
                result = convertDecimalToOctal(
                  convertOctalToDecimal(firstNumber) +
                    convertOctalToDecimal(secondNumber)
                );
                break;
              case "subtraction":
                result = convertDecimalToOctal(
                  convertOctalToDecimal(firstNumber) -
                    convertOctalToDecimal(secondNumber)
                );
                break;
              case "multiplication":
                result = convertDecimalToOctal(
                  convertOctalToDecimal(firstNumber) *
                    convertOctalToDecimal(secondNumber)
                );
                break;
              case "division":
                result = convertDecimalToOctal(
                  convertOctalToDecimal(firstNumber) /
                    convertOctalToDecimal(secondNumber)
                );
                break;
            }
            break;
          case "hex":
            switch (operator) {
              case "addition":
                result = convertDecimalToHex(
                  convertHexToDecimal(firstNumber) +
                    convertHexToDecimal(secondNumber)
                );
                break;
              case "subtraction":
                result = convertDecimalToHex(
                  convertHexToDecimal(firstNumber) -
                    convertHexToDecimal(secondNumber)
                );
                break;
              case "multiplication":
                result = convertDecimalToHex(
                  convertHexToDecimal(firstNumber) *
                    convertHexToDecimal(secondNumber)
                );
                break;
              case "division":
                result = convertDecimalToHex(
                  convertHexToDecimal(firstNumber) /
                    convertHexToDecimal(secondNumber)
                );
                break;
            }
            break;
        }

        this.setState({ result });
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
    this.props.form.validateFields();

    this.setState({ result: null });
  };

  render() {
    const { Option } = Select;
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const calculationBaseError =
      isFieldTouched("calculationBase") && getFieldError("calculationBase");
    const firstNumberError =
      isFieldTouched("firstNumber") && getFieldError("firstNumber");
    const secondNumberError =
      isFieldTouched("secondNumber") && getFieldError("secondNumber");
    const operatorError =
      isFieldTouched("operator") && getFieldError("operator");

    return (
      <Card title="Calculator">
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            label="Base"
            validateStatus={calculationBaseError ? "error" : ""}
            help={calculationBaseError || ""}
          >
            {getFieldDecorator("calculationBase", {
              initialValue: "decimal",
              rules: [
                {
                  required: true,
                  message: "Please input your base!"
                }
              ]
            })(
              <Select>
                <Option value="decimal">Decimal (10)</Option>
                <Option value="binary">Binary (2)</Option>
                <Option value="octal">Octal (8)</Option>
                <Option value="hex">Hexadecimal (16)</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="Calculation"
            validateStatus={
              firstNumberError || secondNumberError || operatorError
                ? "error"
                : ""
            }
            help={firstNumberError || secondNumberError || operatorError || ""}
          >
            {getFieldDecorator("firstNumber", {
              rules: [
                {
                  required: true,
                  message: "Please input your first number!"
                }
              ]
            })(<Input type="text" placeholder="Number" />)}
            {getFieldDecorator("operator", {
              initialValue: "addition",
              rules: [
                {
                  required: true,
                  message: "Please input your operator!"
                }
              ]
            })(
              <Select>
                <Option value="addition">+ (Addition)</Option>
                <Option value="subtraction">- (Subtraction)</Option>
                <Option value="multiplication">* (Multiplication)</Option>
                <Option value="division">/ (Division)</Option>
              </Select>
            )}
            {getFieldDecorator("secondNumber", {
              rules: [
                {
                  required: true,
                  message: "Please input your second number!"
                }
              ]
            })(<Input type="text" placeholder="Number" />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              <Icon type="calculator" /> Calculate
            </Button>
            <Button
              type="danger"
              htmlType="reset"
              onClick={this.handleReset}
              style={{ marginLeft: "5px" }}
            >
              <Icon type="undo" /> Reset
            </Button>
          </Form.Item>
        </Form>
        <Card title="Result" size="small">
          {this.state.result}
        </Card>
      </Card>
    );
  }
}

const AppCalculator = Form.create({ name: "app_calculator" })(FormCalculator);

export default AppCalculator;
