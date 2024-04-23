import React from 'react';

const AlertMessage = ({ title, message, style }) => {
    return (
      <div className={`alert ${style}`}>
        <h3>{title}</h3>
        <p>{message}</p>
        <style jsx>{`
          .alert {
            padding: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #f8f8f8;
            margin-bottom: 15px;
          }
          .success {
            background-color: #dff0d8;
            border-color: #d0e9c6;
            color: #3c763d;
          }
          .info {
            background-color: #d9edf7;
            border-color: #bce8f1;
            color: #31708f;
          }
          .warning {
            background-color: #fcf8e3;
            border-color: #faebcc;
            color: #8a6d3b;
          }
          .danger {
            background-color: #f2dede;
            border-color: #ebccd1;
            color: #a94442;
          }
        `}</style>
      </div>
    );
  };
  

export default AlertMessage;