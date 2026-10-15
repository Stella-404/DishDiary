import { Box, Button, FormControl, FormLabel, Input, Select, Sheet, Typography, Option, Textarea, Autocomplete, } from "@mui/joy";
import ImageUpload from "../Components/ImageUpload";
import { useNavigate } from "react-router-dom";
import picture from "../Images/cooking-aesthetic.png"
import { useEffect, useState } from "react";
import { type Tags} from "./InterfaceModels"
import api from "../API/api";
// import { type RecipeDataModel } from "../Components/InterfaceModels";

// Props passed down from the parent component i.e. AddRecipeWizard
interface Props {
    recipeData: { 
        title: string; 
        description: string; 
        cuisine: string; 
        category: string; 
        prepTime: number | '';
        cookTime: number | '';
        servings: number | '';
        difficulty: string;
        image: File | string;
        tags: Tags[];
    };
    onUpdate: (fields: Partial<any>) => void;
    onNext: () => void;
}

function RecipeDetailForm({recipeData, onUpdate, onNext} : Props){

    const navigate = useNavigate();
    const [allTags, setAllTags] = useState<[]>([])
    const handleSubmit = (event: any) => {

        event.preventDefault();
        onNext();
    }
    
    const getTags = async () => {
        try{
            const tags = await api.get("/tags")
            setAllTags(tags.data);
        }
        catch (error){
            console.error(error)
        }
    }

    useEffect(() => {
        getTags();
    }, [])

    return(
        <Sheet
        sx={{ 
            display: 'flex',
            flexDirection: 'row',
            
        }}>

            {/* SIDE BAR */}
            <Box sx={{ width: 320, px: 2,
            // height: '100vh',
                bgcolor: '#5a9140',
                backgroundImage: `url(${picture})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                display: 'flex',
                flexDirection: 'column',
                alignItems:'center',
            }}>
                <Typography level="h2" fontFamily={"'Vollkorn SC', serif"} sx={{fontSize:35,mt: 13, mb: 3, mr: 2, color: '#faf6ee',
                    textShadow: '0px 4px 20px rgba(0, 0, 0, 0.8)'
                }}>DishDiary</Typography>
                <Typography level="h4" sx={{fontSize: 25, ml: 3, color: '#faf6ee', textShadow: '0px 4px 20px rgba(0, 0, 0, 0.49)'
                    }} >What are we cooking today?
                </Typography>

                <Box sx={{mt: 48, }}>
                    <Typography sx={{ color: '#faf6ee', ml: 4, textShadow: '0px 4px 20px rgba(0, 0, 0, 0.49)'}}> Not cooking? </Typography>
                    <Button 
                    onClick={()=> navigate('/Homepage')} 
                    sx={{mt: 1, width: 150, bgcolor: '#ccc9c92f', border: 'solid 1px #ffffff95',
                        '&:hover': {bgcolor: '#ccc9c95c'}, 
                    }}>Go Back </Button>
                </Box>
            </Box>

            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto',
                gap: 3, height: '99vh',}}>
                <Typography level="h3" sx={{justifySelf: 'center', my: 1,}}>Create Your Dish</Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl required
                    sx={{mb: 2,}} >
                        <FormLabel>What is the dish called?</FormLabel>
                        <Input type='text' placeholder='e.g., Homemade Margherita Pizza' 
                        name='title'
                        value={recipeData.title}
                        onChange={(e) => onUpdate({ title: e.target.value })}
                        />
                    </FormControl>

                    <FormControl
                    sx={{mb: 2,}}  >
                        <FormLabel>How would you describe it?</FormLabel>
                        <Textarea minRows={3}
                            placeholder="Description"
                            name="description"
                            value={recipeData.description}
                            onChange={(e) => onUpdate({ description: e.target.value })}
                        />
                    </FormControl>

                    <Box sx={{
                        display: 'flex', gap: 3
                    }}>
                        <FormControl required
                        sx={{mb: 2,}} >
                            <FormLabel>Cuisine</FormLabel>
                            <Input
                                placeholder="Add the cuisine"
                                name="cuisine"
                                value={recipeData.cuisine}
                                onChange={(e) => onUpdate({ cuisine: e.target.value })}
                                required
                                sx={{ minWidth: 290 }}
                                />
                        </FormControl>

                        <FormControl required
                        sx={{mb: 2,}} >
                            <FormLabel>Category</FormLabel>
                            <Select
                                placeholder="Select your category"
                                name="category"
                                value={recipeData.category}
                                onChange={(_event, newValue) => onUpdate({category: newValue})}
                                required
                                sx={{ minWidth: 290 }}
                                >
                                <Option value="Breakfast">Breakfast</Option>
                                <Option value="Lunch">Lunch</Option>
                                <Option value="Dinner">Dinner</Option>
                                <Option value="Snacks">Snacks</Option>
                                <Option value="Dessert">Dessert</Option>
                                <Option value="Beverage">Beverage</Option>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{
                        display: 'flex', gap: 3
                    }}>
                        <FormControl required
                        sx={{mb: 2,}} >
                            <FormLabel>Prep-Time(in min)</FormLabel>
                            <Input type='number' placeholder='Preparation Time, e.g. 30' 
                            name='prepTime'
                            value={recipeData.prepTime}
                            onChange={(e) => onUpdate({ prepTime: e.target.value })}
                            sx={{minWidth: 290}}
                            />
                        </FormControl>

                        <FormControl required
                        sx={{mb: 2,}} >
                            <FormLabel>Cook-Time(in min)</FormLabel>
                            <Input type='number' placeholder='Cooking Time, e.g. 60' 
                            name='cookTime'
                            value={recipeData.cookTime}
                            onChange={(e) => onUpdate({ cookTime: e.target.value })}
                            sx={{minWidth: 290}}
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{
                        display: 'flex', gap: 3
                    }}>
                        <FormControl required
                        sx={{mb: 2,}} >
                            <FormLabel>Servings</FormLabel>
                            <Input type='number' placeholder='How many people it serves?' 
                            name='servings'
                            value={recipeData.servings}
                            onChange={(e) => onUpdate({ servings: e.target.value })}
                            sx={{minWidth: 290,}}
                            />
                        </FormControl>

                        <FormControl required
                        sx={{mb: 2,}} >
                            <FormLabel>Difficulty</FormLabel>
                            <Select
                                placeholder="Select the difficulty"
                                name="difficulty"
                                value={recipeData.difficulty}
                                onChange={(_event, newValue) => onUpdate({difficulty: newValue})}
                                required
                                sx={{ minWidth: 290 }}
                                >
                                <Option value="Easy">Easy</Option>
                                <Option value="Medium">Medium</Option>
                                <Option value="Hard">Hard</Option>
                            </Select>
                        </FormControl>
                    </Box>

                    <FormControl sx={{mb: 2,}} >
                        <FormLabel>Tags</FormLabel>
                        <Autocomplete
                        multiple
                        placeholder="Select tags..."
                        options={allTags}
                        getOptionLabel={(option) => option.name}
                        value={recipeData.tags}
                        onChange={(_event, newValue) => onUpdate({tags: newValue})}
                        />
                    </FormControl>
                    
                    {/* Component Imported */}
                    <ImageUpload onUpdate={onUpdate}/>

                    <Button 
                    type="submit"
                    sx={{ alignSelf: 'center',
                        width: 610, my: 6, borderRadius: 100, bgcolor: '#f2a541',
                        '&:hover': {bgcolor: 'rgba(242, 165, 65, 0.95)'}
                    }}
                    > Start Cooking</Button>
                    
                </form>
            </Box>
            
        </Sheet>
    )
}
export default RecipeDetailForm