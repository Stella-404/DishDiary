// Creating the model requred here

interface UserRegisterModel{
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

interface UserLoginModel{
    email: string,
    password: string
}

interface Ingredients{
    name: string,
    quantity: number | '',
    unit: string,
}

interface Instructions{
    stepNumber: number | '',
    description: string
}

interface Tags{
    id: number,
    name: string
}

interface RecipeDataModel{
    title: string,
    description: string,
    cuisine: string,
    category: string,
    prepTime: number | '',
    cookTime: number | '',
    servings: number | '',
    difficulty: string,
    image: File | string
    tags: Tags[],
    ingredients: Ingredients[],
    instructions: Instructions[]
}

interface DisplayRecipeModel{
    id: number,
    title: string,
    description: string,
    category: string,
    cuisine: string,
    is_favorite: boolean,
    tags: Tags[],
}

interface RecipeDetailsModel{
    id: number,
    title: string,
    description: string,
    cuisine: string,
    category: string,
    prep_time: number,
    cook_time: number,
    servings: number,
    difficulty: string,
    image: string,
    tags: Tags[],
    ingredients: Ingredients[],
    instructions: Instructions[]
}

interface MealPlanner{
    id: number,
    recipe_id: number,
    day_of_week: number,
    recipeTitle: string;
    cook_time: number;
    date: string;
    meal_slot: string;
}

interface ShoppingList{
    id: number
    ing_name: string
    total_quantity: number
    unit: number
    is_purchased: boolean
}

interface JWT_Token{
    username: string,
    email: string,
    id: number,
    exp: number,
}

// FOR AUTH CONTEXT/ AUTH PROTECTION
interface User{
    name: string;
    user_id: number;
}

interface AuthContextType{
    activeUser: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export {type UserRegisterModel, type UserLoginModel, type RecipeDataModel, type RecipeDetailsModel, type Ingredients, type Instructions, type Tags, type DisplayRecipeModel, type MealPlanner, type ShoppingList, type JWT_Token, type User, type AuthContextType}