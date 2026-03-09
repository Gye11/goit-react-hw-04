import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ImageModal({ isOpen, onClose, image }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
    >
      <img src={image} alt="" />
    </Modal>
  );
}
