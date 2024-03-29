import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import Button from "./button";

export default function ContactForm({ sticky, className, developer }) {
  const initialValues = {
    fullname: "",
    email: "",
    phone: "",
    relator: "",
    message: "",
  };
  const TextArea = (e) => {
    return <textarea></textarea>;
  };
  return (
    <div
      className={`flex flex-col gap-.5 items-center scroller-contact ${
        sticky ? "sticky" : ""
      } top-0`}
    >
      <img src="/reg.png" className="mx-auto" />
      <div
        className={`flex w-full lg:w-4/5 bg-white rounded-xl flex-col ${className}`}
        style={{
          boxShadow: "0px 0px 10px 1px rgba(0,0,0,.2)",
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            // console.log(values);
            toast.success("Message sent successfully!");
          }}
        >
          <Form className="flex form-fields flex-col p-4 w-full mx-auto gap-3">
            <div className="grid grid-cols-2 gap-2">
              <Field type="text" placeholder="Full Name" name="fullname" />
              <Field type="tel" placeholder="Phone" name="phone" />
            </div>
            <Field type="email" placeholder="Your email" name="email" />
            <div className="flex flex-col relative border-admin_gray h-[80px] rounded-lg">
              <label className="text-xs absolute left-1 top-1">
                Are you a realtor or working with a realtor?
              </label>
              <Field
                as="select"
                placeholder="Full Name"
                name="realtor"
                className="mt-4"
              >
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
            <Button className="mx-auto bg-black border-black text-white hover:bg-transparent hover:border-black hover:text-black">
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
