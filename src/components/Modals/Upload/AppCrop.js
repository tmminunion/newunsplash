import React, { useState, useCallback, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";
import { 
  Upload, 
  Crop, 
  RotateCcw, 
  ZoomIn, 
  Image as ImageIcon, 
  Check, 
  X, 
  Loader2,
  Maximize
} from "lucide-react";
import { getOrientation } from "get-orientation/browser";
import ImgDialog from "./ImgDialog";
import { getCroppedImg, getRotatedImage } from "./canvasUtils";
import { useDropzone } from "react-dropzone";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const DropzoneContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  height: 400px;
  border: 2px dashed ${props => props.isDragActive ? "var(--primary)" : "var(--border-glass)"};
  border-radius: 12px;
  background: rgba(30, 41, 59, 0.3);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary);
    background: rgba(30, 41, 59, 0.5);
    color: var(--text-primary);
  }
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  margin-top: 20px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: var(--primary);
  width: ${props => props.value}%;
  transition: width 0.3s ease;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: ${shimmer} 1.5s infinite;
  }
`;

const ORIENTATION_TO_ANGLE = { 3: 180, 6: 90, 8: -90 };

const Demo = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onFileChange = async (file) => {
    setLoading(true);
    setProgress(0);
    
    // Simulate analyzer progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 200);

    let imageDataUrl = await readFile(file);
    try {
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }
    } catch (e) {
      console.warn("failed to detect the orientation");
    }

    setTimeout(() => {
      setImageSrc(imageDataUrl);
      setLoading(false);
      clearInterval(interval);
    }, 1500);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => acceptedFiles.map(onFileChange),
  });

  return (
    <div style={{ color: "var(--text-primary)", padding: "20px" }}>
      <AnimatePresence mode="wait">
        {!imageSrc && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <h2 style={{ marginBottom: "20px", textAlign: "center", fontFamily: "Outfit" }}>Upload & Polish</h2>
            <DropzoneContainer {...getRootProps()} isDragActive={isDragActive}>
              <input {...getInputProps()} />
              <div style={{ background: "rgba(251, 191, 36, 0.1)", color: "var(--primary)", padding: "20px", borderRadius: "50%", marginBottom: "20px" }}>
                <Upload size={48} />
              </div>
              <p style={{ fontSize: "18px", fontWeight: "500", marginBottom: "8px" }}>
                Drag & drop your masterpiece here
              </p>
              <p style={{ fontSize: "14px", opacity: 0.7 }}>
                or click to browse your files
              </p>
            </DropzoneContainer>
          </motion.div>
        )}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: "center", padding: "60px 20px" }}
          >
            <Loader2 size={48} className="spin" style={{ color: "var(--primary)", marginBottom: "24px" }} />
            <h3 style={{ marginBottom: "12px", fontFamily: "Outfit" }}>Analyzing Image Intelligence</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>
              Our AI is scanning the image for quality and tags...
            </p>
            <div style={{ maxWidth: "400px", margin: "0 auto" }}>
              <ProgressTrack>
                <ProgressFill value={progress} />
              </ProgressTrack>
              <p style={{ marginTop: "12px", fontSize: "14px", fontWeight: "600", color: "var(--primary)" }}>
                {Math.round(progress)}%
              </p>
            </div>
          </motion.div>
        )}

        {imageSrc && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div style={{ position: "relative", height: "400px", background: "#0f172a", borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
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
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center", justifyContent: "space-between", padding: "20px", background: "rgba(0,0,0,0.2)", borderRadius: "12px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.08)", padding: "10px 16px", borderRadius: "10px", border: "1px solid var(--border-glass)" }}>
                  <Maximize size={18} style={{ color: "var(--primary)" }} />
                  <span style={{ fontSize: "14px", fontWeight: "600", marginRight: "4px" }}>Ratio:</span>
                  <select 
                    value={aspectRatio} 
                    onChange={(e) => setAspectRatio(parseFloat(e.target.value))}
                    style={{ 
                      background: "rgba(15, 23, 42, 0.8)", 
                      border: "1px solid rgba(251, 191, 36, 0.3)", 
                      color: "white", 
                      outline: "none", 
                      cursor: "pointer",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "600"
                    }}
                  >
                    <option value={1} style={{ background: "#1e293b" }}>1:1 (Square)</option>
                    <option value={4/3} style={{ background: "#1e293b" }}>4:3 (Standard)</option>
                    <option value={16/9} style={{ background: "#1e293b" }}>16:9 (Wide)</option>
                    <option value={3/2} style={{ background: "#1e293b" }}>3:2 (Classic)</option>
                    <option value={5/4} style={{ background: "#1e293b" }}>5:4 (Portrait)</option>
                  </select>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.08)", padding: "10px 16px", borderRadius: "10px", border: "1px solid var(--border-glass)" }}>
                  <ZoomIn size={18} style={{ color: "var(--primary)" }} />
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e) => setZoom(e.target.value)}
                    style={{ width: "120px", accentColor: "var(--primary)", cursor: "pointer" }}
                  />
                </div>
              </div>


              <div style={{ display: "flex", gap: "12px" }}>
                <button 
                  onClick={() => setImageSrc(null)}
                  style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "10px 20px", borderRadius: "10px", cursor: "pointer", fontWeight: "600" }}
                >
                  Cancel
                </button>
                <button 
                  onClick={showCroppedImage}
                  style={{ background: "var(--primary)", border: "none", color: "var(--bg-main)", padding: "10px 24px", borderRadius: "10px", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Check size={20} /> Finish & Upload
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ImgDialog img={croppedImage} onClose={() => setCroppedImage(null)} />
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

export default Demo;
