/* eslint-disable no-unreachable */
/* eslint-disable no-useless-catch */
/* eslint-disable react/prop-types */
import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const RecipeContext = createContext()

//children with small c always ---****important
export const RecipeContextProvider = ({ children }) => {

    const [searchParam, setSearchParam] = useState('')
    const [loading, setLoading] = useState(true)
    const [recipesList, setRecipesList] = useState([])
    const [favorites, setFavorites] = useState([])
    const [recipeDetails, setRecipeDetails] = useState(null)

    const navigate = useNavigate()

    function handleAddToFavorites(getCurrentItem) {
        // console.log(getCurrentItem)
        let copyFavorites = [...favorites]
        const index = copyFavorites.findIndex(item => item.id === getCurrentItem.id)

        if (index === -1) {
            copyFavorites.push(getCurrentItem)
        } else {
            copyFavorites.splice(index)
        }

        setFavorites(copyFavorites)
    }
    // console.log(favorites, "favorites")


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);
            const result = await res.json()
            if (result?.data?.recipes) {
                setRecipesList(result?.data?.recipes)
                setLoading(false)
                setSearchParam('')
                navigate('/')
            }

        } catch (error) {
            throw error
            setLoading(false)
            setSearchParam('')

        }
    }
    // console.log(loading, recipesList)
    useEffect(()=>{
        const favorites = JSON.parse(localStorage.getItem("favorites"))
        if(favorites && favorites.length > 0){
            setFavorites(favorites)
        }
    },[])
    
    useEffect(()=>{
        localStorage.setItem("favorites",JSON.Stringify(favorites))
    },[favorites])

    return (
        <RecipeContext.Provider value={{
            searchParam, setSearchParam, handleSubmit,
            recipesList, loading,
            recipeDetails, setRecipeDetails, handleAddToFavorites,
            favorites
        }}>
            {children}
        </RecipeContext.Provider>
    )
}

export const useRecipe = () => {
    return useContext(RecipeContext)
}
