"use client";
import Button from "@/components/button";
import { api } from "@/handlers/axios";
import {
  addDeveloper,
  removeDeveloper,
  updateDeveloper,
  fetchDevelopers,
} from "@/services/developers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../layout";

export default function Cities() {
  const [developers, setDevelopers] = useState([]);
  const [developer, setDeveloper] = useState({
    name: "",
    description: "",
  });
  useEffect(() => {
    handleFetchDevelopers();
  }, []);
  const route = useRouter();

  const handleFetchDevelopers = async () => {
    await fetchDevelopers()
      .then((res) => {
        setDevelopers(res);
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const handleDeleteDeveloper = async (id) => {
    const response = await removeDeveloper(id);

    toast.success(response?.message);
    handleFetchDevelopers();
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Button onClick={() => route.push("developers/add")}>
          Add New Builder
        </Button>
        <table>
          <thead>
            <tr>
              <td>SN</td>
              <td>Name</td>

              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {developers?.length > 0 &&
              developers.map((dev, key) => (
                <tr key={dev._id}>
                  <td>{key + 1}</td>
                  <td>{dev.name}</td>

                  <td className="flex gap-2">
                    <Button onClick={() => route.push(`developers/${dev._id}`)}>
                      Edit
                    </Button>
                    <Button
                      className={`bg-admin_red text-white border-admin_red hover:bg-white hover:text-admin_red hover:border-admin_red`}
                      onClick={() => handleDeleteDeveloper(dev._id)}
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
