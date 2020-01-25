import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
export default function Portal({ children }) {
  const [target, setTarget] = useState(null);
  useEffect(() => {
    setTarget(document.getElementById('modal'));
  }, []);
  if (target === null) return null;
  return ReactDOM.createPortal(children, target);
}
