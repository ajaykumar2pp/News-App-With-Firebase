import React from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase';
import { useFormik } from 'formik';
import { validationSchema } from '../components/UserSchema'
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const auth = getAuth(app);

const Login = () => {

    const navigate= useNavigate();
    const { handleChange, handleSubmit, handleBlur, touched, values, errors } = useFormik({
        initialValues: {

            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, action) => {
            console.log(values);
            
            try {
                const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
               
                localStorage.setItem("userEmail",values.email)
                navigate('/news')
                toast.success('User Login Successfully!');
               
                console.log('User logged in successfully:', userCredential.user);

            } catch (error) {
                toast.error(`Error registering user: ${error.message}`);
                console.error('Error logging in:', error.message);
            }finally {
                action.resetForm();
              }
        },
    });

    return (
        <div>
            <h2 className="text-center App">Login User</h2>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8 ">
                        {/* form   */}
                        <Form className="mb-5 border border-primary p-4 m-3 rounded" onSubmit={handleSubmit}>
                            {/* email */}
                            <div className="mb-3">
                                <Form.Label> Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.email && errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </div>

                            {/* password */}
                            <div className="mb-3">
                            <Form.Label>  Password</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Enter Your Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.password && errors.password}
                                />
                                 <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary mb-5">
                                Login
                            </button>
                        </Form>
                        <hr />
                        <Link
                            to="/register"
                            className="py-2 ps-3 pe-4 fw-semibold text-center text-decoration-none"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login