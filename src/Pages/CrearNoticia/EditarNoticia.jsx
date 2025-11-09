import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerNoticiaPorId, actualizarNoticia } from "../../Data/Noticias";
import { useAuth } from "../../Context/Context";
import "./CrearNoticia.css";

const EditarNoticia = () => {
  const { id } = useParams(); // id de la noticia
  const navigate = useNavigate();
  const { user } = useAuth();

  const [noticia, setNoticia] = useState({
    titulo: "",
    subtitulo: "",
    descripcion: "",
    contenido: "",
    categoria: "tecnologia",
    url: "",
    estado: "En Revision",
  });

  useEffect(() => {
    const cargarNoticia = async () => {
      try {
        const data = await obtenerNoticiaPorId(id);
        if (data) setNoticia(data);
      } catch (error) {
        console.error("Error cargando noticia:", error);
      }
    };
    cargarNoticia();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNoticia((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      noticia.estado="En Revision";
      await actualizarNoticia(id, noticia);
      alert("Noticia actualizada correctamente 😊");
      navigate("/reportero/Historial"); // regresar al historial
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la noticia ❌");
    }
  };

  return (
    <main className="mainCrearNoticia">
      <h2>Editar Noticia</h2>
      <div className="formularioNoticia">
        <form onSubmit={handleSubmit}>
          <label htmlFor="titulo">Titulo</label>
          <input
            type="text"
            id="titulo"
            value={noticia.titulo}
            onChange={handleChange}
            required
          />

          <label htmlFor="subtitulo">Subtitulo</label>
          <input
            type="text"
            id="subtitulo"
            value={noticia.subtitulo}
            onChange={handleChange}
          />

          <label htmlFor="descripcion">Descripcion</label>
          <input
            type="text"
            id="descripcion"
            value={noticia.descripcion}
            onChange={handleChange}
          />

          <label htmlFor="contenido">Contenido</label>
          <textarea
            id="contenido"
            value={noticia.contenido}
            onChange={handleChange}
          />

          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={noticia.categoria}
            onChange={handleChange}
          >
            <option value="tecnologia">Tecnología</option>
            <option value="politica">Política</option>
            <option value="deportes">Deportes</option>
            <option value="cultura">Cultura</option>
            <option value="salud">Salud</option>
            <option value="negocio">Negocio</option>
          </select>

          <label htmlFor="url">Enlace relacionado</label>
          <input
            type="url"
            id="url"
            value={noticia.url}
            onChange={handleChange}
            required
          />

          <button type="submit">Actualizar Noticia</button>
        </form>
      </div>
    </main>
  );
};

export default EditarNoticia;
