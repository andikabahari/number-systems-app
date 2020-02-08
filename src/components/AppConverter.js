import React, { Component } from "react";
import { Card, Form, Input, Select, Button, Icon } from "antd";

import {
  convertDecimalToBinary,
  convertDecimalToOctal,
  convertDecimalToHex,
  convertBinaryToDecimal,
  convertBinaryToOctal,
  convertBinaryToHex,
  convertOctalToDecimal,
  convertOctalToBinary,
  convertOctalToHex,
  convertHexToDecimal,
  convertHexToBinary,
  convertHexToOctal
} from "../functions/conversion";

const hasErrors = fieldsError => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

class FormConverter extends Component {
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
        const { baseToConvert, numberToConvert, conversionBase } = values;
        let result = null;

        switch (baseToConvert) {
          case "decimal":
            switch (conversionBase) {
              case "binary":
                result = convertDecimalToBinary(Number(numberToConvert));
                break;
              case "octal":
                result = convertDecimalToOctal(Number(numberToConvert));
                break;
              case "hex":
                result = convertDecimalToHex(
                  Number(numberToConvert)
                ).toUpperCase();
                break;
              default:
                result = Number(numberToConvert);
            }
            break;
          case "binary":
            switch (conversionBase) {
              case "decimal":
                result = convertBinaryToDecimal(numberToConvert);
                break;
              case "octal":
                result = convertBinaryToOctal(numberToConvert);
                break;
              case "hex":
                result = convertBinaryToHex(numberToConvert).toUpperCase();
                break;
              default:
                result = convertDecimalToBinary(
                  convertBinaryToDecimal(numberToConvert)
                );
            }
            break;
          case "octal":
            switch (conversionBase) {
              case "decimal":
                result = convertOctalToDecimal(numberToConvert);
                break;
              case "binary":
                result = convertOctalToBinary(numberToConvert);
                break;
              case "hex":
                result = convertOctalToHex(numberToConvert).toUpperCase();
                break;
              default:
                result = convertDecimalToOctal(
                  convertOctalToDecimal(numberToConvert)
                );
            }
            break;
          case "hex":
            switch (conversionBase) {
              case "decimal":
                result = convertHexToDecimal(numberToConvert);
                break;
              case "binary":
                result = convertHexToBinary(numberToConvert);
                break;
              case "octal":
                result = convertHexToOctal(numberToConvert);
                break;
              default:
                result = convertDecimalToHex(
                  convertHexToDecimal(numberToConvert)
                ).toUpperCase();
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
    const baseToConvertError =
      isFieldTouched("baseToConvert") && getFieldError("baseToConvert");
    const numberToConvertError =
      isFieldTouched("numberToConvert") && getFieldError("numberToConvert");
    const conversionBaseError =
      isFieldTouched("conversionBase") && getFieldError("conversionBase");

    return (
      <Card title="Converter">
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            label="From"
            validateStatus={
              baseToConvertError || numberToConvertError ? "error" : ""
            }
            help={baseToConvertError || numberToConvertError || ""}
          >
            {getFieldDecorator("baseToConvert", {
              initialValue: "decimal",
              rules: [
                {
                  required: true,
                  message: "Please input your number base!"
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
            {getFieldDecorator("numberToConvert", {
              rules: [
                {
                  required: true,
                  message: "Please input your number!"
                }
              ]
            })(<Input type="text" placeholder="Number" />)}
          </Form.Item>
          <Form.Item
            label="To"
            validateStatus={conversionBaseError ? "error" : ""}
            help={conversionBaseError || ""}
          >
            {getFieldDecorator("conversionBase", {
              initialValue: "decimal",
              rules: [
                {
                  required: true,
                  message: "Please input your number base!"
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
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              <Icon type="swap" /> Convert
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

const AppConverter = Form.create({ name: "form_converter" })(FormConverter);

export default AppConverter;
