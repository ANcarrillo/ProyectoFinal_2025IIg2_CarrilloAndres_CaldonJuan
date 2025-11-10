import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LogoutIcon from "@mui/icons-material/Logout";
import { LogoutUser } from "../../Data/Login";
import { useNavigate, Link } from "react-router-dom";

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
        height: "86.4vh",
        backgroundColor: "#0a3d62",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden", // Elimina scrollbars
      }}
      role="presentation"
    >
      {/* ---- Sección principal ---- */}
      <Box>
        <Box sx={{ padding: "24px 20px 16px" }}>
          <ListItemText
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: 28,
                fontWeight: "bold",
                letterSpacing: "-0.5px",
              },
            }}
            primary="Reportero"
          />
        </Box>

        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)", mb: 2 }} />

        <List sx={{ padding: "0 8px" }}>
          <Link
            to="/reportero/Historial"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton
              sx={{
                borderRadius: "8px",
                mb: 1,
                padding: "12px 16px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "&:active": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: 48 }}>
                <ManageSearchIcon sx={{ fontSize: 28 }} />
              </ListItemIcon>
              <ListItemText 
                primary="Historial"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: 16,
                    fontWeight: 500,
                  },
                }}
              />
            </ListItemButton>
          </Link>

          <Link
            to="/reportero/CrearNoticia"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton
              sx={{
                borderRadius: "8px",
                mb: 1,
                padding: "12px 16px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "&:active": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: 48 }}>
                <NewspaperIcon sx={{ fontSize: 28 }} />
              </ListItemIcon>
              <ListItemText 
                primary="Nueva Noticia"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: 16,
                    fontWeight: 500,
                  },
                }}
              />
            </ListItemButton>
          </Link>
        </List>
      </Box>

      {/* ---- Botón de cerrar sesión ---- */}
      <Box sx={{ padding: "8px" }}>
        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)", mb: 1 }} />
        <ListItemButton
          sx={{
            borderRadius: "8px",
            padding: "12px 16px",
            "&:hover": {
              backgroundColor: "#c62828",
            },
            "&:active": {
              backgroundColor: "#b71c1c",
            },
          }}
          onClick={cerrarSeccion}
        >
          <ListItemIcon sx={{ color: "white", minWidth: 48 }}>
            <LogoutIcon sx={{ fontSize: 28 }} />
          </ListItemIcon>
          <ListItemText 
            primary="Cerrar sesión"
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: 16,
                fontWeight: 500,
              },
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default NavReportero;