import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { products as defaultProducts, categories as defaultCategories } from '../data/products';

const AdminContext = createContext();

const PRODUCTS_KEY = 'pak-rokers-products';
const CATEGORIES_KEY = 'pak-rokers-categories';
const ORDERS_KEY = 'pak-rokers-orders';

const loadData = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const loadInitialState = () => ({
  products: loadData(PRODUCTS_KEY, defaultProducts),
  categories: loadData(CATEGORIES_KEY, defaultCategories),
  orders: loadData(ORDERS_KEY, []),
});

const adminReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload),
      };
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.orderId === action.payload.orderId
            ? { ...o, status: action.payload.status }
            : o
        ),
      };
    default:
      return state;
  }
};

export function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(adminReducer, null, loadInitialState);

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(state.products));
  }, [state.products]);

  useEffect(() => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(state.categories));
  }, [state.categories]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(state.orders));
  }, [state.orders]);

  const addProduct = useCallback((product) => {
    const id = Date.now();
    const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    dispatch({ type: 'ADD_PRODUCT', payload: { ...product, id, slug } });
  }, []);

  const updateProduct = useCallback((product) => {
    const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    dispatch({ type: 'UPDATE_PRODUCT', payload: { ...product, slug } });
  }, []);

  const deleteProduct = useCallback((id) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  }, []);

  const addCategory = useCallback((category) => {
    const id = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    dispatch({ type: 'ADD_CATEGORY', payload: { ...category, id } });
  }, []);

  const updateCategory = useCallback((category) => {
    dispatch({ type: 'UPDATE_CATEGORY', payload: category });
  }, []);

  const deleteCategory = useCallback((id) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: id });
  }, []);

  const addOrder = useCallback((order) => {
    dispatch({ type: 'ADD_ORDER', payload: { ...order, status: 'pending', date: new Date().toISOString() } });
  }, []);

  const updateOrderStatus = useCallback((orderId, status) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status } });
  }, []);

  return (
    <AdminContext.Provider
      value={{
        ...state,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
