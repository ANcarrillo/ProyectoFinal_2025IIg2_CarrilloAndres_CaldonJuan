import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";

const CartNew = ({ noticia }) => {
  const navigate = useNavigate();

  const verNoticia = () => {
    navigate(`/noticia/${noticia.id}`);
  };

  return (
    <Card sx={{ width: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={
            noticia.url
              ? noticia.url
              : "https://ahrefs.com/blog/wp-content/uploads/2023/10/image12-5.png"
          }
          alt="imagen de la noticia"
        />
        <CardContent>
          <Typography gutterBottom component="div">
            {noticia.categoria}
          </Typography>
          <Typography gutterBottom component="div" sx={{ fontSize: "1.5rem" }}>
            {noticia.descripcion}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {noticia.contenido.split(" ").slice(0, 100).join(" ") + " ..."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={verNoticia}>
          Conoce más de esta noticia →
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartNew;
