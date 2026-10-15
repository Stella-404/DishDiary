import { Box, IconButton, Sheet, Typography } from "@mui/joy"
import Navigationbar from "../Components/Navigationbar";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import type { DisplayRecipeModel } from "../Components/InterfaceModels";
import api from "../API/api";
import { useLocation, useNavigate } from "react-router-dom";

function Recipe(){

    const navigate = useNavigate();
    // This attaches the 'from' location whenever clicking into a page
    // using this for naviagtingn to the recipe detail page, so when clicked 'backed' from there, it switches back to
    // this page (or whatever page it was clicked from)
    const location = useLocation();
    const[recipe, setRecipe] = useState<DisplayRecipeModel[]>([])
// ---------- Handling Search and filter functions -----------------
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const[searchVal, setSearchVal] = useState<string>("");
    const[selectedCategory, setSelectedCategory] = useState<string>("All")
    const[selectedCuisine, setSelectedCuisine] = useState<string>("All");

// -------- Displaying the Fetched Recipes ------------
    const DisplayRecipe = async (search = '', category = 'All', cuisine = 'All') => {
        try {
            // Build query parameters dynamically
            const params: Record<string, any> = {};
            if (search.trim()) params.search = search.trim();
            if (category !== 'All') params.category = category;
            if (cuisine !== 'All') params.cuisine = cuisine;

            // Pass parameters to your API call
            const response = await api.get("/recipes", { params });
            const data = response.data;
            
            setRecipe(data.recipes);
        } catch (error) {
            console.error("Failed to fetch recipes:", error);
            setRecipe([]); // Set empty list if search returns 404 or fails
        }
    };
// -------------------- When user lands on the page ----------------
    useEffect(() => {
        const timer = setTimeout(() => {
            DisplayRecipe(searchVal, selectedCategory, selectedCuisine);
        }, 300); // 300ms debounce so it doesn't fetch on every single keystroke

        return () => clearTimeout(timer);
    }, [searchVal, selectedCategory, selectedCuisine]);

// ----------- Delete Recipe --------- 
    const deleteRecipe = async (id: number) => {
        try{
            const response = await api.delete(`/recipes/${id}`)
            console.log(response.data.message)

            DisplayRecipe();
        } catch(error) {
            console.error(error)
        }
    }
// ----------- Add to Favorites -----------------
    const handleFavoriteClick = async (id: number) => {

        // Optimistic UI update for instant feedback
        // it flips the state of the button, lightening fast
        // if true -> false; f false -> true........so user thiks the site is very very fast
        setRecipe((prevRecipes) =>
            prevRecipes.map((recipe) =>
            recipe.id === id ? { ...recipe, is_favorite: !recipe.is_favorite } : recipe
            )
        );
        try{
            const response = await api.post(`/recipes/${id}/favorites`)
            console.log(response.data.message)

            setRecipe((prevRecipes) =>
                prevRecipes.map((recipe) =>
                    recipe.id === id ? { ...recipe, is_favorite: response.data.is_favorite } : recipe
            ));
            
        } catch (error) {
            // 3. Revert if it fails
            setRecipe((prevRecipes) =>
                prevRecipes.map((recipe) =>
                    recipe.id === id ? { ...recipe, is_favorite: !recipe.is_favorite } : recipe
            ));
            console.error(error)
        }
    }
    return(
        <Sheet
        sx={{bgcolor: '#faf6ee'}}>
            {/* -------------- Navigation Header Component ------------ */}
            <Navigationbar searchVal={searchVal} 
                onSearchChange={(e) => setSearchVal(e.target.value)} 
                open={isFilterOpen}
                onOpen={() => setIsFilterOpen(true)}
                onClose={() => setIsFilterOpen(false)}
                recipes={recipe} // Used for populating dropdown options 
                category={selectedCategory}
                setCategory={setSelectedCategory}
                cuisine={selectedCuisine}
                setCuisine={setSelectedCuisine}
            />

            {/* --------------- Body Component -------------- */}
            <Box sx={{pb: 10}}>

                {recipe.length === 0 ? (
                    <Box>
                        <Typography level="body-md" sx={{fontStyle: 'italic', justifySelf: 'center', mt: 5,}}>
                            {searchVal ? `No Recipes found for ${searchVal}` :  "You haven't added any recipe yet! Add some" }
                            </Typography>
                    </Box>
                ):(
                    <Box>
                        {recipe.map((recipe) => (
                            <Box key={recipe.id}
                            onClick={() => navigate(`/recipes/${recipe.id}`, {
                                state: {from: location.pathname}
                            })}
                            sx={{ bgcolor: '#f2cc4163', p: 2, borderRadius: 14, mx: 2, my: 1,
                                display: 'flex', flexDirection: 'row', justifyContent: 'space-between', cursor: 'pointer', // Changes cursor to a hand pointer
                                transition: 'box-shadow 0.2s',
                                '&:hover': {
                                    boxShadow: 'md',
                                }
                            }}>
                                
                                <Box>
                                    <Box sx={{ display: "flex", flexDirection: 'row', gap: 3, mb: 1}}>
                                        <Typography level="h3">{recipe.title}</Typography>
                                        <Typography level="body-sm" sx={{bgcolor: '#f2a541b3', pb: 0.4, pt: 0.6, px: 2, 
                                        color: '#faf6ee', borderRadius: 20, 
                                        }}> {recipe.category}</Typography>
                                        <Typography level="body-sm" sx={{bgcolor: '#e2613aa6', pb: 0.4, pt: 0.6, px: 2, 
                                        color: '#faf6ee', borderRadius: 20, 
                                        }}> {recipe.cuisine}</Typography>
                                    </Box>
                                    <Box sx={{display: 'flex', gap: 2, pl: 4}}>
                                        {recipe.tags?.map((tags, index) => (
                                        <Typography key={index} level="body-md" sx={{color: '#173c0a', fontWeight: 'bold'}}> #{tags.name} 
                                        </Typography>
                                        ))}
                                    </Box>
                                    <Typography level="body-md" sx={{width: 800, pl: 1}}>
                                        {recipe.description}
                                    </Typography>
                                </Box>
                            {/* ------------- ICONS --------- */}
                                <Box sx={{display: 'flex', flexDirection: 'row', alignContent: 'center',  gap: 1, mr: 4,}}>
                                {/* ----------- Favourite Icon --------- */}
                                    <IconButton size="md"
                                    sx={{ '&:hover': {bgcolor: '#f0f4f86e'}, }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleFavoriteClick(recipe.id);
                                    }}>
                                        { recipe.is_favorite ? (
                                            <FavoriteIcon fontSize="medium" sx={{color: "#e2603a"}}/>
                                        ) : (
                                            <FavoriteBorderIcon fontSize="medium" sx={{color: "#e2603a"}} />
                                        )}
                                    </IconButton>
                                {/* ----------- Edit Icon --------- */}
                                    <IconButton size="md"
                                    sx={{ '&:hover': {bgcolor: '#f0f4f86e'}, color: "#72531d" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/recipe/${recipe.id}/edit`)}
                                    }>
                                        <EditIcon fontSize="medium" />
                                    </IconButton>
                                {/* ----------- Delete Icon --------- */}
                                    <IconButton size="md" color="danger"
                                    sx={{ '&:hover': {bgcolor: '#f0f4f86e'}, }}
                                    onClick={(e) =>{
                                        e.stopPropagation();
                                        deleteRecipe(recipe.id)}
                                    }>
                                        <DeleteIcon fontSize="medium" />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </Sheet>
    )
}

export default Recipe