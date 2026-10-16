import { Box, Button, FormControl, FormLabel, Input, Select, Sheet, Typography, Option, Textarea, Divider, } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import picture from "../Images/cooking-aesthetic.png";
import { useRef, useState } from "react";
import type { Ingredients, Instructions } from "./InterfaceModels";

interface Props{
    data: {
        ingredients: Ingredients[];
        instructions: Instructions[];
    }
    onUpdateInstructions: (instructions: Instructions[]) => void;
    onUpdateIngredients: (ingredients: Ingredients[]) => void;
    onBack: () => void;
    onSubmit: () => void;
}
function CookingDetails({data, onUpdateIngredients, onUpdateInstructions, onBack, onSubmit} : Props ){

    // --------------- INGREDIENTS FIELD STATE MANAGEMENT ----------------
    const [currentIngredient, setCurrentIngredient] = useState<Ingredients>({
        name:"",
        quantity: '',
        unit: ""
    })
    // To reFocus
    const nameInputRef = useRef<HTMLInputElement>(null);

    const handleAddIngredient = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        onUpdateIngredients([...data.ingredients, currentIngredient]);
        // Clear fields
        setCurrentIngredient({ name: '', quantity: '', unit: '' });
        // Refocus the name input
        nameInputRef.current?.focus();
    }

    const handleRemove = (index: number) => {
        const updated = data.ingredients.filter((_, i) => i !== index);
        onUpdateIngredients(updated);
    };

    // --------------- INSTRUCTIONS FIELD STATE MANAGEMENT ----------------
    const [currentInstruction, setCurrentInstruction] = useState<Instructions>({
        stepNumber: '',
        description: "",
    })
    const descInputRef = useRef<HTMLInputElement>(null);

    const handleAddInstruction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newInstruction = {
            stepNumber: data.instructions.length + 1, // Automatically sequences steps (1, 2, 3...)
            description: currentInstruction.description,
        };

        onUpdateInstructions([...data.instructions, newInstruction]);
        setCurrentInstruction({ stepNumber: '', description: '' }); // Clear field
        descInputRef.current?.focus();
    };

    const handleRemoveInstruction = (index: number) => {
        const updated = data.instructions.filter((_, i) => i != index);
        onUpdateInstructions(updated);
    }
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
                <Typography sx={{fontSize: 18, 
                    color: '#faf6ee', 
                    textShadow: '0px 4px 20px rgba(0, 0, 0, 0.9)'
                        }} >What are we cooking today?
                </Typography>

                <Box sx={{mt: 45, }}>
                    <Typography sx={{ color: '#faf6ee', ml: 4, textShadow: '0px 4px 20px rgba(0, 0, 0, 0.49)'}}> 
                        Not cooking? </Typography>
                    <Button 
                    onClick={onBack}
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
                    onClick={onBack}
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
            
            {/* --------- MAIN AREA -------- */}
            <Box sx={{display: 'flex', flexDirection: 'column', flex: 1, 
                alignItems: 'center', 
                gap: 3, px: 2, minWidth: 0,
                boxSizing: 'border-box',}}>
                
                <Box sx={{display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2, width: '100%', maxWidth: 1200,
                }}>
                    {/* =========== INGREDIENTS LIST =========== */}
                    <Box sx={{flex: 1, minWidth: 0,}}>
                        <Typography level="h3" sx={{fontSize: { xs: 22, md: 28 },justifySelf: 'center', my: 1,}}>Select ingredients for your dish</Typography>

                        {/* === Ingredient FIelds ==== */}
                        <Box sx={{mx: 1}}>
                            <Typography sx={{fontWeight: 'bold', fontSize: 14}}>Add Ingredient</Typography>

                            <form onSubmit={handleAddIngredient}>
                                <FormControl required
                                sx={{mb: 1,}} >
                                    <FormLabel sx={{display: {xs: 'none', sm: 'block'} }}>Name</FormLabel>
                                    <Input type='text' placeholder='Ingredient Name' 
                                    name='name'
                                    value={currentIngredient.name}
                                    onChange={(e) => setCurrentIngredient({ ...currentIngredient, name: e.target.value })}
                                    />
                                </FormControl>
                                <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: {xs: 'column', md: 'row'},
                                    gap: {xs: 0, md: 1},
                                }}>
                                    <FormControl required
                                    sx={{mb: 1, flex: 1}} >
                                        <FormLabel>Quantity</FormLabel>
                                        <Input type='number' placeholder='Required quantity' 
                                        name='quantity'
                                        value={currentIngredient.quantity}
                                        onChange={(e) => setCurrentIngredient({ ...currentIngredient, quantity: Number(e.target.value) })}
                                        />
                                    </FormControl>
                                    <FormControl required
                                    sx={{mb: 1, flex: 1}} >
                                        <FormLabel>Unit</FormLabel>
                                        <Select
                                            placeholder="Select appropriate unit"
                                            name="unit"
                                            value={currentIngredient.unit}
                                            onChange={(_event, newValue) => setCurrentIngredient({...currentIngredient, unit: newValue || ''})}
                                            required
                                            sx={{width: '100%'}}
                                            >
                                            <Option value="Cup(s)">Cup(s)</Option>
                                            <Option value="Tbsp">Tbsp</Option>
                                            <Option value="Tsp">Tsp</Option>
                                            <Option value="Litre">Litre</Option>
                                            <Option value="Millilitre">Millilitre</Option>
                                            <Option value="Gram">Gram</Option>
                                            <Option value="Kilogram">Kilogram</Option>
                                            <Option value="Piece(s)">Piece(s)</Option>
                                            <Option value="Clove(s)">Clove(s)</Option>
                                            <Option value="Small">Small</Option>
                                            <Option value="Medium">Medium</Option>
                                            <Option value="Large">Large</Option>
                                            <Option value="Pinch">Pinch</Option>
                                            <Option value="To Taste">To Taste</Option>
                                            <Option value="As Required">As Required</Option>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Button type="submit"
                                sx={{mt: 1, width: '100%', bgcolor: '#e2603a', 
                                '&:hover': {bgcolor: 'rgba(226, 97, 58, 0.9)'}}}> 
                                <AddIcon sx={{fontSize: 16}} />Add Ingredients
                                </Button>
                            </form>
                        </Box>

                        <Divider sx={{my: 2}}/>

                        {/* Displaying ingredients */}
                        <Box sx={{ maxHeight: { xs: 'none', lg: 345 }, overflow: 'auto' }}>
                            <Typography level="title-md" fontSize={'sm'} sx={{mx: 1}}>Ingredints Review:</Typography>

                            {data.ingredients.length === 0 ? (
                                <Typography level="body-sm">
                                    No Ingredients added yet!
                                </Typography>
                            ) : (
                                <Box sx={{mt: 1}}>
                                    {data.ingredients.map((item, index) => (
                                        <Box key={index} sx={{display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', px: 2, m: 1,
                                        borderRadius: 8, bgcolor: '#97b2ad', }}>
                                            <Typography sx={{ color: '#faf6ee', flex: 1, minWidth: 0, overflowWrap: 'anywhere'}}>
                                                {item.quantity} {item.unit}-{item.name}</Typography>
                                            <Button onClick={() => handleRemove(index)} 
                                            sx={{flexShrink: 0, bgcolor: '#97b2ad', '&:hover': {bgcolor: '#5b84a3'}}} 
                                            >X</Button>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                        
                    </Box>

                    <Divider orientation="vertical" sx={{ display: { xs: 'none', lg: 'block' } }} />
                    <Divider sx={{ display: { xs: 'block', lg: 'none' }, my: 1 }} />
                    
                    {/* ============ INSTRUCTION LIST ============= */}
                    <Box sx={{flex: 1, minWidth: 0,}}>
                        <Typography level="h3" sx={{fontSize: { xs: 22, md: 28 },justifySelf: 'center', my: 1,}}>Add the Steps to cook it right</Typography>
                        
                        <Box sx={{mx: 1}}>
                            <Typography sx={{fontWeight: 'bold', fontSize: 14}}>Add Instructions</Typography>
                            <form onSubmit={handleAddInstruction}>
                                <FormControl required
                                    sx={{mb: 1,}}  >
                                    <FormLabel sx={{display: {xs: 'none', sm: 'block'} }}>Instruction</FormLabel>
                                    <Textarea minRows={4}
                                        placeholder="Add the instruction step by step"
                                        name="instruction"
                                        value={currentInstruction.description}
                                        onChange={(e) => setCurrentInstruction({ ...currentInstruction, description: e.target.value })}
                                    />
                                </FormControl>

                                <Button type="submit" sx={{mt: 1, width: '100%', bgcolor: '#e2603a', '&:hover': {bgcolor: 'rgba(226, 97, 58, 0.9)'}}}> 
                                    <AddIcon sx={{fontSize: 16}} />Add Instruction
                                </Button>
                            </form>
                        </Box>
                        
                        <Divider sx={{my: 2}} />

                        {/* Displaying instructions */}
                        <Box sx={{ maxHeight: { xs: 'none', lg: 345 }, overflow: 'auto' }}>
                            <Typography level="h4" fontSize={'sm'} sx={{mx: 1}}>Instructions:</Typography>
                            {data.instructions.length === 0 ?(
                                <Typography level="body-sm">
                                    No Instructions added yet!
                                </Typography>
                            ):(
                                <Box sx={{mt: 1}}>
                                    {data.instructions.map((item, index) => (
                                        <Box key={index} sx={{display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', px: 2, m: 1,
                                        borderRadius: 8, bgcolor: '#a9d18e', }}>
                                            <Typography sx={{ color: '#faf6ee', flex: 1, minWidth: 0, overflowWrap: 'anywhere'}}>
                                                {item.stepNumber}: {item.description}</Typography>
                                            {/* <Box> */}
                                                {/* <Button sx={{bgcolor: '#a9d18e', '&:hover': {bgcolor: '#a9d18e'}}} >Edit</Button> */}
                                            <Button onClick={() => handleRemoveInstruction(index)}
                                            sx={{flexShrink: 0, bgcolor: '#a9d18e', '&:hover': {bgcolor: '#a9d18e'}}} >X</Button>
                                            {/* </Box> */}
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                        
                    </Box>
                </Box>
                {/* SAVE BUTTON */}
                <Box sx={{mt: 'auto', width: '100%', maxWidth: 1200}}>
                    <Button
                    onClick={onSubmit}
                    sx={{
                        width: '100%', mb: 2, borderRadius: 100, bgcolor: '#f2a541',
                        '&:hover': {bgcolor: "#f2a541f2"}
                    }}>Save Changes</Button>
                </Box>
            </Box>
            
        </Sheet>
    )
}
export default CookingDetails