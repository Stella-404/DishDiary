import { useEffect, useState } from "react";
import type { RecipeDataModel } from "../Components/InterfaceModels";
import { useNavigate, useParams } from "react-router-dom";
import CookingDetails from "../Components/CookingDetails";
import RecipeDetailForm from "../Components/RecipeDetailForm";
import api from "../API/api";

function AddRecipeWizard() {
    // For when n editing mode, filling the form fields with the id respective recipe values
    const {id} = useParams();
    const isEditing = Boolean(id);
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);

    const [recipeData, setRecipeData] = useState<RecipeDataModel>({
        title: "",
        description: "",
        cuisine: "",
        category: "",
        prepTime: "",
        cookTime: "",
        servings: "",
        difficulty: "",
        image: "",
        tags: [],
        ingredients: [],
        instructions: [],
    });

    // Helper to update specific fields from any step
    const updateRecipeData = (fields: Partial<RecipeDataModel>) => {
        setRecipeData((prev) => ({ ...prev, ...fields }));
    };

    // Helper functoin to fetch the recpe details for the edt phase
    const fetchRecipeDetails = async (id: string) => {
        try{
            const response = await api.get(`/recipes/${id}`)
            console.log("RECIPE DETAILS FOR EDT: ", response.data.recipe)

            const data = response.data.recipe;
            // console.log("DATA n data:", data)
            setRecipeData({
                title: data.title || "",
                description: data.description || "",
                cuisine: data.cuisine || "",
                category: data.category || "",
                prepTime: data.prep_time || "",
                cookTime: data.cook_time || "",
                servings: data.servings || "",
                difficulty: data.difficulty || "",
                image: data.image_path || "",
                tags: data.tags_id || [],
                ingredients: data.ingredients || [],
                instructions: data.instructions || [],
            })

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (isEditing && id) {
        fetchRecipeDetails(id);
        }
    }, [id, isEditing]);
    
    // Final submit function called ONLY on Page 2
    const handleFinalSubmit = async () => {

        console.log("Submitted")
        
        try{
            const payload = {
                title: recipeData.title,
                description: recipeData.description,
                cuisine: recipeData.cuisine,
                category: recipeData.category,
                prep_time: recipeData.prepTime,
                cook_time: recipeData.cookTime,
                servings: recipeData.servings,
                difficulty: recipeData.difficulty,
                image_path: recipeData.image,
                tags_id: recipeData.tags,
                ingredients: recipeData.ingredients,
                instructions: recipeData.instructions
            }

            const formData = new FormData()
            formData.append("title", recipeData.title)
            if (recipeData.description)
                formData.append("description", recipeData.description)
            formData.append("cuisine", recipeData.cuisine)
            formData.append("category", recipeData.category)
            formData.append("prep_time", String(recipeData.prepTime) )
            formData.append("cook_time", String(recipeData.cookTime))
            formData.append("servings", String(recipeData.servings))
            formData.append("difficulty", recipeData.difficulty)

            const tagIds = recipeData.tags.map(tag => tag.id);
            if (tagIds.length > 0) {
                formData.append("tags_id", JSON.stringify(tagIds));
            }
            formData.append("ingredients", JSON.stringify(recipeData.ingredients))
            formData.append("instructions", JSON.stringify(recipeData.instructions))

            if(recipeData.image instanceof File)
                formData.append("image_path", recipeData.image)
            else if(typeof recipeData.image === "string")
                formData.append("existing_image_path", recipeData.image)
            
            console.log("--- INSPECTING FORMDATA ---");
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            console.log("-----------------------------");

            if(id && isEditing){
                const response = await api.put(`/recipes/${id}/edit`, formData)
                console.log(response.data)

                alert('Recipe successfully edited!');

            }
            else{
                console.log("PAYLOAD: ", payload);
                const response = await api.post("/recipes", formData)
                console.log(response.data)

                alert('Recipe successfully created!');
            }

            
            setRecipeData({
                title: "",
                description: "",
                cuisine: "",
                category: "",
                prepTime: "",
                cookTime: "",
                servings: "",
                difficulty: "",
                image: "",
                tags: [],
                ingredients: [],
                instructions: [],
            })
            navigate("/Homepage")
        } catch (error) {
            console.error(error)
        }
    };
    return (
        <>
        {activeStep === 0 && (
            <RecipeDetailForm
            recipeData={recipeData}
            onUpdate={updateRecipeData}
            onNext={() => setActiveStep(1)}
            />
        )}

        {activeStep === 1 && (
            <CookingDetails
            data={recipeData}
            onUpdateIngredients={(ingredients) =>
                updateRecipeData({ ingredients })
            }
            onUpdateInstructions={(instructions) =>
                updateRecipeData({ instructions })
            }
            onBack={() => setActiveStep(0)}
            onSubmit={handleFinalSubmit}
            />
        )}
        </>
    );
}

export default AddRecipeWizard;