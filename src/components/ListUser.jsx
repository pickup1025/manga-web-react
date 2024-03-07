import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import DetailById from "./DetailById";
 function ListUser({ user,serverName }) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
 

  useEffect(() => {
    // Fetch data from an API
    fetch(serverName)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setData(data);
       
      });
  }, []);

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substr(0, maxLength) + "...";
    }
  }

  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);  
  };

  const filteredUsers = data.filter((user) =>
    user.manganame.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.descript.toLowerCase().includes(searchTerm.toLowerCase())||
    user.price.toLowerCase().includes(searchTerm.toLowerCase())

  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  return (
    
    <div className="container mx-auto px-9 py-8 ">
      
      <Carousel 
      autoPlay
      infiniteLoop
      interval={4000}
      className=" rounded-xl max-w-screen-lg mx-auto ">
      <img
      className=""
        src="japanese-manga.jpg"
        alt="image 1"
       
      />
      <img
        src="the-10-best-manga-to-read-in-2022-as-recommend-by-japanese-bookstores-01.webp"
        alt="image 2"
      
      />
      <img
        src="mggcsrv4bje51.png"
        alt="image 3"
      />
      <img
        src="You-Should-Read-This-Manga-Banner.png"
        alt="image 3"
        style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}  
      />
       <img
        src="bluelockepisodenagi_teaservisual-1-e1692201989585.webp"
        alt="image 3"
      />
    </Carousel>
      <div >
        <input
          type="text"
          placeholder="ค้นหา..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-600 px-4 py-2 rounded mb-4 w-full"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
        {currentItems.map((user, key) => (
          <div key={key} className="bg-white rounded shadow p-6 h-full relative" >
            
             
            <div className="aspect-w-3 aspect-h-2 mb-2">
              <img
                className="object-cover w-86 h-96 rounded"
                src={user.img}
                alt={user.manganame}
              />
            </div>
            
            <h2 className="text-xl font-bold mb-2">{user.manganame}</h2>
            <p className="text-gray-700 whitespace-normal">{truncateText(user.descript, 100)}</p>
          
            <p className="text-blue-700">สถานะ {user.mangastatus}</p>
            <p className="text-red-600">ราคา {user.price}</p>
            <DetailById place={user} serverName={serverName} />
         
     
            
          </div>
        ))}
        
      </div>
<div className=" flex  justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`bg-black-200 px-3 py-1 rounded ${
              pageNumber === currentPage ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      
      
     
    </div>
  );
}
export default ListUser;
