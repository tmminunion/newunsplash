import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { getOrientation } from "get-orientation/browser";
import ImgDialog from "./ImgDialog";
import { getCroppedImg, getRotatedImage } from "./canvasUtils";
import { styles } from "./styles";
import FormControl from "@material-ui/core/FormControl";
import runfile from "../../../tensor";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "red";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "gold";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-top: 30px;
  padding: 60px;
  height: 400px;
  border-width: 3px;
  color: red;
  border-radius: 4px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #c0c0c0;

  outline: none;
  transition: border 0.24s ease-in-out;
`;
const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};
const fileTypes = ["JPEG", "PNG", "GIF"];
const Demo = ({ classes }) => {
  const [imageSrc, setImageSrc] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [nameImage, setnameImage] = useState(false);
  const [loadingnya, setloadingnya] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );

      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
    setnameImage(false);
  }, []);

  const onFileChange = async (file) => {
    //   const file = e.target.files[0];

    const dodol = await runfile(file);
    if (dodol) {
      console.log("ready gambar");

      setnameImage(true);
    } else console.log("note");
    let imageDataUrl = await readFile(file);

    try {
      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }
    } catch (e) {
      console.warn("failed to detect the orientation");
    }

    setImageSrc(imageDataUrl);
  };
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const onAspectRatioChange = (event) => {
    setAspectRatio(event.target.value);
  };
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/*": [] },
      onDrop: (acceptedFiles) => {
        setloadingnya(true);
        acceptedFiles.map((file) => onFileChange(file));
      },
    });
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const hadleskip = (event) => {
    setloadingnya(false);
    setnameImage(true);
  };
  return (
    <div>
      {imageSrc ? (
        <React.Fragment>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>{" "}
          <Typography align='center'>
            {localStorage.getItem("namatit")}
          </Typography>
          <div className={classes.controls}>
            <div className={classes.sliderContainer}>
              <div>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='demo-simple-select-autowidth'
                    value={aspectRatio}
                    onChange={onAspectRatioChange}
                    autoWidth
                    label='Age'
                  >
                    <MenuItem value={1 / 1}>1:1</MenuItem>
                    <MenuItem value={1 / 2}>1:2</MenuItem>
                    <MenuItem value={1 / 3}>1:3</MenuItem>
                    <MenuItem value={2 / 1}>2:1</MenuItem>
                    <MenuItem value={5 / 4}>5:4</MenuItem>
                    <MenuItem value={3 / 4}>3:4</MenuItem>
                    <MenuItem value={4 / 3}>4:3</MenuItem>
                    <MenuItem value={1.9 / 1}>1.9:1</MenuItem>
                    <MenuItem value={9 / 6}>9:6</MenuItem>
                    <MenuItem value={3 / 2}>3:2</MenuItem>
                    <MenuItem value={5 / 3}>5:3</MenuItem>
                    <MenuItem value={3 / 5}>3:5</MenuItem>
                    <MenuItem value={16 / 9}>16:9</MenuItem>
                    <MenuItem value={3 / 1}>3:1</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby='Zoom'
                classes={{ root: classes.slider }}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>

            {nameImage ? (
              <Button
                onClick={showCroppedImage}
                variant='contained'
                color='primary'
                classes={{ root: classes.cropButton }}
              >
                Upload Photo
              </Button>
            ) : null}
          </div>
          <ImgDialog img={croppedImage} onClose={onClose} />
        </React.Fragment>
      ) : (
        <>
          <div className='App'>
            <h1>Upload file</h1>
            {/* <input type='file' onChange={onFileChange} accept='image/*' />

            */}
            {!loadingnya ? (
              <div className='container'>
                <Container
                  {...getRootProps({ isFocused, isDragAccept, isDragReject })}
                >
                  <input {...getInputProps()} />
                  <p>
                    Drag 'n' drop file kesini, atau klik disini untuk upload
                  </p>
                </Container>
              </div>
            ) : (
              <Box sx={{ width: "100%" }}>
                <Typography align='center'>
                  <p>Disini Kami Menganalisa Gambar dengan Kecerdasan Buatan</p>
                  <p>Sedang Menganalisa gambar ....</p>
                </Typography>
                <p></p>
                <LinearProgress
                  variant='buffer'
                  value={progress}
                  valueBuffer={buffer}
                />
              </Box>
            )}
          </div>
        </>
      )}
    </div>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

const StyledDemo = withStyles(styles)(Demo);

export default StyledDemo;
