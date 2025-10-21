import { getSkills } from '@/lib/supabase-methods'
import MobileNavClient from './mobile-nav-client'
export const revalidate = 60 * 60 * 24 * 7;

const MobileNav = async () => {
    const { data } = await getSkills()
    return (
        <MobileNavClient data={data} />
    )
}

export default MobileNav
