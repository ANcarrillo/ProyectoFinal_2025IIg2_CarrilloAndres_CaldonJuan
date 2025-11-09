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
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../Context/Context";
import { obtenerNoticiasPorUsuario } from "../../Data/Noticias";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import DisabledVisibleIcon from "@mui/icons-material/DisabledVisible";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "titulo", label: "Título", minWidth: 200 },
  {
    id: "fecha",
    label: "Fecha de envío",
    minWidth: 150,
    align: "center",
    format: (value) =>
      value?.toDate ? value.toDate().toLocaleDateString("es-CO") : value,
  },
  { id: "categoria", label: "Categoría", minWidth: 150, align: "center" },
  { id: "estado", label: "Estado", minWidth: 120, align: "center" },
  { id: "acciones", label: "Acciones", minWidth: 150, align: "center" },
];

const HistorialNoticia = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [conteo, setConteo] = React.useState({
    publicadas: 0,
    enRevision: 0,
    rechazadas: 0,
  });

  React.useEffect(() => {
    if (!loading && user) {
      const cargarNoticias = async () => {
        try {
          const datos = await obtenerNoticiasPorUsuario(user.uid);
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
          console.error(error);
        }
      };
      cargarNoticias();
    }
  }, [user, loading]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditar = (id) => {
    navigate(`/reportero/EditarNoticia/${id}`);
  };

  return (
    <div style={{ width: "85%", margin: "0 auto", padding: 30 }}>
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
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
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
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleEditar(row.id)}
                            >
                              Editar
                            </Button>
                          </TableCell>
                        );
                      }

                      if (column.id === "estado") {
                        let color = "grey";
                        if (value === "Publicado") color = "green";
                        else if (value === "En Revision") color = "orange";
                        else if (value === "rechazada") color = "red";

                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{ fontWeight: "bold", color }}
                          >
                            {value}
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
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default HistorialNoticia;
