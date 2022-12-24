import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClientProvider, QueryClient} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import HomePage from './components/Home.page';
import RQSuperHeroesPage from './components/RQSuperHeroes.page';
import SuperHeroesPage from './components/SuperHeroes.page';
import './App.css';
import FetchDataByUser from './components/FetchDataByUser';
import RQSuperHeroe from './components/RQSuperHeroe';
import ParallelQueries from './components/ParallelQueries';
import DynamicParallel from './components/DynamicParallel';
import DependentQueries from './components/DependentQueries';
import PaginatedQueries from './components/PaginatedQueries';
import InfiniteQueries from './components/InfiniteQueries';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/super-heroes'>Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
            <li>
              <Link to='/products'>Products</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
            </li>
            <li>
              <Link to='/heroes'>Get Heroes</Link>
            </li>
            <li>
              <Link to='/animes'>Animes</Link>
            </li>
            <li>
              <Link to='/animes-heroes'>Animes/Heroes</Link>
            </li>
            <li>
              <Link to='/dependent'>Dependent</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/heroes' element={<FetchDataByUser />} />
          <Route path='/users' element={<PaginatedQueries />} />
          <Route path='/products' element={<InfiniteQueries /> } />
          <Route path='/heroes/:heroId' element={<RQSuperHeroe />} />
          <Route path='/super-heroes' element={<SuperHeroesPage />} />
          <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
          <Route path='/animes-heroes' element={<ParallelQueries />} />
          <Route path='/animes' element={<DynamicParallel animeIds={[1,2]} />} />
          <Route path='/dependent' element={<DependentQueries email="yomi@test.com" />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
