import { useState } from "react";
import http from "utils/http";

const useOrders = () => {
  const [orders, setOrders] = useState({});

  // Fetch all currentUser orders
  const fetch = async (page = 1) => {
    setOrders({ loading: true });

    try {
      const {
        data: { data },
      } = await http.get(`/me/orders?limit=10&page=${page}`);

      setOrders({ data });
    } catch (err) {
      setOrders({ error: true });
    }
  };

  return {
    fetch,
    data: orders.data,
    loading: orders.loading,
    error: orders.error,
  };
};

export default useOrders;
