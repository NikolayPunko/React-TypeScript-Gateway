import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {OrdersPage} from "./pages/OrdersPage";
import {Order} from "./pages/Order";
import {Authorization} from "./pages/Authorization";
import {ProductEditorJSON} from "./pages/ProductEditorJSON";


function App() {
    return (
        <>

            <Routes>
                <Route path="/" element={<OrdersPage/>}/>
                {/*<Route path="/" element={<OrdersPage/>}>*/}
                {/*    <Route path=":id" element={<Order/>} />*/}
                {/*    <Route path="/order:id/edit" element={<LanguageEditor/>} />*/}
                {/*</Route>*/}





                <Route path="/:id" element={<Order/>}/>
                <Route path="/:id/edit" element={<ProductEditorJSON/>}/>
                <Route path="/login" element={<Authorization/>}/>



                <Route path="*" element={<h2>Ресурс не найден</h2>} />


            </Routes>
        </>
    );
}

export default App;
