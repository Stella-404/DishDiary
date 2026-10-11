import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import { AuthProvider } from "./Components/AuthContext";
// import { PrivateRoutes } from "./Components/PrivateRoutes";
// import Homepage from "./Pages/Homepage";
// import Recipes from "./Pages/Recipes";
// import Mealplanner from "./Pages/MealPlanner";
// import Shoppinglist from "./Pages/ShoppingList";
// import Favourites from "./Pages/Favourites";
// import AddRecipeWizard from "./Pages/AddRecipeWizard";
// import RecipeDetails from "./Pages/RecipeDetails";

function App() {
  return (
    <>
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route element={<PrivateRoutes />} >
              <Route element={<Recipes />} path="/Homepage"></Route>
              <Route element={<Mealplanner />} path="/Mealplanner"></Route>
              <Route element={<Shoppinglist />} path="/Shoppinglist"></Route>
              <Route element={<Favourites />} path="/Favourites"></Route>
              <Route element={<RecipeDetails />} path="/recipes/:id"></Route> */}
              {/* Since we have our forms sharing the same state in the AddRecipeWizard, which manages and pass
              down he required props to our separeate pages, hence the route will go through the wizard */}
              {/* <Route element={<AddRecipeWizard />} path="/Recipe/new"></Route> */}
              {/* For when to lead to the edit form; with the values filled */}
              {/* <Route element={<AddRecipeWizard />} path="/recipe/:id/edit"></Route> */}

            {/* </Route> */}
            {/* <Route element={<Homepage />} path="/Homepage"></Route> */}
            <Route element={<Registration />} path="/Registration"></Route>
            <Route element={<Login />} path="/Login"></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;