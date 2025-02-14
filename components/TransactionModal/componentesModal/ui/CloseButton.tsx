const CloseButton = ({ close }: { close: () => void }) => (
  <button onClick={close} className="right-4 top-4 flex justify-end text-xl text-gray-600 hover:text-gray-800">
    ✖
  </button>
);
export default CloseButton;
