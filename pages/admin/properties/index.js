"use client";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import Properties from "@/components/global/properties";
import Layout from "../layout";

export default function PropertyTable() {
  const route = useRouter();

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Button onClick={() => route.push("properties/add")}>
          Add New Property
        </Button>
        <div className="flex flex-col w-full h-full bg-admin_white shadow-lg rounded-lg gap-2">
          {/*
          <span className="font-bold text-xl shadow-lg p-4">Properties</span>
           <div className="w-full h-5/6 properties gap-4 p-4 grid grid-cols-2 overflow-scroll">
            {properties?.length > 0 ? (
              properties?.map((property) => (
                <div
                  key={property._id}
                  className="property h-fit gap-4 shadow-xl flex flex-col p-2"
                >
                  <div className="property-image">
                    <img
                      src={`https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80`}
                      alt={property.name}
                    />
                  </div>
                  <div className="property-details flex flex-col items-start gap-2">
                    <span>Name: {property?.name}</span>
                    <span>Location: {property?.location}</span>
                    <span>Occupancy: {property?.occupancy}</span>
                    <span>
                      Development Company: {property?.development_company}
                    </span>
                    <span>Deposit: CAD {property?.deposit}</span>
                  </div>
                  <div className="flex flex-col gap-4 lg:flex-row">
                    <Button primary onClick={() => handleEdit(property._id)}>
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(property._id)}
                      className={`bg-red-500 border-red-500 hover:border-red-500 hover:text-red-500`}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <span className="">No Properties Listed</span>
            )}
          </div> */}
          {/* <div className="city-filter flex flex-col gap-2">
            <span>Filter by city:</span>
            <Cities />
          </div> */}
          <Properties admin={true} />
        </div>
        {/* <div className="suggestions">
            No suggestions at the moment
          </div> */}
      </div>
    </Layout>
  );
}
