import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Upload, Image as ImageIcon } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import s from "./styles.module.scss";
import Modal from "@mui/material/Modal";
import { getImagesAPI, getnumAPI } from "../../api";
import ImagesGrid from "../../components/ImagesGrid";
import PageTitle from "../../utils/PageTitle";
import Modaluplod from "../../components/Modals/Upload";
import Form from "../../components/Form";
import Pagination from "@mui/material/Pagination";

const Home = () => {
  const [images, setImages] = useState([]);
  const [totimages, totsetImages] = useState(10);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [heroImage, setHeroImage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getImagesAPI(1).then((response) => {
      setImages(response.data);
      const randomImg = response.data[Math.floor(Math.random() * response.data.length)]?.filepath;
      setHeroImage(randomImg || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000");
    });
    getnumAPI(1).then((response) => {
      totsetImages(response.pagination.totalPages);
      setPage(1);
    });

    return () => setImages([]);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getImagesAPI(newPage).then((response) => {
      setImages(response.data);
      window.scrollTo({ top: 600, behavior: 'smooth' });
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <PageTitle title='Home'>
      <div className={s.hero_section}>
        <div className={s.hero_bg}>
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 1.5 }}
            className={s.hero_image_wrapper}
          >
            <img src={heroImage} alt="Hero Background" />
          </motion.div>
          <div className={s.hero_overlay} />
        </div>

        <div className="container">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={s.hero_content}
          >
            <motion.h1 variants={itemVariants} className={s.hero_title}>
              Capturing Moments, <br /> 
              <span>Sharing Inspiration.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className={s.hero_subtitle}>
              The internet’s source of freely-usable images. Powered by BT-Gallery contributors.
            </motion.p>

            <motion.div variants={itemVariants} className={s.hero_search}>
              <Form />
              <p className={s.trending}>
                Trending: <span>Nature, Architecture, Minimal, Portrait</span>
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className={s.hero_actions}>
              <button onClick={handleOpen} className={s.primary_btn}>
                <Upload size={18} />
                Upload Your Work
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className={s.gallery_container}>
        <div className="container">
          <div className={s.gallery_header}>
            <h2>Latest Submissions</h2>
            <div className={s.filter_tabs}>
              <button className={s.active}>Editorial</button>
              <button>Following</button>
              <button>Wallpapers</button>
            </div>
          </div>
        </div>
        
        <ImagesGrid images={images} />

        <div className={s.pagination_wrapper}>
          <div className='container'>
            <div className={s.pagination_inner}>
              <Pagination
                count={totimages}
                variant='outlined'
                shape='rounded'
                page={page}
                onChange={handleChangePage}
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Modaluplod onClose={handleClose} />
      </Modal>
    </PageTitle>
  );
};

export default Home;
