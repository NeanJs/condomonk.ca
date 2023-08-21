import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { FiLoader, FiUpload } from "react-icons/fi";
import Button from "@/components/button";
import UPLOAD_IMAGE from "@/assets/upload_images.svg";
import { postProperty, updateProperty } from "@/services/properties";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { propertyStatus, propertyTypes } from "@/constants/static";
import { api } from "@/handlers/axios";
import dynamic from "next/dynamic";
import Layout from "../layout";
import { fetchDevelopers, addDeveloper } from "@/services/developers";
import { AiFillDelete } from "react-icons/ai";
import { addCity, fetchCities } from "@/services/locations";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import GeocoderControl from "@/components/Geocoder";

const TextEditor = dynamic(() => import("@/components/global/RichTextEditor"), {
  ssr: false,
});
export default function PropertyForm({ property }) {
  const [marker, setMarker] = useState({
    lat: 0,
    lng: 0,
  });
  const [viewState, setViewState] = useState({
    longitude: marker.lng || property?.longitude || 0,
    latitude: marker.lat || property?.latitude || 0,
    zoom: 14,
  });

  const initialValues = {
    name: property?.name || "",
    developer: property?.developer || {},
    price: property?.price || 0,
    type: property?.type || "",
    status: property?.status || "",
    completion: property?.completion || "",
    city: property?.city || "",
    address: property?.address || "",
    postalcode: property?.postalcode || "",
    description: property?.description || "",
    deposits: property?.deposits || "",
    pictures: property?.pictures || [],
    floorPlans: property?.floorPlans || [],
    slug: property?.slug || "",
    latitude: property?.latitude || "",
    longitude: property?.longitude || "",
  };
  const [listingImages, setListingImages] = useState([]);
  const [listingFloors, setListingFloors] = useState([]);
  const [developers, setDevelopers] = useState([]);

  const [files, setFiles] = useState([]);
  const [floorPlans, setFloorPlans] = useState([]);
  const navigate = useRouter();
  const [cities, setCities] = useState([]);

  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    handleFetchCities();
    handleFetchDevelopers();
  }, []);
  const handleFetchCities = async () => {
    await fetchCities().then((res) => {
      setCities(res);
    });
  };
  const handleFetchDevelopers = async () => {
    await fetchDevelopers().then((res) => {
      setDevelopers(res);
    });
  };
  const handleImageChange = async (ev) => {
    setFiles(ev.target.files);
  };
  const handleFloorPlans = async (ev) => {
    setFloorPlans(ev.target.files);
  };
  const handleImageUploads = async (name, type) => {
    let data = new FormData();
    if (type == "properties") {
      for (let file of files) {
        data.append("file", file);
      }
    } else {
      for (let file of floorPlans) {
        data.append("file", file);
      }
    }
    data.append("name", name);
    data.append("type", type);

    const res = await api.post("upload", data);
    return res.data;
  };

  const handleDeleteImage = async ({ id, key }) => {
    await api
      .post("delete/image", { id, key })
      .then(async (res) => {
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const [page, setPage] = useState(0);
  useEffect(() => {
    handlePageChange();
  }, [page]);
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };
  const handleMarker = (e) => {
    const { lat, lng } = e.lngLat;
    setMarker({
      lat: lat,
      lng: lng,
    });
  };
  const handlePageChange = () => {};
  const developerOpts = developers.map((developer) => ({
    value: developer,
    label: developer.name,
  }));

  const cityOpts = cities.map((city) => ({
    value: city.name,
    label: city.name,
  }));
  const handleCreateDeveloper = async (e) => {
    let developer = {
      name: e,
    };
    await addDeveloper(developer);
    handleFetchDevelopers();
  };
  const handleCreateCity = async (e) => {
    let city = {
      name: e,
    };
    await addCity(city);
    handleFetchCities();
  };

  return (
    <Layout>
      <Button onClick={() => navigate.back()}>Go Back</Button>

      <div className="flex w-full flex-col min-w-fit overflow-scroll border-2 bg-white p-4 shadow-lg rounded-lg relative">
        <span className="text-admin_purple text-xl mb-5">
          {property?._id ? "Edit location" : "Add a new location"}
        </span>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            setIsUploading(true);
            let images = [];
            let imgsURL = [];
            let floors = [];
            values.slug = values.name
              .split(",")[0]
              .replace(/ /g, "-")
              .toLowerCase();
            values.developer = values.developer.value;
            values.city = values.city.value;
            // console.log(values);
            if (!property) {
              if (files.length > 0) {
                images = await handleImageUploads(values.name, "properties");
              }
              if (floorPlans.length > 0) {
                floors = await handleImageUploads(values.name, "floorplans");
              }
              await postProperty({
                ...values,
                pictures: images,
                floorPlans: floors,
              })
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
                imgsURL = await handleImageUploads(values.name, "properties");
              }
              if (floorPlans.length > 0) {
                floors = await handleImageUploads(values.name, "floorplans");
              }
              images = [...values.pictures, ...imgsURL];
              floors = [...values.floorPlans, ...floors];
              await updateProperty({
                ...values,
                pictures: images,
                floorPlans: floors,
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
            <Form className="relative flex flex-col ">
              <div className="form-fields flex-col overflow-scroll max-h-[600px]">
                {page == 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-fields w-full grid grid-cols-2 gap-4 ">
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
                        <label>Developed by</label>
                        <Field
                          name="developer"
                          component={(props) => (
                            <CreatableSelect
                              onCreateOption={handleCreateDeveloper}
                              options={developerOpts}
                              {...props}
                              value={values.developer}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  developer: e,
                                })
                              }
                            />
                          )}
                          placeholder="Choose a developer"
                          required
                        ></Field>
                      </div>
                      <div className="flex flex-col">
                        <label>Price:</label>
                        <Field
                          name="price"
                          required
                          type="text"
                          placeholder="Price"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label>Property Type</label>
                        <Field name="type" as="select" required>
                          <option value={"default"}>Default</option>

                          {propertyTypes?.length > 0 &&
                            propertyTypes?.map((type) => (
                              <option value={type?.value} key={type?.name}>
                                {type?.name}
                              </option>
                            ))}
                        </Field>
                      </div>
                      <div className="flex flex-col">
                        <label>Property Status</label>
                        <Field name="status" as="select" required>
                          <option value={"default"}>Default</option>
                          {propertyStatus?.length > 0 &&
                            propertyStatus?.map((status) => (
                              <option value={status?.value} key={status?.name}>
                                {status?.name}
                              </option>
                            ))}
                        </Field>
                      </div>
                      <div className="flex flex-col">
                        <label>Completion:</label>
                        <Field
                          name="completion"
                          required
                          type="text"
                          placeholder="Completion"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label>City</label>
                        <Field
                          name="city"
                          component={(props) => (
                            <CreatableSelect
                              options={cityOpts}
                              {...props}
                              onCreateOption={handleCreateCity}
                              value={values.city}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  city: e,
                                })
                              }
                            />
                          )}
                          placeholder="Choose a city"
                          required
                        ></Field>
                      </div>
                      <div className="flex flex-col">
                        <label>Address:</label>
                        <Field
                          name="address"
                          required
                          // type="date"
                          type="text"
                          placeholder="Address"
                          onChange={async (e) => {
                            await setValues({
                              ...values,
                              address: e.target.value,
                            }),
                              handleAddressInput(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label>Postal Code:</label>
                        <Field
                          name="postalcode"
                          required
                          // type="date"
                          type="text"
                          placeholder="Postal Code"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label>Latitude:</label>
                        <Field
                          name="latitude"
                          required
                          // type="date"
                          type="text"
                          placeholder="Latitude"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label>Longitude:</label>
                        <Field
                          name="longitude"
                          required
                          // type="date"

                          type="text"
                          placeholder="Longitude"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Map
                        doubleClickZoom={false}
                        {...viewState}
                        onMove={({ viewState }) => setViewState(viewState)}
                        style={{ width: "100%", height: 400, zIndex: 999 }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken="pk.eyJ1IjoidmlzaGFsZGhha2FsOTkiLCJhIjoiY2tocjN2bWh6MDZpZzJybGg0NXJtcm8waCJ9.TBbd_lsF-2Z9s_lqm754zg"
                      >
                        <GeocoderControl
                          onResult={(e) => {
                            setValues({
                              ...values,
                              latitude: e?.result?.center[1],
                              longitude: e?.result?.center[0],
                              address: e?.result?.place_name,
                            });
                          }}
                          marker={true}
                          position="top-left"
                          mapboxAccessToken="pk.eyJ1IjoidmlzaGFsZGhha2FsOTkiLCJhIjoiY2tocjN2bWh6MDZpZzJybGg0NXJtcm8waCJ9.TBbd_lsF-2Z9s_lqm754zg"
                        />
                      </Map>
                    </div>
                  </div>
                )}
                {page == 1 && (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <label>Deposit Structure:</label>

                      <TextEditor
                        value={values.deposits}
                        setValue={(e) => setValues({ ...values, deposits: e })}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label>Description:</label>

                      <TextEditor
                        value={values.description}
                        setValue={(e) =>
                          setValues({ ...values, description: e })
                        }
                      />
                    </div>
                  </div>
                )}
                {page == 2 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col relative gap-2">
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
                      <div className="flex flex-wrap gap-8">
                        {property?.pictures?.length > 0 &&
                          property?.pictures?.map((picture, id) => (
                            <div
                              className="img-holder relative "
                              key={picture + id}
                            >
                              <img
                                className="w-32 h-32 rounded-md shadow-md shadow-neutral-400 object-cover"
                                src={picture.url}
                              />
                              <div className="flex gap-3 absolute -top-3 -right-5">
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
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col relative gap-2">
                        <label>Floor Plans</label>
                        <div className="w-fit flex items-center justify-center gap-2 relative border-2 rounded-lg p-2 bg-white h-fit">
                          <Image src={UPLOAD_IMAGE} width="40" height={"40"} />
                          <span className="p-4 rounded-lg flex gap-4 items-center">
                            <FiUpload />
                            <span>Click here to upload</span>
                          </span>
                          <input
                            className=" opacity-0 w-full h-full absolute "
                            type="file"
                            name="floorplans"
                            multiple
                            onChange={handleFloorPlans}
                          />
                        </div>
                        {files.length > 0 && (
                          <span>{floorPlans.length} pictures selected</span>
                        )}
                      </div>
                      <div className="flex gap-8">
                        {property?.floorPlans?.length > 0 &&
                          property?.floorPlans?.map((picture, id) => (
                            <div
                              className="img-holder relative "
                              key={picture + id}
                            >
                              <img
                                className="w-32 h-32 rounded-md shadow-md shadow-neutral-400 object-cover"
                                src={picture.url}
                              />
                              <div className="flex gap-2 absolute -top-3 -right-5">
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
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4 bg-white w-full">
                {page > 0 && (
                  <Button type={"button"} onClick={handlePrev}>
                    Prev Page
                  </Button>
                )}
                {page < 2 && (
                  <Button type={"button"} onClick={handleNext}>
                    Next Page
                  </Button>
                )}
                <Button
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
