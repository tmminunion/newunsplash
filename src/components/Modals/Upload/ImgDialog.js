import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2, Image as ImageIcon } from "lucide-react";
import styled from "styled-components";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(2, 6, 23, 0.95);
  backdrop-filter: blur(12px);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 60vh;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const UploadStatus = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--text-primary);
  
  h2 {
    font-size: 24px;
    font-family: "Outfit";
  }
  
  p {
    color: var(--text-secondary);
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const ImgDialog = ({ img, onClose }) => {
  return (
    <AnimatePresence>
      {img && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Header>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <ImageIcon size={20} style={{ color: "var(--primary)" }} />
              <span style={{ fontWeight: "600", fontSize: "16px" }}>Final Preview</span>
            </div>
            <CloseButton onClick={onClose}>
              <X size={20} />
            </CloseButton>
          </Header>
          
          <Content>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <PreviewImage src={img} alt="Cropped preview" />
            </motion.div>
            
            <UploadStatus>
              <div style={{ background: "rgba(251, 191, 36, 0.1)", padding: "16px", borderRadius: "50%", marginBottom: "10px" }}>
                <Loader2 size={32} className="spin" style={{ color: "var(--primary)" }} />
              </div>
              <h2>Sedang Mengupload...</h2>
              <p>Mohon tunggu sebentar, kami sedang mengirimkan karya seni Anda ke server.</p>
            </UploadStatus>
          </Content>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ImgDialog;
