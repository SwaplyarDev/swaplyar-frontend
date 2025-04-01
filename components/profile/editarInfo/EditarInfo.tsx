import { Box, Modal, Typography } from '@mui/material';

type EditarInfoProps = {
  handleClose: () => void;
  open: boolean;
};

const ModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditarInfo = ({ handleClose, open }: EditarInfoProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={ModalStyle}>
        <h2>Verificar número de Whatsapp</h2>

        <div className="my-10">
          <select name="" id="">
            <option value=""></option>
            <option value=""></option>
          </select>
        </div>

        <div className="mx-10 flex justify-between">
          <button>Volver</button>
          <button>Enviar Código</button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditarInfo;
