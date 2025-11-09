import { db } from "./config";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export const enviarRevision = async (noticia) => {
  try {
    const docRef = await addDoc(collection(db, "Noticias"), {
      ...noticia,
      fecha: new Date(),
    });
    console.log("Noticia agregada con ID:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error al enviar la noticia:", error);
    throw error;
  }
};
export const obtenerNoticiasPorUsuario = async (uid) => {
  try {
    const noticiasRef = collection(db, "Noticias");
    const q = query(noticiasRef, where("autor", "==", uid));
    const querySnapshot = await getDocs(q);
    const noticias = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return noticias;
  } catch (error) {
    console.error("Error al obtener las noticias del usuario:", error);
    throw error;
  }
};
export const obtenerNoticiaPorId = async (id) => {
  try {
    const docRef = doc(db, "Noticias", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("No se encontró la noticia con ID:", id);
      return null;
    }

    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    console.error("Error al obtener la noticia:", error);
    throw error;
  }
};
export const actualizarNoticia = async (id, datosActualizados) => {
  try {
    const docRef = doc(db, "Noticias", id);
    await updateDoc(docRef, {
      ...datosActualizados,
      fecha: new Date(), // opcional: actualizar la fecha de edición
    });
    console.log("Noticia actualizada con ID:", id);
    return true;
  } catch (error) {
    console.error("Error al actualizar la noticia:", error);
    throw error;
  }
};
