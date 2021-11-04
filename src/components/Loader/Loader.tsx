import './Loader.css'

export const Loader = ({ active }: { active?: boolean }) => {
  return active ? <div className='Loader'>Loading...</div> : null
}