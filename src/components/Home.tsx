// import { dummyData } from '../dummyData'
import { useEffect, useState, useRef } from 'react';
import './../index.css'
import type { Recipe } from '../dummyData'
import Modal from './modal/Modal';

function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe|null>(null)
  const [recipeData, setRecipeData] = useState<Recipe[]>([]);
  const [query, setQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response = await fetch('http://localhost:3000/recipes');
        if(response.status === 200){
          const data = await response.json();
          setRecipeData(data);
          setNoResults(data.length === 0);
        }
      }catch(err){
        console.error('Error fetching recipe data:', err);
      }
    }
    fetchData();
  }, [])


    useEffect(()=>{
      const q = query.trim();

      // If query is empty, keep the initial list and clear loading/no-results
      if(q === ''){
        setLoading(true);
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    fetch('http://localhost:3000/recipes', { signal: ctrl.signal })
      .then(r => r.json())
      .then(data => { setRecipeData(data); setNoResults(data.length === 0); })
      .catch(err => { if (err.name !== 'AbortError') console.error(err); })
      .finally(() => setLoading(false));
    return;
      }

      const timer = setTimeout(()=>{
          setLoading(true);
          // cancel previous request
          abortRef.current?.abort();
          const ctrl = new AbortController();
          abortRef.current = ctrl;

          // Use your search endpoint (json-server supports ?q=, Express example uses /recipes/search?q=)
          const url = `http://localhost:3000/recipes/search?q=${encodeURIComponent(q)}`;

          fetch(url, { signal: ctrl.signal }).then(res => res.json())
          .then(data=>{
            setRecipeData(data);
            setNoResults(Array.isArray(data) && data.length === 0);
          }).catch(err=>{
             if (err.name !== 'AbortError') console.error('Search Error',err); 
          }).finally(()=>{
            setLoading(false);
          })
      },350);

      return () => {
        clearTimeout(timer);
        // do not abort here; we abort when starting a new request or unmount
      };
    },[query])

  const handleListClick = (el: Recipe) =>{
  setSelectedRecipe(el)
  setModalOpen(true)  
}


  return (
    <div style={{
      backgroundImage: 'url(/food.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        marginBottom: '30px',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        maxWidth: '600px',
        margin: '20px auto 30px'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#333',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          🔍 <span>Filter Recipe</span>
        </div>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <input 
            type='text' 
            placeholder='Enter recipe name...' 
            className='search-input'
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '12px 16px',
              fontSize: '16px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
            value = {query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* <button className='search-btn' style={{
            padding: '12px 28px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '8px',
            marginLeft: '0',
            transition: 'all 0.3s ease'
          }} onClick={searchRecipe}>
            Search
          </button> */}
        </div>
      </div>
      {loading ? (
        <div style={{textAlign: 'center', color: '#333', marginTop: 20}}>
          Searching...
        </div>
      ) : noResults ? (
        <div style={{textAlign: 'center', color: '#666', marginTop: 20}}>
          No recipes found.
        </div>
      ) : (
        <ul className="listStyle">
          {recipeData.map(data=>(
            <li key={data.id} onClick={()=>handleListClick(data)}>{data.name}</li>
          ))}
        </ul>
      )}
      <Modal isOpen={isModalOpen} onClose ={() => setModalOpen(false)}>
        {selectedRecipe && 
        (
        <>
          <h1> Recipe Details</h1>
          <h3 style={{color:'blue'}}>{selectedRecipe.name}</h3>
          <img src={selectedRecipe?.image} alt={selectedRecipe?.name} className='imageClass'></img>
          <p><strong>Ingredients: </strong>{selectedRecipe?.ingredients?.join(", ")}</p>
          <ul>
            {selectedRecipe?.instructions?.map(el=>{
              return <li>{el}</li>
            })}
          </ul>
        </>
        )}
      </Modal>
    </div>
  )
}

export default Home
