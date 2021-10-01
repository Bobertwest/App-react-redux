import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { eliminarConfirmacionAlert } from "../alerts/alerts";

const Producto = ({ producto }) => {
  const dispatch = useDispatch();

  const eliminar = (id) => {
    dispatch(eliminarConfirmacionAlert(id));
  };

  return (
    <tr>
      <td>{producto.nombre}</td>
      <td>
        <span className="font-weight-bold">${producto.precio}</span>
      </td>
      <td className="acciones">
        <Link
          type="button"
          to={`/producto/editar/${producto.id}`}
          className="btn btn-primary mr-2">
          Editar
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => eliminar(producto.id)}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
