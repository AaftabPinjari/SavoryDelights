import { NavLink } from 'react-router-dom'
import { useRecipe } from '../context/recipeContext'

function Navbar() {
    const { searchParam, setSearchParam, handleSubmit } = useRecipe()
    // console.log(searchParam)
    //handleSubmit is going from children to parent through context




    return (
        <>
            <nav className='pb-3 px-6  shadow-lg flex flex-col md:flex-row items-center justify-between  gap-3 lg:gap-0'>
                <h1 className='text-3xl text-center font-semibold py-2 px-1 bg-black text-white rounded-lg'>Savory <span
                    className='bg-white rounded-lg px-1 text-black'>Delights</span></h1>
                <form onSubmit={handleSubmit}>
                    <input
                        value={searchParam}
                        onChange={(e) => setSearchParam(e.target.value)}
                        type='text'
                        name='search'
                        className='outline-none border-2 rounded-lg 
                        focus:shadow-red-200 
                        w-60 px-1 border-gray-600 shadow-lg'
                        placeholder='Enter a Dish Name here....'

                    />
                </form>
                <ul className='flex gap-2 font-semibold text-center '>
                    <li className=''><NavLink to="/">Home</NavLink></li>
                    <li className=''><NavLink to="/favorites">Favorites</NavLink></li>
                    {/*implement dark mode with context api */}
                    {/*<li className='border-2 border-gray-600 px-6 rounded-lg hover:bg-black hover:text-white'><button >Dark</button></li>*/}
                </ul>
            </nav>
        </>
    )
}

export default Navbar