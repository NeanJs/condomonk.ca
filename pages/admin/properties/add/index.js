"use client";
import { fetchCities } from "@/services/locations";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";

import { FiLoader, FiUpload } from "react-icons/fi";
import Button from "@/components/button";
import UPLOAD_IMAGE from "@/assets/upload_images.svg";
import { postProperty, updateProperty } from "@/services/properties";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { api } from "@/handlers/axios";
import dynamic from "next/dynamic";
import Layout from "../../layout";
import { AiFillDelete } from "react-icons/ai";

const TextEditor = dynamic(() => import("@/components/global/RichTextEditor"), {
  ssr: false,
});
export default function PropertyForm({ property }) {
  const initialValues = {
    name: property?.name || "",
    occupancy: property?.occupancy || "",
    deposit: property?.deposit || 0,
    pictures: property?.pictures || [],
    description: property?.description || "",
    location: property?.location || "",
  };
  // const [images, setImages] = useState(property?.pictures);
  const [files, setFiles] = useState([]);
  const navigate = useRouter();
  const [cities, setCities] = useState([]);

  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    fetchCities().then((res) => {
      setCities(res);
    });
  }, []);
  const handleImageChange = async (ev) => {
    setFiles(ev.target.files);
  };
  const handleImageUploads = async (name) => {
    let data = new FormData();

    for (let file of files) {
      data.append("file", file);
    }
    data.append("name", name);

    const res = await api.post("upload", data);

    return res.data;
  };
  const handleDeleteImage = async ({ id, key }) => {
    await api
      .post("delete/single", { id, key })
      .then(async (res) => {
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <div className="flex w-full flex-col min-w-fit min-h-fit bg-white p-4 shadow-lg rounded-lg gap-2">
        <span className="text-admin_purple text-xl font-bold">
          {property?._id ? "Edit location" : "Add a new location"}
        </span>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            setIsUploading(true);
            let images = [];
            let imgsURL = [];
            if (!property) {
              if (files.length > 0) {
                images = await handleImageUploads(values.name);
              }

              await postProperty({ ...values, pictures: images })
                .then((res) => {
                  toast.success(res.data.message);
                  navigate.push("/admin/properties");
                  resetForm();
                })
                .catch((err) => {
                  toast.error(err.message);
                });
            } else {
              if (files.length > 0) {
                imgsURL = await handleImageUploads(values.name);
              }
              images = [...values.pictures, ...imgsURL];

              await updateProperty({
                ...values,
                pictures: images,
                _id: property?._id,
              })
                .then((res) => {
                  toast.success(res.data.message);
                  navigate.push("/admin/properties");
                })
                .catch((err) => {
                  toast.error(err.data.message);
                });
            }
            setIsUploading(false);
          }}
        >
          {({ values, setValues }) => (
            <Form className="form-fields w-full flex flex-col gap-4 h-full overflow-scroll">
              <div className="flex flex-col">
                <label>Name of Project</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Property Name"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>Description:</label>
                {/* <Field
                as="textarea"
                required
                name="description"
                type="text"
                placeholder="Description"
              /> */}
                <TextEditor
                  value={values.description}
                  setValue={(e) => setValues({ ...values, description: e })}
                />
              </div>
              <div className="flex flex-col relative">
                <label>Pictures</label>
                <div className="w-fit flex items-center justify-center gap-2 relative border-2 rounded-lg p-2 bg-white h-fit">
                  <Image src={UPLOAD_IMAGE} width="40" height={"40"} />
                  <span className="p-4 rounded-lg flex gap-2 items-center">
                    <FiUpload />
                    <span>Click here to upload</span>
                  </span>
                  <input
                    className=" opacity-0 w-full h-full absolute "
                    type="file"
                    name="pictures"
                    multiple
                    onChange={handleImageChange}
                  />
                </div>
                {files.length > 0 && (
                  <span>{files.length} pictures selected</span>
                )}
              </div>
              <div className="flex flex-row gap-8">
                {property?.pictures?.length > 0 &&
                  property?.pictures?.map((picture, id) => (
                    <div className="img-holder relative " key={picture + id}>
                      <img
                        className="w-32 h-32 rounded-md shadow-md shadow-neutral-400 object-cover"
                        src={picture.url}
                      />
                      {/* <div className="flex gap-2 absolute -top-3 -right-5">
                        <span
                          className="bg-red-500 p-2 w-fit h-fit  text-white text-xl rounded-full"
                          onClick={() =>
                            handleDeleteImage({
                              id: property._id,
                              key: picture.key,
                            })
                          }
                        >
                          <AiFillDelete />
                        </span>
                      </div> */}
                    </div>
                  ))}
              </div>

              <div className="flex flex-col">
                <label>Deposit structure</label>
                <Field
                  name="deposit"
                  required
                  type="number"
                  placeholder="Deposit"
                />
              </div>
              <div className="flex flex-col">
                <label>Occupancy date:</label>
                <Field
                  required
                  name="occupancy"
                  // type="date"
                  type="number"
                  placeholder="Occupancy date"
                />
              </div>

              <div className="flex flex-col">
                <label>Cities</label>
                <Field name="location" as="select" placeholder="City" required>
                  <option value={"default"}>Default</option>
                  {cities?.length > 0 &&
                    cities?.map((city) => (
                      <option value={city?.name} key={city?.name + city?._id}>
                        {city?.name}
                      </option>
                    ))}
                </Field>
              </div>
              <div className="flex gap-2">
                <Button
                  disabled={isUploading}
                  title={
                    isUploading ? (
                      <FiLoader className="animate-spin" />
                    ) : property?._id ? (
                      "Update"
                    ) : (
                      `Submit`
                    )
                  }
                  primary
                  type="submit"
                />
                {property?._id && (
                  <Button
                    alt
                    onClick={() => navigate.push("/admin/properties")}
                    title={"Cancel"}
                    type="button"
                  />
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
}
