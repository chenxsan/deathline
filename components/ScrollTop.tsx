function scroll() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}
function ScrollTop() {
  return (
    <button className="flex items-center justify-center mb-10" onClick={scroll}>
      <svg
        className="text-3xl"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 7.5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V8a.5.5 0 01.5-.5z"
          clipRule="evenodd"
        ></path>
        <path
          fillRule="evenodd"
          d="M9.646 6.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L10 7.707l-2.646 2.647a.5.5 0 01-.708-.708l3-3z"
          clipRule="evenodd"
        ></path>
      </svg>
      返回顶部
    </button>
  );
}
export default ScrollTop;
