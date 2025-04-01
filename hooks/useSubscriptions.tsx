import { useState, useEffect, useCallback } from 'react';
import {
  fetchData,
  createItem,
  updateItem,
  deleteItem,
} from '../service/apiService';
import {
  CreateSubscription,
  CreateSubscriptionResponse,
  Subscription,
} from '../types/subscription.types';
import debounce from 'lodash.debounce';
import { FetchResponse } from '@/types/shared.types';

const useSubscriptions = () => {
  const [fetchResponse, setFetchResponse] = useState<
    FetchResponse<Subscription>
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
    limit: 10,
  });

  const fetchSubscriptions = async () => {
    setLoading(true);
    const result = await fetchData<FetchResponse<Subscription>>(
      'subscriptions',
      query
    );
    if (result) setFetchResponse(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [query]);

  const addSubscription = async (newSubscription: CreateSubscription) => {
    setLoading(true);
    try {
      const result = await createItem<CreateSubscriptionResponse>(
        'subscriptions',
        newSubscription
      );
      if (result) setLoading(false);
      return result;
    } catch (error) {
      console.error('Error adding Subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const editSubscription = async (
    id: string,
    updatedSubscription: Partial<Subscription>
  ) => {
    setLoading(true);
    try {
      const success = await updateItem(
        'subscriptions',
        id,
        updatedSubscription
      );
      if (success) {
        setLoading(false);
        return success;
      }
    } catch (error) {
      console.error('Error updating Subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeSubscription = async (id: string) => {
    setLoading(true);
    try {
      const success = await deleteItem('subscriptions', id);
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
        const success = await createItem<CreateSubscriptionResponse>(
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
    addSubscription,
    editSubscription,
    removeSubscription,
    setQuery,
    handleSearch,
    sendMail
  };
};

export default useSubscriptions;
