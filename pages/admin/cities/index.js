"use client";
import Button from "@/components/button";
import { api } from "@/handlers/axios";
import { addCity, removeCity, updateCity } from "@/services/locations";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../layout";

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({
    name: "",
    description: "",
  });
  useEffect(() => {
    handleFetchCities();
  }, []);
  const route = useRouter();
  const handleSubmit = async () => {
    if (city._id) {
      await updateCity(city)
        .then((response) => {
          toast.success(response?.data?.message);
          handleFetchCities();
        })
        .catch((err) => {
          toast.error(err?.data?.message);
        });
    } else {
      await addCity(city)
        .then((res) => {
          setCities(res);
          toast.success(res?.message);
          handleFetchCities();
        })
        .catch((err) => {
          toast.error(err?.data?.message);
        });
    }
    setCity({ name: "" });
  };

  const handleFetchCities = async () => {
    await api
      .get("locations")
      .then((res) => {
        setCities(res.data.data);
        // toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const handleDeleteCity = async (id) => {
    const response = await removeCity(id);

    toast.success(response?.message);
    handleFetchCities();
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Button onClick={() => route.push("cities/add")}>Add New City</Button>
        <table>
          <thead>
            <tr>
              <td>SN</td>
              <td>Name</td>
              {/* <td>Description</td> */}
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {cities?.length > 0 &&
              cities.map((loc, key) => (
                <tr key={loc._id}>
                  <td>{key + 1}</td>
                  <td>{loc.name}</td>
                  {/* <td>{loc?.description}</td> */}
                  <td className="flex gap-2">
                    <Button onClick={() => route.push(`cities/${loc._id}`)}>
                      Edit
                    </Button>
                    <Button
                      className={`bg-admin_red text-white border-admin_red hover:bg-white hover:text-admin_red hover:border-admin_red`}
                      onClick={() => handleDeleteCity(loc._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
