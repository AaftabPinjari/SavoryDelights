import { useParams } from "react-router-dom"
import { useRecipe } from '../context/recipeContext'
import { useEffect } from "react";


function Details() {

    const { id } = useParams();
    // console.log(id)

    const { recipeDetails, setRecipeDetails, favorites, handleAddToFavorites } = useRecipe()
    //api call for details page
    async function getRecipeDetails() {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
        const result = await res.json()

        if (result?.data) {
            setRecipeDetails(result?.data?.recipe)
        }

        // console.log(result.data.recipe)
    }

    useEffect(() => {
        getRecipeDetails()
    }, [id])


    // console.log(recipeDetails)
    return (
        <div className="p-6 flex flex-col lg:flex-row items-center justify-evenly gap-3 min-h-screen ">
            <div className="flex-col flex items-center gap-3">
                <h1 className="text-3xl font-semibold">
                    {recipeDetails?.title.toUpperCase()}
                </h1>
                <img
                    className="rounded-xl"
                    src={recipeDetails?.image_url}
                    alt={recipeDetails?.image_url}
                />
            </div>
            <div className="flex flex-col gap-3 items-center">
                <button
                    onClick={() => handleAddToFavorites(recipeDetails)}
                    className="bg-black text-white  rounded px-2 w-fit">
                    {
                        favorites.findIndex(item => item.id === id) === -1 ? "Add To Favorites"
                            : "Remove from Favorites"
                    }
                </button>
                <h1 className="text-2xl">Ingredients</h1>
                <ul className="bg-gray-300 p-3 rounded-xl ">
                    {recipeDetails?.ingredients?.map((ing, idx) => (
                        <li key={idx}>
                            <div className="flex  gap-10">
                                <h3 className="w-2/3">{ing?.description.toUpperCase()}</h3>
                                <h3 className="w-1/3">{ing?.quantity}  {ing?.unit}</h3>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Details
