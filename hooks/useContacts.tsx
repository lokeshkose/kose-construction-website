import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import {
  fetchData,
  createItem,
  updateItem,
  deleteItem,
} from "../service/apiService";
import {
  Contact,
  CreateContact,
  CreateContactResponse,
} from "../types/contact.types";
import { FetchResponse } from "@/types/shared.types";

const useContacts = () => {
  const [fetchResponse, setFetchResponse] = useState<FetchResponse<Contact>>({
    data: [],
    total: 0,
    success: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<{
    skip: number;
    limit: number;
    searchText?: string;
  }>({
    skip: 0,
    limit: 10,
  });

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const result = await fetchData<FetchResponse<Contact>>("contacts", query);
      if (result) setFetchResponse(result);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [query]);

  const handleSearch = useCallback(
    debounce(async (term: string) => {
      console.log(term);

      setQuery((prev) => {
        const updatedQuery = { ...prev };

        if (term.trim()) {
          updatedQuery.searchText = term;
        } else {
          delete updatedQuery.searchText;
        }

        return updatedQuery;
      });
    }, 300),
    []
  );

  const addContact = async (newContact: CreateContact) => {
    setLoading(true);
    try {
      const response = await createItem<CreateContactResponse>(
        "contacts",
        newContact
      );
      if (response) return response;
    } catch (error) {
      console.error("Error adding contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const editContact = async (id: string, updatedContact: Partial<Contact>) => {
    setLoading(true);
    try {
      const success = await updateItem("contacts", id, updatedContact);
      if (success) {
        return success;
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeContact = async (id: string) => {
    setLoading(true);
    try {
      const success = await deleteItem("contacts", id);
      if (success) {
        return success;
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendMail = async (body: {
    email: string;
    subject: string;
    message: string;
  }) => {
    setLoading(true);
    try {
      const success = await createItem<CreateContactResponse>(
        "shareMail",
        body
      );
      if (success) {
        return success;
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchResponse,
    loading,
    handleSearch,
    addContact,
    editContact,
    removeContact,
    setQuery,
    sendMail,
  };
};

export default useContacts;
