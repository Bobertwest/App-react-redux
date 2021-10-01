import { confirmacionAlert, correctAlert, errorAlert } from "../alerts/alerts";
import clienteAxios from "../config/Axios";
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

//Crear nuevo producto
export const crearNuevoProductoAction = (nuevoProducto) => async (dispatch) => {
  dispatch({
    type: AGREGAR_PRODUCTO,
  });
  try {
    const respuesta = await clienteAxios.post("/productos", nuevoProducto);
    dispatch({
      type: AGREGAR_PRODUCTO_EXITO,
      payload: respuesta.data,
    });
    correctAlert();
  } catch (error) {
    dispatch({
      type: AGREGAR_PRODUCTO_ERROR,
      payload: true,
    });
    errorAlert();
  }
};

export const obtenerProductos = (id) => async (dispatch) => {
  dispatch(descargaDeProductosLoading());
  try {
    const respuesta = await clienteAxios.get("/productos");
    dispatch({
      type: COMENZAR_DESCARGA_EXITO,
      payload: respuesta.data,
    });
    if (id) {
      dispatch(obtenerProductoEditar(id));
    }
  } catch (error) {
    dispatch({
      type: COMENZAR_DESCARGA_ERROR,
      payload: true,
    });
  }
};

export const descargaDeProductosLoading = () => async (dispatch) => {
  dispatch({
    type: COMENZAR_DESCARGA,
  });
};

export const obtenerProductoEditar = (id) => async (dispatch) => {
  dispatch({
    type: OBTENER_EDITAR_PRODUCTO,
    payload: id,
  });
};

export const confirmarEliminacion = (confirmacion, id) => (dispatch) => {
  if (confirmacion) {
    dispatch(eliminarProducto(id));
  }
};

export const eliminarProducto = (id) => async (dispatch) => {
  try {
    await clienteAxios.delete(`/productos/${id}`);
    dispatch({
      type: ELIMINAR_PRODUCTO_EXITO,
      payload: id,
    });
    confirmacionAlert();
  } catch (error) {
    console.log(error);
  }
};

export const generarError = () => (dispatch) => {
  dispatch({
    type: COMENZAR_DESCARGA_ERROR,
    payload: true,
  });
};

export const actualizarProducto = (producto) => async (dispatch) => {
  try {
    const respuesta = await clienteAxios.put(
      `/productos/${producto.id}`,
      producto
    );
    dispatch({
      type: ACTUALIZAR_EXITO,
      payload: respuesta.data,
    });
  } catch (error) {
    console.log(error);
  }
};
