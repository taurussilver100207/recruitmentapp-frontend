import { Formik } from "formik"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import { setLogin } from "../../state/auth.js"
import { useNavigate } from "react-router-dom"
import "yup-phone"
import { useState } from "react"

const registerSchema = yup.object().shape({
    firstName: yup.string().required("This field is required"),
    lastName: yup.string().required("This field is required"),
    email: yup.string().email("Invalid email").required("This field is required"),
    phoneNumber: yup.string().phone("VN", true).required("This field is required"),
    password: yup.string().required("This field is required"),
    role: yup.string().required("This field is required")
})

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("This field is required"),
    password: yup.string().required("This field is required"),
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: ""
}

const initialValuesLogin = {
    email: "",
    password: ""
}

const Form = () => {
    const [pageType, setPageType] = useState("register")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLogin = pageType === "login"
    const isRegister = pageType === "register"
    const [role, setRole] = useState("candidate")

    const handleFormSubmit = async (values, onSubmitProps) => {
        const authAPI = isLogin ? "http://localhost:9000/auth/login" : "http://localhost:9000/auth/register"
        const formData = FormData()
        for (let value in values) {
            formData.append(value, values[value])
        }

        if (isRegister) {
            formData.append("role", role)
        }

        const authRes = await axios.post(authAPI, formData)
        const loggedInUser = authRes.data
        onSubmitProps.resetForm()

        if (loggedInUser) {
            dispatch(
                setLogin({
                    user: loggedInUser.user,
                    token: loggedInUser.token
                })
            )
        }
    }


    return (
        <>
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center font-medium bg-[url('./assets/register-side-image.jpg')]"></div>
            <div className="w-full lg:w-1/2 py-16 px-12">
              <h2 className="text-3xl mb-4 font-medium">Register</h2>
              <p className="mb-4 font-medium">
                Create your account. It’s free and only take a minute
              </p>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
                validationSchema={isLogin ? loginSchema : registerSchema}
              >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm
                }) => (
                    <form action="#"> 
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <div className="relative z-0">
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    id="firstName" 
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${(touched.firstName && errors.firstName) ? "border-red-600 appearance-none dark:text-white dark:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600" : "border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"} peer`}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    placeholder=" " 
                                    required 
                                />
                                <label htmlFor="firstName" className={`${(touched.firstName && errors.firstName) ? "text-red-600" : "text-gray-500 peer-focus:text-blue-600"} peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>First name</label>
                                <span className={`${(touched.firstName && errors.firstName) ? "" : "invisible"} mt-2 text-[12px] text-red-600 dark:text-red-400`}>
                                    {(touched.firstName && errors.firstName) ? (
                                        errors.firstName
                                    ) : "a"}
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="relative z-0">
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    id="lastName" 
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${(touched.lastName && errors.lastName) ? "border-red-600 appearance-none dark:text-white dark:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600" : "border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"} peer`}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    placeholder=" " 
                                    required 
                                />
                                <label htmlFor="lastName" className={`${(touched.lastName && errors.lastName) ? "text-red-600" : "text-gray-500 peer-focus:text-blue-600"} peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Last name</label>
                            </div>
                            <span className={`${(touched.lastName && errors.lastName) ? "" : "invisible"} mt-2 text-[12px] text-red-600 dark:text-red-400`}>
                                    {(touched.lastName && errors.lastName) ? (
                                        errors.lastName
                                    ) : "a"}
                            </span>
                        </div>
                    </div>
                    <div className="mt-[-10px]">
                            <div className="relative z-0 mt-5">
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${(touched.email && errors.email) ? "border-red-600 appearance-none dark:text-white dark:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600" : "border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"} peer`}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    placeholder=" " 
                                    required 
                                />
                                <label htmlFor="email" className={`${(touched.email && errors.email) ? "text-red-600" : "text-gray-500 peer-focus:text-blue-600"} peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Email address</label>
                            </div>
                            <span className={`${(touched.email && errors.email) ? "" : "invisible"} mt-2 text-[12px] text-red-600 dark:text-red-400`}>
                                    {(touched.email && errors.email) ? (
                                        errors.email
                                    ) : "a"}
                            </span>
                    </div>
                    <div className="mt-[-10px]">
                            <div className="relative z-0 mt-5">
                                <input 
                                    type="tel" 
                                    name="phoneNumber" 
                                    id="phoneNumber" 
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${(touched.phoneNumber && errors.phoneNumber) ? "border-red-600 appearance-none dark:text-white dark:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600" : "border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"} peer`}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.phoneNumber}
                                    placeholder=" " 
                                    required 
                                />
                                <label htmlFor="phoneNumber" className={`${(touched.phoneNumber && errors.phoneNumber) ? "text-red-600" : "text-gray-500 peer-focus:text-blue-600"} peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Phone number</label>
                            </div>
                            <span className={`${(touched.phoneNumber && errors.phoneNumber) ? "" : "invisible"} mt-2 text-[12px] text-red-600 dark:text-red-400`}>
                                    {(touched.phoneNumber && errors.phoneNumber) ? (
                                        errors.phoneNumber
                                    ) : "a"}
                            </span>
                    </div>
                    <div className="mt-[-10px]">
                            <div className="relative z-0 mt-5">
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${(touched.password && errors.password) ? "border-red-600 appearance-none dark:text-white dark:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600" : "border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"} peer`}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    placeholder=" " 
                                    required 
                                />
                                <label htmlFor="password" className={`${(touched.password && errors.password) ? "text-red-600" : "text-gray-500 peer-focus:text-blue-600"} peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Password</label>
                            </div>
                            <span className={`${(touched.password && errors.password) ? "" : "invisible"} mt-2 text-[12px] text-red-600 dark:text-red-400`}>
                                    {(touched.password && errors.password) ? (
                                        errors.password
                                    ) : "a"}
                            </span>
                    </div>
                    <div className="mt-5">
                      <span className="font-normal">
                        Already have account? <a href="#" className="text-purple-500 font-semibold">Login</a> 
                      </span>
                    </div>
                    <div className="mt-5">
                        <button className="w-full inline-flex items-center justify-center p-[0.1rem] mb-2 me-2 text-sm font-medium text-gray-900 rounded-lg group bg-purple-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200">
                            <span className="w-full font-semibold px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                Register Now
                            </span>
                        </button>
                    </div>
                  </form>
                )}
              </Formik>
          </div>
        </>
    )
}

export default Form