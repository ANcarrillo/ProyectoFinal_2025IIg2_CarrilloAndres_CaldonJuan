import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { useAuth } from "../../Context/Context";
import { obtenerTodasLasNoticias, actualizarEstadoNoticia } from "../../Data/Noticias";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import DisabledVisibleIcon from "@mui/icons-material/DisabledVisible";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "titulo", label: "Título", minWidth: 200 },
  { id: "autor", label: "Autor", minWidth: 150, align: "center" },
  {
    id: "fecha",
    label: "Fecha de envío",
    minWidth: 150,
    align: "center",
    format: (value) =>
      value?.toDate ? value.toDate().toLocaleDateString("es-CO") : value,
  },
  { id: "categoria", label: "Categoría", minWidth: 120, align: "center" },
  { id: "estado", label: "Estado", minWidth: 130, align: "center" },
  { id: "acciones", label: "Acciones", minWidth: 250, align: "center" },
];

const HistorialNoticiaEditor = () => {
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [conteo, setConteo] = React.useState({
    publicadas: 0,
    enRevision: 0,
    rechazadas: 0,
  });

  const cargarNoticias = async () => {
    try {
      // Obtener TODAS las noticias (necesitas crear esta función)
      const datos = await obtenerTodasLasNoticias();
      setRows(datos);

      // Contar noticias por estado
      const conteoEstados = datos.reduce(
        (acc, noticia) => {
          const estado = noticia.estado;
          if (estado === "Publicado") acc.publicadas += 1;
          else if (estado === "En Revision") acc.enRevision += 1;
          else if (estado === "rechazada") acc.rechazadas += 1;
          return acc;
        },
        { publicadas: 0, enRevision: 0, rechazadas: 0 }
      );

      setConteo(conteoEstados);
    } catch (error) {
      console.error("Error al cargar noticias:", error);
    }
  };

  React.useEffect(() => {
    if (!loading && user && role === "Editor") {
      cargarNoticias();
    }
  }, [user, role, loading]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditar = (id) => {
    navigate(`/editor/EditarNoticia/${id}`);
  };

  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      await actualizarEstadoNoticia(id, nuevoEstado);
      // Recargar las noticias después de actualizar
      await cargarNoticias();
      alert(`Noticia ${nuevoEstado.toLowerCase()} exitosamente`);
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      alert("Error al actualizar el estado de la noticia");
    }
  };

  const getEstadoChip = (estado) => {
    const configs = {
      Publicado: { color: "success", icon: <CheckCircleIcon /> },
      "En Revision": { color: "warning", icon: <PublicOffIcon /> },
      rechazada: { color: "error", icon: <CancelIcon /> },
    };

    const config = configs[estado] || { color: "default", icon: null };

    return (
      <Chip
        label={estado}
        color={config.color}
        icon={config.icon}
        size="small"
      />
    );
  };

  if (role !== "Editor") {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          No tienes permisos para acceder a esta página
        </Typography>
      </div>
    );
  }

  return (
    <div style={{ width: "90%", margin: "0 auto", padding: 30 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Panel de Editor - Gestión de Noticias
      </Typography>

      {/* Tarjetas de conteo */}
     <Grid
        container
        spacing={2}
        sx={{ marginBottom: 2, justifyContent: "center" }}
      >
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{ padding: 2, textAlign: "center", borderColor: "#d0f0c0" }}
          >
            <PublicIcon sx={{ fontSize: 40, color: "green" }} />
            <Typography variant="h6">Publicadas</Typography>
            <Typography variant="h4">{conteo.publicadas}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{ padding: 2, textAlign: "center", borderColor: "#fff2cc" }}
          >
            <PublicOffIcon sx={{ fontSize: 40, color: "orange" }} />
            <Typography variant="h6">En Revisión</Typography>
            <Typography variant="h4">{conteo.enRevision}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{ padding: 2, textAlign: "center", borderColor: "#f4cccc" }}
          >
            <DisabledVisibleIcon sx={{ fontSize: 40, color: "red" }} />
            <Typography variant="h6">Rechazadas</Typography>
            <Typography variant="h4">{conteo.rechazadas}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabla de noticias */}
      <Paper elevation={3} sx={{ overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#1976d2",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      if (column.id === "acciones") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <ButtonGroup size="small" variant="outlined">
                              {row.estado !== "Publicado" && (
                                <Button
                                  color="success"
                                  onClick={() =>
                                    handleCambiarEstado(row.id, "Publicado")
                                  }
                                  startIcon={<CheckCircleIcon />}
                                >
                                  Publicar
                                </Button>
                              )}
                              {row.estado !== "rechazada" && (
                                <Button
                                  color="error"
                                  onClick={() =>
                                    handleCambiarEstado(row.id, "rechazada")
                                  }
                                  startIcon={<CancelIcon />}
                                >
                                  Rechazar
                                </Button>
                              )}
                              <Button
                                color="primary"
                                onClick={() => handleEditar(row.id)}
                                startIcon={<EditIcon />}
                              >
                                Editar
                              </Button>
                            </ButtonGroup>
                          </TableCell>
                        );
                      }

                      if (column.id === "estado") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {getEstadoChip(value)}
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
        />
      </Paper>
    </div>
  );
};

export default HistorialNoticiaEditor;