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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { runfile } from "../../../tensor";
import RenderIf from "../../../utils/RenderIf";

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

const Demo = ({ classes }) => {
  const [imageSrc, setImageSrc] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [nameImage, setnameImage] = useState(null);

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
    setnameImage(null);
  }, []);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setnameImage(runfile(file));
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
    }
  };
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const onAspectRatioChange = (event) => {
    setAspectRatio(event.target.value);
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
          <div className={classes.controls}>
            <div className={classes.sliderContainer}>
              <FormControl component='fieldset'>
                <RadioGroup
                  row
                  aria-label='position'
                  name='position'
                  defaultValue='top'
                  onChange={onAspectRatioChange}
                >
                  <FormControlLabel
                    value={1 / 1}
                    control={<Radio color='primary' />}
                    label='1:1'
                    labelPlacement='bottom'
                  />{" "}
                  <FormControlLabel
                    value={5 / 4}
                    control={<Radio color='primary' />}
                    label='5:4'
                    labelPlacement='bottom'
                  />{" "}
                  <FormControlLabel
                    value={4 / 3}
                    control={<Radio color='primary' />}
                    label='4:3'
                    labelPlacement='bottom'
                  />{" "}
                  <FormControlLabel
                    value={1.9 / 1}
                    control={<Radio color='primary' />}
                    label='1.9:1'
                    labelPlacement='bottom'
                  />{" "}
                  <FormControlLabel
                    value={9 / 16}
                    control={<Radio color='primary' />}
                    label='9:16'
                    labelPlacement='bottom'
                  />{" "}
                  <FormControlLabel
                    value={3 / 2}
                    control={<Radio color='primary' />}
                    label='3:2'
                    labelPlacement='bottom'
                  />{" "}
                  <FormControlLabel
                    value={5 / 3}
                    control={<Radio color='primary' />}
                    label='5:3'
                    labelPlacement='bottom'
                  />{" "}
                  <FormControlLabel
                    value={16 / 9}
                    control={<Radio color='primary' />}
                    label='16:9'
                    labelPlacement='bottom'
                  />{" "}
                  <FormControlLabel
                    value={3 / 1}
                    control={<Radio color='primary' />}
                    label='3:1'
                    labelPlacement='bottom'
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className={classes.controls}>
            <div className={classes.sliderContainer}>
              <Typography
                variant='overline'
                classes={{ root: classes.sliderLabel }}
              >
                Zoom
              </Typography>
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
            <div className={classes.sliderContainer}>
              <Typography
                variant='overline'
                classes={{ root: classes.sliderLabel }}
              >
                Rotation
              </Typography>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby='Rotation'
                classes={{ root: classes.slider }}
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </div>
            <RenderIf isTrue={nameImage}>
              <Button
                onClick={showCroppedImage}
                variant='contained'
                color='primary'
                classes={{ root: classes.cropButton }}
              >
                Upload Photo
              </Button>
            </RenderIf>
          </div>
          <ImgDialog img={croppedImage} onClose={onClose} />
        </React.Fragment>
      ) : (
        <input type='file' onChange={onFileChange} accept='image/*' />
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
