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
            flexDirection: {xs: 'column', sm: 'row'},
            minHeight: '100vh',
            width: '100%'
            
        }}>

            {/* SIDE BAR IMAGE */}
            <Box sx={{ 
                width: {sm: 240, md: 300}, 
                px: 2,
                backgroundImage: `url(${picture})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                boxSizing: {xs: 'border-box', md: 'content-box'},
                display: {xs: 'none', sm: 'flex'},
                flexDirection: 'column',
                flexShrink: 0,
                alignItems:'center',
                justifyContent: 'center',
            }}>
                <Typography level="h1" fontFamily={"'Vollkorn SC', serif"} 
                sx={{fontSize: 45,
                    color: '#faf6ee',
                    textShadow: '0px 4px 20px rgba(0, 0, 0, 0.8)'
                }}>DishDiary</Typography>
                <Typography sx={{fontSize: {sm: 14, md: 18}, 
                color: '#faf6ee', 
                textShadow: '0px 4px 20px rgba(0, 0, 0, 0.9)'
                    }} >What are we cooking today?
                </Typography>

                <Box sx={{mt: 45, }}>
                    <Typography sx={{ color: '#faf6ee', ml: 4, textShadow: '0px 4px 20px rgba(0, 0, 0, 0.49)'}}> 
                        Not cooking? </Typography>
                    <Button 
                    onClick={()=> navigate('/Homepage')} 
                    sx={{mt: 1, width: 150, bgcolor: '#ccc9c92f', border: 'solid 1px #ffffff95',
                        '&:hover': {bgcolor: '#ccc9c95c'}, 
                    }}>
                        Go Back </Button>
                </Box>
            </Box>
            <Box sx={{ 
                height: 150, 
                px: 2,
                backgroundImage: `url(${picture})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                boxSizing: {xs: 'border-box', md: 'content-box'},
                display: {xs: 'flex', sm: 'none'},
                flexDirection: 'column',
                flexShrink: 0,
                justifyContent: 'center',
            }}>
                <Button
                    onClick={() => navigate('/Homepage')}
                     sx={{fontSize: 12,height: 15, width: 15, borderRadius: 50, bgcolor: '#ccc9c92f',
                        '&:hover': {bgcolor: '#ccc9c95c'}, 
                    }}>
                    ←
                </Button>
                <Typography level="h1" fontFamily={"'Vollkorn SC', serif"} 
                sx={{fontSize: 45,
                    color: '#faf6ee',
                    textShadow: '0px 4px 20px rgba(0, 0, 0, 0.8)'
                }}>DishDiary</Typography>
                <Typography sx={{fontSize: 14, mt: -1,
                color: '#faf6ee', 
                textShadow: '0px 4px 20px rgba(0, 0, 0, 0.9)'
                    }} >What are we cooking today?
                </Typography>
            </Box>
            {/* FORM BOX */}
            <Box sx={{
                display: 'flex', 
                flexDirection: 'column', 
                flex: 1,
                minWidth: 0,
                alignItems: 'center', 
                gap: 2,
                px: {xs: 2, md: 4},
                py: 2,
                }}>
                <Typography level="h3" sx={{fontSize: 28, textAlign: 'center', mt: 1,}}>Create Your Dish</Typography>
                <form onSubmit={handleSubmit} style={{width: '100%', maxWidth: 640}}>
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
                        <Textarea minRows={2} maxRows={2}
                            placeholder="Description"
                            name="description"
                            value={recipeData.description}
                            onChange={(e) => onUpdate({ description: e.target.value })}
                        />
                    </FormControl>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', md: 'row'},
                        gap: {xs: 0, md: 3},
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
                                sx={{ width: '100%' }}
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
                        display: 'flex',
                        flexDirection: {xs: 'column', md: 'row'},
                        gap: {xs: 0, md: 3},
                    }}>
                        <FormControl required
                        sx={{mb: 2,}} >
                            <FormLabel>Prep-Time(in min)</FormLabel>
                            <Input type='number' placeholder='Preparation Time, e.g. 30' 
                            name='prepTime'
                            value={recipeData.prepTime}
                            onChange={(e) => onUpdate({ prepTime: e.target.value })}
                            />
                        </FormControl>

                        <FormControl required
                        sx={{mb: 2,}} >
                            <FormLabel>Cook-Time(in min)</FormLabel>
                            <Input type='number' placeholder='Cooking Time, e.g. 60' 
                            name='cookTime'
                            value={recipeData.cookTime}
                            onChange={(e) => onUpdate({ cookTime: e.target.value })}
                            sx={{width: '100%'}}
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', md: 'row'},
                        gap: {xs: 0, md: 3},
                    }}>
                        <FormControl required
                        sx={{mb: 2,}} >
                            <FormLabel>Servings</FormLabel>
                            <Input type='number' placeholder='How many people it serves?' 
                            name='servings'
                            value={recipeData.servings}
                            onChange={(e) => onUpdate({ servings: e.target.value })}
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
                                sx={{ width: '100%'}}
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
                    sx={{ width: '100%', mb: 1, mt: 3, borderRadius: 100, bgcolor: '#f2a541',
                        '&:hover': {bgcolor: 'rgba(242, 165, 65, 0.95)'}
                    }}
                    > Start Cooking</Button>
                    
                </form>
            </Box>
            
        </Sheet>
    )
}
export default RecipeDetailForm