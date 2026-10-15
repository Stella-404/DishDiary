import { Box, Button, Divider, Drawer, FormControl, Input, Select, Typography, Option } from "@mui/joy"
import KitchenIcon from '@mui/icons-material/Kitchen';
import StoreIcon from '@mui/icons-material/Store';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./AvatarDropdown";

interface NavBarProps {
    searchVal: string
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

    open: boolean;
    onOpen: () => void;
    onClose: () => void;
    recipes: any[];
    category: string;
    setCategory: (val: string) => void;
    cuisine: string;
    setCuisine: (val: string) => void;
    // selectedTag: string;
    // setSelectedTag: (val: string) => void;
}

function Navigationbar({searchVal, onSearchChange,
    open, onOpen, onClose, recipes, category, setCategory, cuisine, setCuisine,
    // selectedTag, setSelectedTag,
}: NavBarProps){

    const navigate = useNavigate();

    const categories = ['All', ...Array.from(new Set(recipes.map((r) => r.category)))];
    const cuisines = ['All', ...Array.from(new Set(recipes.map((r) => r.cuisine)))];
    // const tags = ['All', ...Array.from(new Set(recipes.flatMap((r) => r.tags)))];

    const handleReset = () => {
        setCategory('All');
        setCuisine('All');
        // setSelectedTag('All');
    };

    return(
        <Box sx={{
            display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, zIndex: 1000, bgcolor: '#faf6ee'
        }}>

            <Box sx={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between',p: 0.5, 
            }}>
                <Typography level="h2" fontFamily={"'Vollkorn SC', serif"} sx={{fontSize: 43, ml: 6, color: '#2e332a',}}>DishDiary</Typography>
                <Box sx={{mr: 4}}>
                    <ProfileDropdown />
                </Box>
            </Box>

            {/* Header 2.0 */}
            <Box sx={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between',px: 2, py: 0.5, mb: 2,
            }}>

                {/* 2.0 LEFT */}
                <Box sx={{
                    display: 'flex', flexDirection: 'row', gap: 2,
                }}>
                    {/* ------ RECIPE BUTTON ------ */}
                    <Button size="sm" startDecorator={<MenuBookOutlinedIcon sx={{fontSize: 18}} />} 
                    sx={{
                        bgcolor: '#5b84a3', border: "solid 1.5px #5b84a3", borderRadius: 60, color: '#faf6ee',
                        '&:hover': {bgcolor: '#5b84a3e5', }
                    }}
                    onClick={()=> navigate('/Homepage')}> 
                    Recipes
                    </Button>
                    {/* ------ MEAL BUTTON ------ */}
                    <Button size="sm" startDecorator={<KitchenIcon sx={{fontSize: 18}} />} 
                    sx={{
                        bgcolor: '#5a9140', border: "solid 1.5px #5a9140", borderRadius: 60, color: '#faf6ee',
                        '&:hover': {bgcolor: '#5a9140e6', }
                    }}
                    onClick={()=> navigate('/Mealplanner')}> 
                    Meals
                    </Button>
                    {/* ------ SHOPPING BUTTON ------ */}
                    <Button size="sm" startDecorator={<StoreIcon sx={{fontSize: 18}} />} 
                    sx={{
                        bgcolor: '#3d6b2c', border: "solid 1.5px #5a9140", borderRadius: 60, color: '#faf6ee',
                        '&:hover': {bgcolor: '#3d6b2ce6', }
                    }}
                    onClick={()=> navigate('/Shoppinglist')}> 
                    Shopping List
                    </Button>
                    {/* ------ FAVORITE BUTTON ------ */}
                    <Button size="sm" startDecorator={<FavoriteBorderOutlinedIcon sx={{fontSize: 18}} />} 
                    sx={{
                        bgcolor: '#e2603a', border: "solid 1.5px #e2603a", borderRadius: 60, color: '#faf6ee',
                        '&:hover': {bgcolor: '#e2613ae4', }
                    }}
                    onClick={()=> navigate('/Favourites')}> 
                    Favourite
                    </Button>
                </Box>
                
                    {/* 2.0 RIGHT */}
                <Box sx={{
                    display: 'flex', flexDirection: 'row', gap: 2,
                }}>
                    {/* ------ SEARCH BAR ------ */}
                    <FormControl>
                    <Input
                        startDecorator={<SearchIcon />}
                        sx={{
                            bgcolor: "#f1eeee",
                            color: "black",
                            boxShadow: 'none',
                        }}
                        placeholder="Search your Recipe"
                        type="search"
                        value={searchVal}
                        onChange={onSearchChange}
                    />
                    </FormControl>
                    {/* ------ FILTER BUTTON ------ */}
                    <Button size="sm"
                    onClick={onOpen}
                    sx={{
                        bgcolor: '#faf6ee', border: "solid 1.5px #a9d18e", borderRadius: 60, width: 30, height: 30, color: '#40682e',
                        '&:hover': {bgcolor: '#a9d18e50', }
                    }}>
                    <TuneIcon sx={{fontSize: 18, color: '#2e332a'}} />
                    </Button>
                    {/* TUNE DRAWEWR */}
                    <Drawer anchor="right" open={open} onClose={onClose} size="sm">
                        <Box sx={{ p: 3, width: 200, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography level="title-lg">Filter Recipes</Typography>

                            {/* Category Filter */}
                            <Box>
                            <Typography level="body-sm" sx={{ mb: 1 }}>Category</Typography>
                            <Select value={category} onChange={(_, val) => val && setCategory(val)}>
                                {categories.map((cat) => (
                                <Option key={cat} value={cat}>{cat}</Option>
                                ))}
                            </Select>
                            </Box>

                            {/* Cuisine Filter */}
                            <Box>
                            <Typography level="body-sm" sx={{ mb: 1 }}>Cuisine</Typography>
                            <Select value={cuisine} onChange={(_, val) => val && setCuisine(val)}>
                                {cuisines.map((cui) => (
                                <Option key={cui} value={cui}>{cui}</Option>
                                ))}
                            </Select>
                            </Box>

                            {/* Tag Filter */}
                            {/* <Box>
                            <Typography level="body-sm" sx={{ mb: 1 }}>Tag</Typography>
                            <Select value={selectedTag} onChange={(_, val) => val && setSelectedTag(val)}>
                                {tags.map((tag) => (
                                <Option key={tag} value={tag}>{tag}</Option>
                                ))}
                            </Select>
                            </Box> */}

                            {/* Action Buttons */}
                            <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
                            <Button variant="outlined" color="neutral" onClick={handleReset}
                            sx={{
                                borderRadius: 60, color: '#2e332ae3', borderColor: '#2e332a78'
                            }}>
                                Reset
                            </Button>
                            <Button onClick={onClose}
                            sx={{
                                bgcolor: '#5b84a3', border: "solid 1.5px #5b84a3", borderRadius: 60, color: '#faf6ee',
                                '&:hover': {bgcolor: '#5b84a3e5', }
                            }}>
                                Apply Filters
                            </Button>
                            </Box>
                        </Box>
                    </Drawer>

                    {/* ------ ADD RECIPE BUTTON ------ */}
                    <Button size="sm" startDecorator={<AddIcon sx={{fontSize: 18}} />} 
                    sx={{
                        bgcolor: '#f2a541', border: "solid 1.5px #f2a541", borderRadius: 60, color: '#faf6ee',
                        '&:hover': {bgcolor: '#f2a541e6',  }
                    }} 
                    onClick={()=> navigate('/Recipe/new')}> 
                    Add Recipe
                    </Button>
                </Box>
            </Box>

            <Divider sx={{height: 4, mb:1}} />
        </Box>
    )
}

export default Navigationbar