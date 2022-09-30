import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ClientOnly = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return children;
};

export default ClientOnly;

ClientOnly.propTypes = {
  children: PropTypes.node,
};
