import { Link } from "react-router-dom"
import { useRecipe } from "../context/recipeContext"

function Favorites() {

    const { favorites, handleAddToFavorites } = useRecipe()


    return (
        <>
            {favorites && favorites.length ? favorites.map((recipe) => (
                <div
                    key={recipe.id}
                    className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
                    <div
                        className="bg-slate-50 p-2 text-center shadow-lg shadow-red-100 rounded-lg flex flex-col items-center justify-between h-auto "
                    >
                        <img className="h-2/3 w-2/3 rounded-lg" alt={recipe.title} src={recipe.image_url}></img>
                        <div className="flex flex-col gap-2 items-center">
                            <h3 className="font-semibold pt-2" >{recipe.title}</h3>
                            <div className="flex gap-2">
                                <Link to={`/recipe/${recipe.id}`} className="bg-black text-sm text-white rounded px-2  w-fit" >Recipe Details</Link>
                                <button
                                    onClick={() => handleAddToFavorites(recipe)}
                                    className="bg-black text-white text-sm rounded px-2  w-fit">
                                    {
                                        favorites.findIndex(item => item.id === recipe.id) === -1 ? "Add To Favorites"
                                            : "Remove from Favorites"
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )) : <h2 className=" mt-10 text-center text-2xl font-semibold">Add Something to Favorites!</h2>}
        </>
    )
}

export default Favorites