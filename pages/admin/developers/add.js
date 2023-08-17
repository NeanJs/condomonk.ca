"use client";
import Button from "@/components/button";

import { addDeveloper, updateDeveloper } from "@/services/developers";
import { Field, Formik, Form } from "formik";
import dynamic from "next/dynamic";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";

import { toast } from "react-toastify";
import Layout from "../layout";
// import TextEditor from "@/app/components/RichTextEditor";

export default function DeveloperForm({ developerProps }) {
  const initialValues = {
    name: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  return (
    <Layout>
      <Button onClick={() => route.back()}>Go Back</Button>

      <div className="flex flex-col gap-2 bg-admin_white p-4 rounded-lg">
        <span className="text-admin_purple text-xl mb-5">
          {developerProps?._id ? "Edit builder" : "Add a new builder"}
        </span>
        <Formik
          initialValues={developerProps || initialValues}
          enableReinitialize
          onSubmit={async (values, { resetForm }) => {
            if (developerProps?._id) {
              await updateDeveloper({ ...values, _id: developerProps?._id })
                .then((response) => {
                  toast.success(response.message);
                })
                .catch((err) => {
                  toast.error(err?.data?.message);
                });
            } else {
              await addDeveloper(values)
                .then((res) => {
                  toast.success(res.message);
                })
                .catch((err) => {
                  toast.error(err?.data?.message);
                });
            }
            setIsLoading(false);
            resetForm();
            route.push("/admin/developers");
          }}
        >
          {({ values, setValues }) => (
            <Form className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label>Name of Developer</label>
                <Field
                  name="name"
                  placeholder="Enter name of Developer"
                  type="text"
                />
              </div>
              {/* <div className="flex flex-col">
                <label>Developer Description</label>
                <Field
                  name="description"
                  placeholder="Description"
                  type="text"
                />
              </div> */}
              <div className="flex gap-2">
                <Button type={"submit"}>
                  {isLoading ? (
                    <FiLoader className="animate-spin" />
                  ) : developerProps?._id ? (
                    "Update"
                  ) : (
                    "Add"
                  )}
                </Button>
                {developerProps?._id && (
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
