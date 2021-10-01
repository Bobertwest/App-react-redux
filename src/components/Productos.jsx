import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerProductos } from "../actions/productoActions";
import Producto from "./Producto";

const Productos = () => {
  const dispatch = useDispatch();
  const productosState = useSelector((state) => state.productos);
  const { loading, productos, error } = productosState;

  useEffect(() => {
    dispatch(obtenerProductos());
    document.title = "React, Redux, React Router DOM";
  }, []);

  return (
    <Fragment>
      <h2 className="text-center my-5">Listado de Productos</h2>
      {error ? (
        <p className="font-weight-bold alert alert-danger text-center">
          Hubo un error
        </p>
      ) : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td>Cargando...</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {productos.length === 0 ? (
              <tr>
                <td>No hay productos</td>
              </tr>
            ) : (
              productos.map((producto) => (
                <Producto key={producto.id} producto={producto} />
              ))
            )}
          </tbody>
        )}
      </table>
    </Fragment>
  );
};

export default Productos;
