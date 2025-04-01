import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../useAxiosInstance";
import debounce from "lodash.debounce";
const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchContact = async (query = "") => {
    try {
      const response = await axiosInstance.get("/app/api/contacts", {
        params: { ...(query && { search: query }) },
      });
      const result = await response.data;
      setContacts(result.contacts);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchContact();
  }, []);

  const handleSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
      fetchContact(term);
    }, 50),
    []
  );

  return { contacts, loading, searchTerm, handleSearch };
};

export default useUser;
