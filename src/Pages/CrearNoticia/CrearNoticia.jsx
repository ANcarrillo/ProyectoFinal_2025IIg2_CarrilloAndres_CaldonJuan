import React, { useEffect, useState } from "react";
import "./CrearNoticia.css";
import { enviarRevision, obtenerNoticiaPorId, actualizarNoticia } from "../../Data/Noticias";
import { useAuth } from "../../Context/Context";

const CrearNoticia = ({ noticiaId }) => {
  const { user, loading } = useAuth();
  const [noticia, setNoticia] = useState({
    titulo: "",
    subtitulo: "",
    descripcion: "",
    contenido: "",
    categoria: "tecnologia",
    url: "",
    autor: user?.uid,
  });

  const [existe, setExiste] = useState(false);

  // Cargar noticia si existe noticiaId
  useEffect(() => {
    if (noticiaId) {
      const cargarNoticia = async () => {
        try {
          const data = await obtenerNoticiaPorId(noticiaId);
          if (data) {
            setNoticia(data);
            setExiste(true);
          }
        } catch (error) {
          console.error("Error al cargar la noticia:", error);
        }
      };
      cargarNoticia();
    }
  }, [noticiaId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNoticia((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const noticiaConAutor = { ...noticia, autor: user?.uid };

      if (existe) {
        // Actualizar noticia existente
        await actualizarNoticia(noticiaId, noticiaConAutor);
        alert("Noticia actualizada correctamente 😊");
      } else {
        // Crear nueva noticia
        await enviarRevision(noticiaConAutor);
        alert("Noticia enviada correctamente 😊");
      }

      // Limpiar formulario si es nueva
      if (!existe) {
        setNoticia({
          titulo: "",
          subtitulo: "",
          descripcion: "",
          contenido: "",
          categoria: "tecnologia",
          url: "",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Error al enviar la noticia ❌");
    }
  };

  if (loading) return <p>Cargando usuario...</p>;

  return (
    <main className="mainCrearNoticia">
      <h2>{existe ? "Editar Noticia" : "Muestranos tu idea 😊"}</h2>
      <div className="formularioNoticia">
        <form onSubmit={handleSubmit}>
          <label htmlFor="titulo">Titulo</label>
          <input
            type="text"
            placeholder="Titulo de tu obra"
            id="titulo"
            value={noticia.titulo}
            onChange={handleChange}
            required
          />

          <label htmlFor="subtitulo">Subtitulo</label>
          <input
            type="text"
            id="subtitulo"
            placeholder="Un subtitulo descriptivo"
            value={noticia.subtitulo}
            onChange={handleChange}
          />

          <label htmlFor="descripcion">Descripcion</label>
          <input
            type="text"
            id="descripcion"
            placeholder="Describenos tu obra"
            value={noticia.descripcion}
            onChange={handleChange}
          />

          <label htmlFor="contenido">Contenido</label>
          <textarea
            id="contenido"
            placeholder="Muestranos tu investigacion"
            value={noticia.contenido}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="categoria">Categoría:</label>
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

          <label htmlFor="url">Enlace relacionado:</label>
          <input
            type="url"
            id="url"
            placeholder="https://ejemplo.com"
            value={noticia.url}
            onChange={handleChange}
            required
          />

          <button type="submit">{existe ? "Editar Noticia" : "Enviar revisión"}</button>
        </form>
      </div>
    </main>
  );
};

export default CrearNoticia;
