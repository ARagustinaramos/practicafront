//REACT-REDUX
import { useState ,useSelector} from "react";

//COMPONENTES
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";


import { useAuth0 } from '@auth0/auth0-react';
import HistorialDePedidos from "./components/HistorialDePedidos";
import HistorialDeCompras from './components/HistorialDeCompras'


const DashboardUser = () => {
  const { user , isLoading} = useAuth0();

  console.log('user', user)

  return(
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen  dark:bg-gray-900 md:py-5">
      <Sidebar/>
      <main className=" xl:col-span-5 dark:bg-gray-900 p-8">
        <Header/>
        {/* Section 1 */}
        <section className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 mt-6">
          {/* Historial de pedidos */}
          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-2 mt-10 gap-8">
            <HistorialDePedidos />
            <div className="grid grid-cols-2 xl:col-span-1 md:grid-cols-2 xl:grid-cols-2 mt-6">
            <HistorialDeCompras />
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
          

          <div>
            <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col ">
            <h1 className="text-2xl font-bold mb-8">Novedades</h1>
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                  <img
                    src="/assets/Mouse2.jpg"
                    className="w-14 h-14 object-cover rounded-full"/>
                  <div>
                    <h3 className="font-bold">Mouse logitech</h3>
                    <p className="text-gray-500">Subido hace 3 hs</p>
                  </div>
                </div>
              </div>
              </div>
        </section>
      </main>
    </div>
  );
}


export default DashboardUser;