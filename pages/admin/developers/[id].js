import { fetchDeveloperById } from "@/services/developers";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DeveloperForm from "./add";

export default function EditCity() {
  const router = useRouter();
  const [developer, setDeveloper] = useState({});
  const { id } = router.query;

  useEffect(() => {
    handleFetchDeveloper();
  }, [router]);
  const handleFetchDeveloper = async () =>
    await fetchDeveloperById(id)
      .then((response) => {
        setDeveloper(response);
      })
      .catch((err) => {
        toast.error(err);
      });
  return <DeveloperForm developerProps={developer} />;
}
