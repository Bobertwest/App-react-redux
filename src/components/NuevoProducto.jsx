import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearNuevoProductoAction } from "../actions/productoActions";

const NuevoProducto = (props) => {
  const { history } = props;
  const productosState = useSelector((state) => state.productos);

  const { loading, error } = productosState;

  const dispatch = useDispatch();
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: 0,
  });

  const { nombre, precio } = nuevoProducto;

  const handleChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]:
        e.target.type === "number"
          ? parseFloat(e.target.value)
          : e.target.value,
    });
  };

  const subirNuevoProducto = (e) => {
    e.preventDefault();
    if (nombre.trim() === "" || precio <= 0) {
      return;
    }
    nuevoProducto.precio = nuevoProducto.precio.toFixed(2);
    dispatch(crearNuevoProductoAction(nuevoProducto));
    history.push("/");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>

            <form onSubmit={subirNuevoProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  autoComplete="off"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  step="0.01"
                  value={precio}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                Agregar
              </button>
            </form>
            {loading ? <p>Cargando...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                Hubo un error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
