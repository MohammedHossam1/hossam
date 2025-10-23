import { getSkills } from '@/lib/supabase-methods';
import SideBarClient from './SideBarClient';
export const revalidate = 60 * 60 * 24 * 7;
const SideBar = async () => {
  const { data } = await getSkills()

  return (
    <SideBarClient data={data} />
  );
};

export default SideBar;
