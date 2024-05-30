import {
  ADD_TO_CART,
  GET_PRODUCTS,
  GET_DETAIL,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  CLEAN_DETAIL,
  GET_BY_NAME,
  ORDER_NAME,
  SET_FILTER,
  DELETE_PRODUCT,
  SET_FILTER_PRODUCTS,
  SET_ALL_PRODUCTS,
  SET_CATEGORY_FILTER,
  FILTER_BY_BRAND,
  FETCH_BRANDS,
  SET_BRANDS,
  SET_CATEGORIES,
  SEARCH_PRODUCTS_BY_NAME,
  FILTER_BY_CATEGORY,
  RESET_FILTERS
} from "../actions/types";

import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../reducer/localStorageHelpers";

const initialState = {
  allProducts: [],
  copyProducts: [],
  producto: [],
  productDetail: {},
  items: loadCartFromLocalStorage(),
  filteredProducts: [],
  categoryFilter: "",
  brandFilter: "",
  brands: [],
  categories: [],
  searchResults: [],
};

const applyFilters = (products, filters) => {
  const { searchResults, categoryFilter, brandFilter } = filters;

  let filtered = products;

  // Aplicar búsqueda por nombre
  if (searchResults && searchResults.length > 0) {
    filtered = filtered.filter(product => {
      return searchResults.some(result => result.id === product.id);
    });
  }

  // Aplicar filtro de categoría
  if (categoryFilter !== "" && categoryFilter !== "") {
    filtered = filtered.filter(product => {
      const normalizedCategoryPayload = String(product.CategoryIdCategory).toLowerCase();
      return normalizedCategoryPayload === categoryFilter;
    });
  }

  // Aplicar filtro de marca
  if (brandFilter !== "default" && brandFilter !== "") {
    filtered = filtered.filter(product => {
      const normalizedBrandIdBrand = String(product.BrandIdBrand).toLowerCase();
      return normalizedBrandIdBrand === brandFilter;
    });
  }

  return filtered;
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        copyProducts: [...action.payload],
      };

      case SEARCH_PRODUCTS_BY_NAME:
      const { payload: searchResults } = action;

      // Restablecer los filtros a sus valores predeterminados
      const resetFiltersState = {
        ...state,
        categoryFilter: "",
        brandFilter: "",
        searchResults,
      };
        // Aplicar todos los filtros (que ahora están restablecidos) a los resultados de búsqueda
        const filteredResultsAfterSearch = applyFilters(state.allProducts, resetFiltersState);

        return {
          ...resetFiltersState,
          filteredProducts: searchResults,
        };

    case GET_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
      };

    case SET_BRANDS:
      return { ...state, brands: action.payload };

    case SET_CATEGORIES:
      return { ...state, categories: action.payload };

    case SET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };

    case SET_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: action.payload,
      };

      case FILTER_BY_BRAND:
        const { payload: brandPayload } = action;
        const normalizedBrandPayload = String(brandPayload).toLowerCase();
  
        // Aplicar todos los filtros, incluyendo el de marca recién recibido
        const newStateAfterBrandFilter = {
          ...state,
          brandFilter: normalizedBrandPayload,
        };
  
        const filteredResultsByBrand = applyFilters(
          state.searchResults.length > 0 ? state.searchResults : state.allProducts, 
          newStateAfterBrandFilter
        );
  
        if (filteredResultsByBrand.length === 0) {
          alert("No se encontraron productos con esa marca");
        }
  
        return {
          ...newStateAfterBrandFilter,
          filteredProducts: filteredResultsByBrand,
        };

        case FILTER_BY_CATEGORY:
          const { payload: categoryPayload } = action;
          const normalizedCategoryPayload = String(categoryPayload).toLowerCase();
    
          // Aplicar todos los filtros, incluyendo el de categoría recién recibido
          const newStateAfterCategoryFilter = {
            ...state,
            categoryFilter: normalizedCategoryPayload,
          };
    
          const filteredProductsByCategory = applyFilters(
            state.searchResults.length > 0 ? state.searchResults : state.allProducts, 
            newStateAfterCategoryFilter
          );
    
          if (filteredProductsByCategory.length === 0) {
            alert("No se encontraron productos en esa categoría");
          }
    
          return {
            ...newStateAfterCategoryFilter,
            filteredProducts: filteredProductsByCategory,
          };

    case SET_FILTER_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.payload,
      };

    case ADD_TO_CART:
      const existingItemIndex = state.items.findIndex(
        (item) => item.id_Product === action.payload.id_Product
      );
      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      saveCartToLocalStorage(updatedItems);
      return {
        ...state,
        items: updatedItems,
      };

    case REMOVE_FROM_CART:
      const updatedItemsAfterRemoval = state.items.filter(
        (item) => item.cartItemId !== action.payload
      );
      saveCartToLocalStorage(updatedItemsAfterRemoval);
      return {
        ...state,
        items: updatedItemsAfterRemoval,
      };

    case UPDATE_CART_ITEM_QUANTITY:
      const updatedItemsAfterQuantityChange = state.items.map((item) =>
        item.cartItemId === action.payload.itemId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      saveCartToLocalStorage(updatedItemsAfterQuantityChange);
      return {
        ...state,
        items: updatedItemsAfterQuantityChange,
      };

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        productDetail: {},
      };

    case GET_BY_NAME:
      return {
        ...state,
        copyProducts: action.payload,
      };

    case ORDER_NAME:
      if (action.payload === "a-z") {
        const orderByName = [...state.copyProducts].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        return {
          ...state,
          copyProducts: orderByName,
        };
      } else if (action.payload === "z-a") {
        const orderByName = [...state.copyProducts].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        return {
          ...state,
          copyProducts: orderByName,
        };
      }
      case RESET_FILTERS:
      return {
        ...state,
        brandFilter: '',
        categoryFilter: '',
        filteredProducts: state.allProducts,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter(
          (product) => product.id !== action.payload
        ),
        copyProducts: state.copyProducts.filter(
          (product) => product.id !== action.payload
        ),
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
