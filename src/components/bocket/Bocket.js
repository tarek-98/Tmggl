import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./bocket.css";

function Bocket() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="gift-page">
      <div className="container">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Form.Group
              as={Col}
              md="6"
              controlId="validationCustom01"
              className="mb-4"
            >
              <Form.Label className="form-label mb-2">اسم المرسل</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="اسم المرسل"
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">
                مطلوب
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              controlId="validationCustom02"
              className="mb-4"
            >
              <Form.Label className="form-label mb-2">
                اسم المرسل اليه
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="اسم المرسل اليه"
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">
                مطلوب
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              controlId="validationCustom03"
              className="mb-4"
            >
              <Form.Label className="form-label mb-2">
                رقم جوال المرسل اليه
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="رقم جوال المرسل اليه"
                maxLength="10"
                minLength="10"
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">
                مطلوب
              </Form.Control.Feedback>
            </Form.Group>
            <Col xl="6" className="mb-3">
              <Form.Label className="form-label mb-2">الرسالة</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="اكتب رسالتك"
                style={{ height: "100px" }}
                className="form-control"
              />
            </Col>
            <Form.Group
              as={Col}
              md="6"
              controlId="validationCustom04"
              className="mb-4"
            >
              <Form.Label className="form-label mb-2">مبلغ القسيمة</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  required
                  type="number"
                  placeholder="اكتب المبلغ"
                  className="form-control"
                />
                <span className="me-1">ر.س</span>
              </div>
            </Form.Group>
            <Col xl="12" className="mb-3 d-flex justify-content-center">
              <Button type="submit" className="button-submit">
                ارسال هدية
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default Bocket;
