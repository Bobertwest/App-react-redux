import Swal from "sweetalert2";
import { confirmarEliminacion } from "../actions/productoActions";

export const correctAlert = () => {
  Swal.fire({
    title: "Correcto",
    text: "El producto de agregó correctamente",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const errorAlert = () => {
  Swal.fire({
    title: "Opp...",
    text: "Hubo un error",
    icon: "error",
  });
};

export const eliminarConfirmacionAlert = (id) => (dispatch) => {
  Swal.fire({
    title: "¿Seguro que quieres eliminar el producto?",
    text: "No podras revertir esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(confirmarEliminacion(true, id));
    }
  });
};

export const confirmacionAlert = () => {
  Swal.fire({
    title: "Eliminado",
    text: "El producto fue eliminado!",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
};
