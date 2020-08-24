import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';

import { Container } from './styles';

import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastContainerProps {
  message: ToastMessage;
  style: object;
}

const Toast: React.FC<ToastContainerProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  const icons = {
    info: <FiInfo size={24} />,
    success: <FiCheckCircle size={24} />,
    error: <FiAlertCircle size={24} />,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      type={message.type}
      hasDescription={Number(!!message.description)}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>

        <p>{message.description && message.description}</p>
      </div>

      <button onClick={() => removeToast(message.id)} type="submit">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
