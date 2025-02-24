const CloseButton = ({ close }: { close: () => void }) => (
  <button onClick={close} className="absolute right-0 top-0 text-xl text-gray-600 hover:text-gray-800">
    ✖
  </button>
);
export default CloseButton;
