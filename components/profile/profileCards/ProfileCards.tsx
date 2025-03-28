import { Email, Instagram, WhatsApp } from '@mui/icons-material';

const ProfileCards = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between">
      <h2>Title</h2>

      <WhatsApp />
      {/* <Email />
        <Instagram /> */}
    </div>
  );
};

export default ProfileCards;
