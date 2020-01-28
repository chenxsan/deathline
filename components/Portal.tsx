import ReactDOM from 'react-dom';
import useClient from '../hooks/useClient';
export default function Portal({ children }) {
  const client = useClient();
  if (!client) return null;
  return ReactDOM.createPortal(children, document.getElementById('modal'));
}
