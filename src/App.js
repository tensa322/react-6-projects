import { React, useEffect } from 'react';
import './index.scss';
import { Collection } from './Collection';
import { useState } from 'react';

const cats = [
   { "name": "Все" },
   { "name": "Море" },
   { "name": "Горы" },
   { "name": "Архитектура" },
   { "name": "Города" }
]

function App() {
   const [collections, setCollections] = useState([])
   const [searchValue, setSearchValue] = useState('')
   const [categoryId, setCategoryId] = useState(0)
   const [isLoading, setIsLoading] = useState(true)
   const [page, setPage] = useState(1)

   useEffect(() => {
      setIsLoading(true)
      fetch(`https://63380b7f5327df4c43dc204d.mockapi.io/Photo_collections?page=${page}&limit=3&${category}`,)
         .then((res) => res.json())
         .then((json) => {
            setCollections(json)
         })
         .catch((err) => {
            console.warn(err)
            alert('Ошбика при получении данных')
         }).finally(()=> setIsLoading(false))
   }, [categoryId, page])

const category = categoryId ? `category=${categoryId}` : ''

   return (
      <div className="App">
         <h1>Моя коллекция фотографий</h1>
         <div className="top">
            <ul className="tags">
               {cats.map((obj, i) => <li
                  onClick={() => setCategoryId(i)}
                  className={categoryId === i ? 'active' : ''} key={obj.name}>{obj.name}</li>)}
            </ul>
            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
         </div>
         <div className="content">
            {isLoading ? (<h2>Идет загрузка...</h2>
            ) : (
               collections.filter((obj) => obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
                  ).map((obj, index) => (
                     <Collection key={index} name={obj.name} images={obj.photos} />
                  ))
            )}
         </div>
         <ul className="pagination">
                     {[...Array(5)].map((_,i) => (
                        <li 
                        onClick={() => setPage(i+1)}
                        className={page === i+1 ? 'active' : ''}>{i+1}</li>
                     ))}
         </ul>
      </div>
   );
}

export default App;
