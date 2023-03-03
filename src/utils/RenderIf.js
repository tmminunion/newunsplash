const RenderIf = ({ children, isTrue, isFalse }) => {
  return isTrue ? children : isFalse || null;
};

export default RenderIf;
