import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  actualizarProducto,
  obtenerProductoEditar,
  obtenerProductos,
} from "../actions/productoActions";

const EditarProducto = ({ history }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const productosState = useSelector((state) => state.productos);
  const { productoEditar, error } = productosState;
  const [submitEstado, setSubmitEstado] = useState(true);
  const [productoActualizado, setProductoActualizado] = useState({
    nombre: "",
    precio: 0,
    id: parseInt(id, 10),
  });

  useEffect(() => {
    if (!productoEditar[0]) {
      dispatch(obtenerProductos(parseInt(id, 10)));
    }
    dispatch(obtenerProductoEditar(parseInt(id, 10)));
    //eslint-disable-next-line
  }, []);

  if (!productoEditar[0]) return <h1>Cargando....</h1>;

  const handleChange = (e) => {
    setSubmitEstado(false);
    setProductoActualizado({
      ...productoActualizado,
      [e.target.name]:
        e.target.type === "number"
          ? parseFloat(e.target.value)
          : e.target.value,
    });
  };
  const { nombre, precio } = productoEditar[0];
  document.title = nombre;

  const enviarCambios = (e) => {
    e.preventDefault();
    if (productoActualizado.nombre.trim() === "") {
      productoActualizado.nombre = nombre;
    }
    if (productoActualizado.precio <= 0) {
      productoActualizado.precio = parseFloat(precio);
    }
    productoActualizado.precio = productoActualizado.precio.toFixed(2);
    dispatch(actualizarProducto(productoActualizado));
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>
            <form onSubmit={enviarCambios}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  defaultValue={nombre}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  defaultValue={precio}
                  autoComplete="off"
                  step="0.01"
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={submitEstado}
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                Guardar Cambios
              </button>
            </form>
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                No puedes pasar campos vacíos
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
