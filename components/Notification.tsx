import Portal from './Portal';
interface Props {
  msg: string;
  close: () => void;
}
export default function Notification({ msg, close }: Props) {
  return (
    <Portal>
      <div className="fixed left-0 right-0 top-0 bg-green-500 text-white px-1 py-2 flex justify-between items-center shadow">
        {msg}
        <svg
          role="button"
          onClick={close}
          className="text-4xl"
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 17a7 7 0 100-14 7 7 0 000 14zm0 1a8 8 0 100-16 8 8 0 000 16z"
            clipRule="evenodd"
          ></path>
          <path
            fillRule="evenodd"
            d="M12.646 13.354l-6-6 .708-.708 6 6-.708.708z"
            clipRule="evenodd"
          ></path>
          <path
            fillRule="evenodd"
            d="M7.354 13.354l6-6-.708-.708-6 6 .708.708z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </Portal>
  );
}
