import React from "react";

const Footer = () => {
  return (
    <div class='footer-area section-padding-100-0'>
      <div className='copywrite-area'>
        <div className='container'>
          <div class='row'>
            <div class='col-12'>
              <div class='copywrite-content d-flex flex-wrap justify-content-between align-items-center'>
                <a href='https://bungtemin.net/' class='footer-logo'>
                  <img
                    src='https://bungtemin.net/assets/img/core-img/logoor.png'
                    alt=''
                  />
                </a>

                <p class='copywrite-text'>
                  <a href='https://bungtemin.net/'>
                    Copyright &copy; All rights reserved | Powered{" "}
                    <i class='fa fa-heart-o' aria-hidden='true'></i> by
                    Bungtemin.net
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
