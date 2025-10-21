'use client';

import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/Dialog';
import { Input } from '../../ui/Input';
import AddSocialNetwork from '../ui/AddSocialNetwork';
import { PlataformSocial, useSocialNetworksStore } from '../store/socialNetworksStore';

type SocialMedia = {
  id: string;
  type: PlataformSocial;
  username: string;
};

type SocialMediaModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  socialNetworks: SocialMedia[];
};

const RedesSocialesModal = ({ show, setShow, socialNetworks }: SocialMediaModalProps) => {
  const { isDark } = useDarkTheme();

  const { socialAccounts, addSocial, removeSocial } = useSocialNetworksStore();

  const [newSocialType, setNewSocialType] = useState<PlataformSocial>('facebook');
  // const [socialAccounts, setSocialAccounts] = useState<SocialMedia[]>(socialNetworks);
  const [newSocialUsername, setNewSocialUsername] = useState('');

  // const addSocialAccount = () => {
  //   if (newSocialType && newSocialUsername) {
  //     const newAccount: SocialMedia = {
  //       id: Date.now().toString(),
  //       type: newSocialType as any,
  //       username: newSocialUsername,
  //     };
  //     setSocialAccounts([...socialAccounts, newAccount]);
  //     setNewSocialType('');
  //     setNewSocialUsername('');
  //   }
  // };
  const handleAdd = () => {
    if (newSocialType && newSocialUsername) {
      addSocial({
        id: Date.now().toString(),
        type: newSocialType,
        username: newSocialUsername,
      });
      setNewSocialType('facebook');
      setNewSocialUsername('');
    }
  };

  // const handleSubmit = () => {
  //   setShow(false);
  // };

  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-500" />;
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-500" />;
      case 'twitter':
        return <Twitter className="h-5 w-5 text-sky-500" />;
      case 'LinkedIn':
        return <LinkedIn className="h-5 w-5" />;
      default:
        return null;
    }
  };

  // const removeSocialAccount = (id: string) => {
  //   setSocialAccounts(socialAccounts.filter((account) => account.id !== id));
  // };

  const handleSubmit = () => {
    setShow(false);
    //logica para conectar con el backend
  };

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className={`border-none ${isDark ? 'bg-zinc-800 text-white' : 'text-black'} sm:max-w-md`}>
        <DialogHeader className="relative">
          <DialogTitle className="pt-4 text-center text-xl font-normal">Redes sociales</DialogTitle>
        </DialogHeader>

        <div className="mb-6 mt-4 space-y-5">
          {/* Redes sociales conectadas */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Cuentas conectadas</h3>

            {socialAccounts.length === 0 ? (
              <div
                className={`py-6 text-center text-sm ${isDark ? 'bg-zinc-800 text-white' : 'text-gray-400 underline'}`}
              >
                No tienes redes sociales conectadas
              </div>
            ) : (
              <div className="space-y-2">
                {socialAccounts.map((account) => (
                  <div
                    key={`social-account-modal-${account.id}`}
                    className={`flex items-center justify-between rounded-lg ${isDark ? 'bg-zinc-700/50' : 'border border-zinc-600'} p-3`}
                  >
                    <div className="flex items-center space-x-3">
                      {getSocialIcon(account.type)}
                      <span>{account.username}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:bg-zinc-700 hover:text-red-400"
                      // onClick={() => removeSocialAccount(account.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Agregar nueva red social */}
          <div className="space-y-3">
            <AddSocialNetwork newSocialType={newSocialType} setNewSocialType={setNewSocialType} />
            <div className="col-span-7 flex space-x-1">
              <Input
                value={newSocialUsername}
                onChange={(e) => setNewSocialUsername(e.target.value)}
                className="border border-zinc-600 bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Nombre de usuario"
              />
              <Button
                onClick={handleAdd}
                disabled={!newSocialType || !newSocialUsername}
                className="bg-blue-400 px-2 text-white hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <Button
            onClick={() => setShow(false)}
            variant="ghost"
            className={`rounded-full px-4 ${isDark ? 'border border-white text-white hover:bg-white hover:text-[#4B4B4B]' : 'border border-blue-400 bg-white text-blue-400'}`}
          >
            Cancelar
          </Button>
          <Button
            className={`rounded-full px-4 ${isDark ? 'bg-white text-[#4B4B4B]' : 'bg-blue-400 text-white hover:bg-blue-700'}`}
            onClick={handleSubmit}
          >
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RedesSocialesModal;
