import { useState, useEffect } from "react";

export const UUIDCheck = () => {
  const [UUID, setUUID] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/UUID", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setUUID(data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return {UUID, loading};
};