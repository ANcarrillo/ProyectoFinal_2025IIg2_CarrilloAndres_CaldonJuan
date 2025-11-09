import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PublicIcon from "@mui/icons-material/Public";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LogoutIcon from "@mui/icons-material/Logout";
import { LogoutUser } from "../../Data/Login";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavReportero = () => {
  const navigate = useNavigate();

  const cerrarSeccion = () => {
    LogoutUser();
    navigate("/login");
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#102847",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingY: 2,
      }}
      role="presentation"
    >
      {/* ---- Sección principal ---- */}
      <List>
        <ListItemText
          sx={{
            "& .MuiListItemText-primary": {
              marginLeft: 5,
              fontSize: 25,
              fontWeight: "bold",
            },
          }}
          primary="Reportero"
        />
        <Divider sx={{ backgroundColor: "white", opacity: 0.3 }} />
        <br />

        <ListItemButton
          sx={{
            "&:hover": { backgroundColor: "#1a3a6b" },
          }}
        >
          <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
            <ApartmentIcon sx={{ fontSize: 30 }} />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>

        <ListItemButton
          sx={{
            "&:hover": { backgroundColor: "#1a3a6b" },
          }}
        >
          <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
            <PublicIcon sx={{ fontSize: 30 }} />
          </ListItemIcon>
          <ListItemText primary="Publicaciones" />
        </ListItemButton>

        <ListItemButton
          sx={{
            "&:hover": { backgroundColor: "#1a3a6b" },
          }}
        >
          <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
            <ManageSearchIcon sx={{ fontSize: 30 }} />
          </ListItemIcon>
          <ListItemText primary="Historial" />
        </ListItemButton>
        <Link to={"/reportero/CrearNoticia"}>
          <ListItemButton
            sx={{
              "&:hover": { backgroundColor: "#1a3a6b" },
            }}
          >
            <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
              <NewspaperIcon sx={{ fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="Nueva Noticia" />
          </ListItemButton>
        </Link>
      </List>

      {/* ---- Botón de cerrar sesión ---- */}
      <Box>
        <Divider sx={{ backgroundColor: "white", opacity: 0.3, mb: 1 }} />
        <ListItemButton
          sx={{
            "&:hover": { backgroundColor: "#c62828" },
            color: "white",
          }}
          onClick={() => {
            cerrarSeccion();
          }}
        >
          <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
            <LogoutIcon sx={{ fontSize: 30 }} />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default NavReportero;
