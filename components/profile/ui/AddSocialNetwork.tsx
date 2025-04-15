'use client';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

type AddSocialNetworkProps = {
  newSocialType: string;
  setNewSocialType: React.Dispatch<React.SetStateAction<string>>;
};

const AddSocialNetwork = ({ newSocialType, setNewSocialType }: AddSocialNetworkProps) => {
  const { isDark } = useDarkTheme();

  return (
    <>
      <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-black'}`}>Agregar nueva cuenta</h3>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-5">
          <Select value={newSocialType} onValueChange={setNewSocialType}>
            <SelectTrigger className="border border-zinc-600 bg-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Red social" />
            </SelectTrigger>
            <SelectContent className="border-zinc-700 bg-zinc-800 text-white">
              <SelectItem className="hover:bg-zinc-700" value="facebook">
                Facebook
              </SelectItem>
              <SelectItem className="hover:bg-zinc-700" value="instagram">
                Instagram
              </SelectItem>
              <SelectItem className="hover:bg-zinc-700" value="twitter">
                Twitter/X
              </SelectItem>
              <SelectItem className="hover:bg-zinc-700" value="LinkedIn">
                LinkedIn
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default AddSocialNetwork;
