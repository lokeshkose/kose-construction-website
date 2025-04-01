import { useState, useEffect, useCallback } from 'react';
import {
  fetchData,
  createItem,
  updateItem,
  deleteItem,
} from '../service/apiService';
import {
  CreateQuotation,
  CreateQuotationResponse,
  Quotation,
} from '../types/request.types';
import debounce from 'lodash.debounce';
import { FetchResponse } from '@/types/shared.types';

const useQuotations = () => {
   const [fetchResponse, setFetchResponse] = useState<
     FetchResponse<Quotation>
   >({
     data: [],
     total: 0,
     success: false,
   });
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<{
    skip: number;
    limit: number;
    searchText?: string;
  }>({
    skip: 0,
    limit: 20,
  });

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const result = await fetchData<FetchResponse<Quotation>>('quotations', query);
      if (result) setFetchResponse(result);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, [query]);

  const addQuotation = async (newQuotation: CreateQuotation) => {
    setLoading(true);
    try {
      console.log(newQuotation);

      const result = await createItem<CreateQuotationResponse>(
        'quotations',
        newQuotation
      );
      if (result) setLoading(false);
      return result;
    } catch (error) {
      console.error('Error adding Quotation:', error);
    } finally {
      setLoading(false);
    }
  };

  const editQuotation = async (
    id: string,
    updatedQuotation: Partial<Quotation>
  ) => {
    setLoading(true);
    try {
      const success = await updateItem('quotations', id, updatedQuotation);
      if (success) {
        setLoading(false);
        return success;
      }
    } catch (error) {
      console.error('Error updating Quotation:', error);
    } finally {
      setLoading(false);
    }
  };


  const removeQuotation = async (id: string) => {
    setLoading(true);
    try {
      const success = await deleteItem('quotations', id);
      if (success) {
        setLoading(false);
        return success;
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    } finally {
      setLoading(false);
    }
  };

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
  const sendMail = async (body: {
      email: string;
      subject: string;
      message: string;
    }) => {
      setLoading(true);
      try {
        const success = await createItem<CreateQuotationResponse>(
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
    addQuotation,
    editQuotation,
    removeQuotation,
    handleSearch,
    setQuery,
    sendMail
  };
};

export default useQuotations;
