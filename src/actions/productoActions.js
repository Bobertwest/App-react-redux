import axios from "axios";
import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_ERROR,
  AGREGAR_PRODUCTO_EXITO,
} from "../types";

//Crear neuvo producto
export const crearNuevoProductoAction = (nuevoProducto) => async (dispatch) => {
  dispatch(agregarProducto());
  try {
    const respuesta = await axios.post(
      "http://localhost:4000/productos",
      nuevoProducto
    );
    dispatch(agregarProductoExito(respuesta.data));
  } catch (error) {
    dispatch(agregarProductoError(true));
  }
};

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
});

const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
});
