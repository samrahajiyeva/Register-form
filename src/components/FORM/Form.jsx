import React from "react";
import "./Form.scss";
import * as Yup from "yup";
import { Formik } from "formik";
import { Helmet } from "react-helmet";
import toast, { Toaster } from "react-hot-toast";

const Form = () => {
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="container nerko-one-regular">
        <div className="form">
          <div className="user__img">
            <img
              src="https://p7.hiclipart.com/preview/481/915/760/computer-icons-user-avatar-woman-avatar.jpg"
              alt=""
            />
          </div>
          <Formik
            initialValues={{
              name: "",
              surname: "",
              email: "",
              password: "",
              age: "",
              isMarried: "",
              agree: false,
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("Name required!"),
              surname: Yup.string().required("Surname required!"),
              email: Yup.string()
                .email("Invalid email format")
                .required("Email required!"),
              password: Yup.string()
                .required("No password provided.")
                .min(8, "Password is too short - should be 8 chars minimum.")
                .matches(/[a-zA-Z]/, "Password has to contain Latin letters."),
              age: Yup.number()
                .required("Age required!")
                .min(0, "Age must be 0 or greater"),
              isMarried: Yup.string(),
              agree: Yup.boolean()
                .oneOf([true], "You must agree with the terms of use")
                .required("You must agree with the terms of use"),
            })}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              toast.success("user created");
              resetForm();
            }}c
          >
            {({
              values,
              handleChange,
              errors,
              handleSubmit,
              isSubmitting,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="name"
                  value={values.name}
                  onChange={handleChange}
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}

                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  id="surname"
                  placeholder="surname"
                  value={values.surname}
                  onChange={handleChange}
                />
                {errors.surname && touched.surname && (
                  <div className="input-feedback">{errors.surname}</div>
                )}

                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}

                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  placeholder="age"
                  id="age"
                  min={0}
                  value={values.age}
                  onChange={handleChange}
                />
                {errors.age && touched.age && (
                  <div className="input-feedback">{errors.age}</div>
                )}

                <div className="married">
                  <label>Is Married?</label>
                  <label>
                    <input
                      type="radio"
                      name="isMarried"
                      value="true"
                      checked={values.isMarried === "true"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="isMarried"
                      value="false"
                      checked={values.isMarried === "false"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                  {errors.isMarried && touched.isMarried && (
                    <div className="input-feedback">{errors.isMarried}</div>
                  )}
                </div>

                <div className="checkbox">
                  <div>
                    <input
                      type="checkbox"
                      checked={values.agree}
                      onChange={handleChange}
                      id="agree"
                    />
                    <label htmlFor="agree">Term of Use</label>
                  </div>
                  {errors.agree && touched.agree && (
                    <div className="input-feedback">{errors.agree}</div>
                  )}
                </div>

                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Form;
