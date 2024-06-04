import Form from "./Form"

const AuthPage = () => {
    return (
        <>
        <div className="min-h-screen pt-[45px] bg-slate-100" >
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row w-[75%] bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
              <Form/>
            </div>
          </div>
        </div>
        </>
    )
}

export default AuthPage