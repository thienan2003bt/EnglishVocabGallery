import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import IndexRoute from './routes/IndexRoute';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
    return (
        <div className="App">
            <Header />

            <div className='app-container'>
                <IndexRoute />
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <Footer />
        </div>
    );
}

export default App;
