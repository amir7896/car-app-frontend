import React, { useState } from "react";
import { Formik, Field } from "formik";
import {
  Button,
  Input,
  Select,
  Upload,
  message,
  Form as AntForm,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import CarApi from "../../services/apis/Car.Api";
import { carValidationSchema } from "../../utils/validations";

const { Option } = Select;

const CreateCar = () => {
  const [fileList, setFileList] = useState([]);
  const [maxPictures, setMaxPictures] = useState(1);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(0, maxPictures));
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("carModel", values.carModel);
      formData.append("price", values.price);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("city", values.city);
      formData.append("maxPictures", values.maxPictures);
      fileList.forEach((file) => {
        formData.append("pictures", file.originFileObj);
      });

      const response = await CarApi.createCar(formData);
      if (response?.success) {
        message.success(response?.message);
        navigate("/");
      }
      resetForm();
      setFileList([]);
    } catch (error) {
      message.error("Failed to create car");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        carModel: "",
        price: "",
        phoneNumber: "",
        city: "",
        maxPictures: 1,
      }}
      validationSchema={carValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, isSubmitting, handleSubmit }) => (
        <AntForm
          layout="vertical"
          className="create-car-form"
          onFinish={handleSubmit}
        >
          {/* Car model input */}
          <AntForm.Item
            label="Car Model"
            validateStatus={errors.carModel && touched.carModel ? "error" : ""}
            help={errors.carModel && touched.carModel ? errors.carModel : null}
          >
            <Field name="carModel" as={Input} />
          </AntForm.Item>
          {/* Car price input */}
          <AntForm.Item
            label="Price"
            validateStatus={errors.price && touched.price ? "error" : ""}
            help={errors.price && touched.price ? errors.price : null}
          >
            <Field name="price" as={Input} type="number" />
          </AntForm.Item>
          {/* Phone no input */}
          <AntForm.Item
            label="Phone Number"
            validateStatus={
              errors.phoneNumber && touched.phoneNumber ? "error" : ""
            }
            help={
              errors.phoneNumber && touched.phoneNumber
                ? errors.phoneNumber
                : null
            }
          >
            <Field name="phoneNumber" as={Input} />
          </AntForm.Item>
          {/* City input  */}
          <AntForm.Item
            label="City"
            validateStatus={errors.city && touched.city ? "error" : ""}
            help={errors.city && touched.city ? errors.city : null}
          >
            <Field name="city" as={Input} />
          </AntForm.Item>
          {/* Max picture input */}
          <AntForm.Item
            label="Max Pictures"
            validateStatus={
              errors.maxPictures && touched.maxPictures ? "error" : ""
            }
            help={
              errors.maxPictures && touched.maxPictures
                ? errors.maxPictures
                : null
            }
          >
            <Field
              name="maxPictures"
              as={Select}
              onChange={(value) => {
                setFieldValue("maxPictures", value);
                setMaxPictures(value);
                setFileList([]);
              }}
            >
              {[...Array(10)].map((_, i) => (
                <Option key={i + 1} value={i + 1}>
                  {i + 1}
                </Option>
              ))}
            </Field>
          </AntForm.Item>
          {/* Upload pictures input  */}
          <AntForm.Item label="Pictures">
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleUploadChange}
              onPreview={handlePreview}
              multiple
            >
              {fileList.length < maxPictures && (
                <Button icon={<UploadOutlined />}>Upload</Button>
              )}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: "none",
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </AntForm.Item>
          <AntForm.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              style={{ marginBottom: "20px" }}
            >
              Submit
            </Button>
          </AntForm.Item>
        </AntForm>
      )}
    </Formik>
  );
};

export default CreateCar;
