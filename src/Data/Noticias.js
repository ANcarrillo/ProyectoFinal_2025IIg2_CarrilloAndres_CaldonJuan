import { db } from "./config";
import { collection, addDoc, query, where } from "firebase/firestore";

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
    const noticias = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return noticias;
  } catch (error) {
    console.error("Error al obtener las noticias del usuario:", error);
    throw error;
  }
};
