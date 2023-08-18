"use client";
import Button from "@/components/button";

import { addCity, updateCity } from "@/services/locations";
import { Field, Formik, Form } from "formik";
import dynamic from "next/dynamic";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";

import { toast } from "react-toastify";
import Layout from "../../layout";
// import TextEditor from "@/app/components/RichTextEditor";
const TextEditor = dynamic(() => import("@/components/global/RichTextEditor"), {
  ssr: false,
});

export default function CityForm({ cityProps }) {
  const initialValues = {
    name: "",
    description: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  return (
    <Layout>
      <Button onClick={() => route.back()}>Go Back</Button>
      <div className="flex flex-col gap-2 bg-admin_white p-4 rounded-lg">
        <span className="text-admin_purple text-xl mb-5">
          {cityProps?._id ? "Edit location" : "Add a new location"}
        </span>
        <Formik
          initialValues={cityProps || initialValues}
          enableReinitialize
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true);
            if (cityProps?._id) {
              await updateCity({ ...values, _id: cityProps?._id })
                .then((response) => {
                  toast.success(response.message);
                })
                .catch((err) => {
                  toast.error(err?.data?.message);
                });
            } else {
              await addCity(values)
                .then((res) => {
                  setCities(res);
                  toast.success(res.message);
                })
                .catch((err) => {
                  toast.error(err?.data?.message);
                });
            }
            setIsLoading(false);
            resetForm();
            route.push("/admin/cities");
          }}
        >
          {({ values, setValues }) => (
            <Form className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label>Name of City</label>
                <Field
                  name="name"
                  placeholder="Enter name of city"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label>City Description</label>
                {/* <Field
                  name="description"
                  placeholder="Description"
                  type="text"
                /> */}
                <TextEditor
                  value={values.description}
                  setValue={(e) => setValues({ ...values, description: e })}
                />
              </div>
              <div className="flex gap-2 mt-10">
                <Button type={"submit"}>
                  {isLoading ? (
                    <FiLoader className="animate-spin" />
                  ) : cityProps?._id ? (
                    "Update"
                  ) : (
                    "Add"
                  )}
                </Button>
                {cityProps?._id && (
                  <Button onClick={() => route.back()}>Cancel</Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
}
