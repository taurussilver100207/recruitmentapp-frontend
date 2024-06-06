import { Formik } from "formik"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import { setLogin } from "../../state/auth.js"
import { useNavigate } from "react-router-dom"
import "yup-phone"
import { useState } from "react"
import axios from "axios"

const registerSchema = yup.object().shape({
    firstName: yup.string().required("This field is required"),
    lastName: yup.string().required("This field is required"),
    phoneNumber: yup.string().phone("VN", true).required("This field is required"),
    role: yup.string().required("This field is required"),
    email: yup.string().email("Invalid email").required("This field is required"),
    password: yup.string().required("This field is required"),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("This field is required"),
    password: yup.string().required("This field is required"),
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    role: "",
    email: "",
    password: "",
}

const initialValuesLogin = {
    email: "",
    password: ""
}

const Form = () => {
    const [pageType, setPageType] = useState("login")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLogin = pageType === "login"
    const isRegister = pageType === "register"
    const [role, setRole] = useState("")
    const isRollNotFilled = role === ""
    const isCandidate = role === "candidate"
    const isOfficer = role === "officer"

    const handleFormSubmit = async (values, onSubmitProps) => {
        const authAPI = isLogin ? "http://localhost:9000/auth/login" : "http://localhost:9000/auth/register"
        const formData = new FormData()

        const authRes = await axios.post(authAPI, values)
        const loggedInUser = authRes.data
        onSubmitProps.resetForm()

        if (loggedInUser) {
            dispatch(
                setLogin({
                    user: loggedInUser.user,
                    token: loggedInUser.token
                })
            )
            navigate("/")
        }
    }
    console.log("Login: ", isLogin);
    return (
        <>
            {isRollNotFilled && isRegister ? (
                <div className="w-[75%] mx-auto mt-10">
                    <h2 className="text-3xl mb-4 font-medium flex justify-center">
                        What do you use Recr for?
                    </h2>
                    <div className="flex justify-center gap-20 mt-[3.5rem]">
                        <div>
                            <h3 className="drop-shadow-md [text-shadow:_0_1.75px_0_rgb(0_0_0_/_40%)] text-3xl mb-4 font-light flex justify-center">
                                Candidate
                            </h3>
                            <img
                                data-tooltip-target="tooltip-default"
                                className="rounded-full w-[12rem] h-[12rem] border-black ring-4 ring-gray-300 p-5 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:ring-purple-500 duration-300 mt-[2rem]"
                                src="https://cdn-icons-png.freepik.com/512/6623/6623486.png"
                                alt="image description"
                                onClick={() => {
                                    setRole("candidate")
                                }}
                            />
                        </div>

                        <div>
                            <h3 className="drop-shadow-md [text-shadow:_0_1.75px_0_rgb(0_0_0_/_40%)] text-3xl mb-4 font-light flex justify-center">
                                Officer
                            </h3>
                            <img
                                className="rounded-full w-[12rem] h-[12rem] border-black ring-4 ring-gray-300 p-5 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:ring-purple-500 duration-300 mt-[2rem]"
                                src="https://cdn-icons-png.flaticon.com/512/6156/6156921.png"
                                alt="image description"
                                onClick={() => {
                                    setRole("officer")
                                }}
                            />
                        </div>

                    </div>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row w-[75%] bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    {isRegister && (
                        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center font-medium bg-[url('./assets/register-side-image.jpg')]"></div>
                    )}
                    <div className="w-full lg:w-1/2 py-16 px-12">
                        <h2 className="text-3xl mb-4 font-normal text-purple-500">
                            Rerc
                        </h2>
                        <p className="mb-4 font-medium">
                            {isLogin ? "Welcome back!" :
                                (isCandidate ? "Rerc assists you in your quest for the perfect job!" : "Rerc facilitates your pursuit of exceptional employees!")
                            }
                        </p>
                        <Formik
                            onSubmit={handleFormSubmit}
                            initialValues={isRegister ? initialValuesRegister : initialValuesLogin}
                            validationSchema={isRegister ? registerSchema : loginSchema}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                resetForm,
                                setFieldValue
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    {isRegister && (
                                        <>
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
                                            <input
                                                type="hidden"
                                                id="role"
                                                name="role"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.role}
                                                required
                                            />
                                        </>
                                    )}

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
                                        {isLogin ? (
                                            <button
                                                type="submit"
                                                className="w-full inline-flex items-center justify-center p-[0.1rem] mb-2 me-2 text-sm font-medium text-gray-900 rounded-lg group bg-purple-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200"
                                            >
                                                <span className="w-full font-semibold px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                                    Login
                                                </span>
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                className="w-full inline-flex items-center justify-center p-[0.1rem] mb-2 me-2 text-sm font-medium text-gray-900 rounded-lg group bg-purple-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200"
                                                onClick={() => {
                                                    setFieldValue("role", role)
                                                }}
                                            >
                                                <span className="w-full font-semibold px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                                    Register Now
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                    <div className="mt-5">
                                        <span className="font-normal">
                                            {isLogin ? "Don't have account? " : "Already have account? "}
                                            <a onClick={() => { setPageType(isLogin ? "register" : "login"); resetForm(); setRole("") }} className="cursor-pointer text-purple-500 font-semibold">
                                                {isLogin ? "Create new account" : "Login"}
                                            </a>
                                        </span>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                    {isLogin && (
                        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center font-medium bg-[url('./assets/login-side-image.jpg')]"></div>
                    )}
                </div>
            )}
        </>
    )
}

export default Form