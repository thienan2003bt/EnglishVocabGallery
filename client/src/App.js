import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import IndexRoute from './routes/IndexRoute';

function App() {
  return (
    <div className="App">
      <Header />

      <div className='app-container'>
        <IndexRoute />
      </div>
      <Footer />
    </div>
  );
}

export default App;
