import { db } from "./config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const obtenerNoticiasPorCategoria = async (nombreCategoria) => {
  try {
    const noticiasRef = collection(db, "Noticias");
    const q = query(noticiasRef, where("categoria", "==", nombreCategoria));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else {
      return []; // No hay noticias para esa categoría
    }
  } catch (error) {
    console.error("Error al obtener noticias:", error);
    throw error;
  }
};
