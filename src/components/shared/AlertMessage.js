import React from "react";
import PropTypes from "prop-types";

function AlertMessage({ message, type }) {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
}

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string, // 'info', 'success', 'warning', 'danger', etc.
};

AlertMessage.defaultProps = {
  type: "info",
};

export default AlertMessage;
