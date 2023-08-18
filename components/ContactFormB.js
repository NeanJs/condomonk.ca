import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import Button from "./button";

export default function ContactFormB() {
  const initialValues = {
    fullname: "",
    email: "",
    phone: "",
    relator: "",
    message: "",
  };

  return (
    <div className="flex flex-col gap-.5 items-center px-4 my-10">
      <img src={"/contact-bottom-2.png"} className="mx-auto w-80 my-4" />
      <div className="flex flex-col text-center my-5">
        <h2 className="font-medium text-xl">
          Are you looking to buy a preconstruction home for the first time ?
        </h2>
        <span>Don't know where to start ? Contact CondoMonk now!</span>
      </div>
      <div className="flex w-full md:w-4/5 lg:w-2/5 bg-white shadow-xl rounded-xl">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            // console.log(values);
            toast.success("Message sent successfully1")
          }}
        >
          <Form className="flex contact-form-b form-fields flex-col p-4 w-full mx-auto gap-3">
            <div className="grid grid-cols-2 gap-2">
              <Field type="text" placeholder="Full Name" name="fullname" />
              <Field type="tel" placeholder="Phone" name="phone" />
            </div>
            <Field type="email" placeholder="Your email" name="email" />
            <div className="flex flex-col relative">
              <label className="text-xs absolute top-1 left-2"> Are you a realtor or working with a realtor? </label>
              <Field as="select" placeholder="Full Name" name="realtor">
                <option value={"yes"}>Yes</option>
                <option value={"no"}>No</option>
              </Field>
            </div>
            <Field
              as="textarea"
              placeholder="Enter your message"
              name="message"
              className="h-[140px]"
            />
            <Button className="bg-black border-black text-white hover:bg-transparent hover:border-black hover:text-black mx-auto">
              Contact Now
            </Button>
            <span className="text-xs">
              Condomonk is an online pre-construction homes database. Condomonk
              curates the list of projects that are publicly available on
              internet and does not take part in any real estate transactions.
              Be advised the information provided on this page could be outdated
              or inaccurate. By submitting above form you consent the real
              estate agents advertising on this page to connect with you. We may
              share your info to our partners or advertisers to help you with
              your questions. You can unsubscribe at any time by emailing us.
            </span>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
