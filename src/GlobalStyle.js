import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
font-size:18px;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
 a:link { text-decoration: none; }
a:visited { text-decoration: none; }
a:hover { text-decoration: none; }
a:active { text-decoration: none; }

.footer-area {
    position: relative;
    z-index: 1;
    background-color: #021c3c;
}

.footer-area .single-footer-widget {
    position: relative;
    z-index: 1;
}

.footer-area .single-footer-widget .widget-title {
    font-size: 18px;
    color: #ffbb38;
    margin-bottom: 40px;
    font-weight: 400;
}

.footer-area .single-footer-widget ul li a {
    display: block;
    color: #ffffff;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 30px;
    position: relative;
    z-index: 1;
    padding-left: 23px;
}

.footer-area .single-footer-widget ul li a::before {
    content: '';
    width: 8px;
    height: 8px;
    top: 7px;
    left: 0;
    border-radius: 50%;
    background-color: #ffbb38;
    position: absolute;
    z-index: 1;
}

.footer-area .single-footer-widget ul li a:hover,
.footer-area .single-footer-widget ul li a:focus {
    color: #ffbb38;
}

.footer-area .single-footer-widget ul li:last-child a {
    margin-bottom: 0;
}

.footer-area .copywrite-area {
    position: relative;
    z-index: 1;
    border-top: 1px solid #3c4450;
    padding: 30px 0;
}

.footer-area .copywrite-area .copywrite-text {
    font-size: 14px;
    margin-bottom: 0;
    color: #636b75;
    font-weight: 400;
}

@media only screen and (max-width: 767px) {
    .footer-area .copywrite-area .copywrite-text {
        margin-top: 30px;
    }
}

@media only screen and (min-width: 480px) and (max-width: 767px) {
    .footer-area .copywrite-area .copywrite-text {
        margin-top: 0;
    }
}

.footer-area .copywrite-area .copywrite-text a {
    color: #636b75;
    font-size: 14px;
    font-weight: 400;
}

.footer-area .copywrite-area .copywrite-text a:hover,
.footer-area .copywrite-area .copywrite-text a:focus {
    color: #ffbb38;
}

`;

export default GlobalStyle;
