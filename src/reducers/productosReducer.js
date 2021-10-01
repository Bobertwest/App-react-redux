import {
  ACTUALIZAR_EXITO,
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_ERROR,
  AGREGAR_PRODUCTO_EXITO,
  COMENZAR_DESCARGA,
  COMENZAR_DESCARGA_ERROR,
  COMENZAR_DESCARGA_EXITO,
  ELIMINAR_PRODUCTO_EXITO,
  OBTENER_EDITAR_PRODUCTO,
} from "../types";

const initialState = {
  productos: [],
  productoEditar: [],
  error: null,
  loading: false,
};

export default function productosReducer(state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA:
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: true,
      };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        productos: [...state.productos, action.payload],
      };
    case COMENZAR_DESCARGA_ERROR:
    case AGREGAR_PRODUCTO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case COMENZAR_DESCARGA_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        productoEditar: [],
        productos: action.payload,
      };
    case OBTENER_EDITAR_PRODUCTO:
      return {
        ...state,
        loading: false,
        productoEditar: state.productos.filter(
          (producto) => producto.id === action.payload
        ),
      };
    case ELIMINAR_PRODUCTO_EXITO:
      return {
        ...state,
        productos: state.productos.filter(
          (producto) => producto.id !== action.payload
        ),
      };
    case ACTUALIZAR_EXITO:
      return {
        ...state,
        loading: false,
        productos: state.productos.map((producto) =>
          producto.id === action.payload.id
            ? (producto = action.payload)
            : producto
        ),
      };
    default:
      return state;
  }
}
