import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {QubicConnectCombinedProvider} from './contexts/QubicConnectContext'
import {HM25Provider} from './contexts/HM25Context'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import StartPage from './pages/StartPage'
import EchoPage from './pages/EchoPage'
import BurnPage from './pages/BurnPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import MilestonesPage from './pages/MilestonesPage'
import AddProjectPage from './pages/AddProjectPage'
import {Toaster} from 'react-hot-toast'
import {ConfigProvider} from "./contexts/ConfigContext"
import { motion } from 'framer-motion';
import { fadeInUp } from '../src/components/utils/animations.js';

export function Layout({ children }) {
  return (
    <motion.div 
      className="flex flex-col min-h-screen"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <Header />
      <motion.main className="flex-1" variants={fadeInUp}>
        {children}
      </motion.main>
      <Footer />
    </motion.div>
  );
  

  }

function App() {
    return (
        <ConfigProvider>
            <QubicConnectCombinedProvider>
                <HM25Provider>
                    <BrowserRouter>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<StartPage/>}/>
                                <Route path="/echo" element={<EchoPage/>}/>
                                <Route path="/burn" element={<BurnPage/>}/>
                                <Route path="/projects" element={<ProjectsPage/>}/>
                                <Route path="/projects/add" element={<AddProjectPage/>}/>
                                <Route path="/project/:id" element={<ProjectDetailsPage />} />
                                <Route path="/project/:id/milestones" element={<MilestonesPage />} />
                            </Routes>
                            <Toaster
                                position="top-right"
                                toastOptions={{
                                    style: {
                                        background: "#202E3C",
                                        color: "#fff",
                                    },
                                }}
                            />
                        </Layout>
                    </BrowserRouter>
                </HM25Provider>
            </QubicConnectCombinedProvider>
        </ConfigProvider>
    )
}

export default App
