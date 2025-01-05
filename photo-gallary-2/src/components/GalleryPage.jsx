import React from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Button, IconButton, Typography, Box, Grid } from '@mui/material';

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

      <Box sx={{ mt: 4 }}>
          {imageList.map((image, index) => (
            <img key={index} src={image} alt={`uploaded-${index}`} style={{ width: '100%' }} />
          ))}
      </Box>
      
      {/* {imageList.length === 0 ? (
        <Typography variant="body1" align="center" style={{ marginTop: "20px" }}>
          No images uploaded. Please upload images on the Upload Page.
        </Typography>
      ) : (
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          {imageList.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <div
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={image}
                  alt={`Uploaded ${index}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      )} */}
    </div>
  );
};

export default GalleryPage;
