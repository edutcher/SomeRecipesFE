import React, { useRef } from "react";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";
import { Box, Button } from "@material-ui/core";
import "cropperjs/dist/cropper.css";

export default function UploadArea(props) {
  const cropperRef = useRef();

  const {
    setPhotoBlob,
    setCroppedImage,
    previewSource,
    setPreviewSource,
    handleFileInput,
  } = props;

  const onCrop = () => {
    const imageElement = cropperRef.current;
    const cropper = imageElement.cropper;
    cropper.getCroppedCanvas().toBlob((blob) => setPhotoBlob(blob));
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
  };

  const handleClear = () => {
    setPreviewSource(null);
    setCroppedImage(null);
  };

  return (
    <Box>
      {previewSource ? (
        <Box>
          <Cropper
            src={props.previewSource}
            style={{ height: 400, width: "100%" }}
            // Cropper.js options
            initialAspectRatio={1}
            guides={false}
            crop={onCrop}
            autoCrop={false}
            ref={cropperRef}
            zoomOnWheel={true}
          />
          <Button onClick={handleClear}>Clear</Button>
        </Box>
      ) : (
        <Dropzone onDrop={handleFileInput}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()} style={{ borderStyle: "dashed" }}>
                <input {...getInputProps()} />
                <p style={{ marginLeft: "10px", height: "100px" }}>
                  Drag 'n' drop your photo here, or click to select a photo
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      )}
    </Box>
  );
}
