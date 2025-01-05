import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const GalleryPage = ({ imageList }) => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Image Gallery
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        style={{ display: "block", margin: "10px auto" }}
      >
        Back to Upload
      </Button>
      {imageList.length === 0 ? (
        <Typography variant="body1" align="center" style={{ marginTop: "20px" }}>
          No imageList uploaded. Please upload imageList on the Upload Page.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {imageList.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <div
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={image}
                  alt={`Uploaded ${index}`}
                  style={{ width: "100%", display: "block" }}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default GalleryPage;
