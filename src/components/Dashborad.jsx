import React, { useEffect, useState, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Dashborad() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    manganame: "",
    descript: "",
    img: "",
    price: "",
    mangastatus: "",
  });
  const [selectedPlace, setSelectedPlace] = useState(null);
  const formRef = useRef(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
   
    fetch("http://localhost/apimanga/")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  };

  const handleFormOpen = () => {
    setSelectedPlace(null);
    setFormData({
        id: "",
        manganame: "",
        descript: "",
        img: "",
        price: "",
        mangastatus: "",
    });
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedPlace) {
   
      fetch(`http://localhost/apimanga/${selectedPlace.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((updatedPlace) => {
   
          setData(
            data.map((place) =>
              place.id === updatedPlace.id ? updatedPlace : place
            )
          );
          setFormData({
            id: "",
            manganame: "",
            descript: "",
            img: "",
            price: "",
            mangastatus: "",
          });
          setShowForm(false);
          window.alert("แก้ไขข้อมูลสำเร็จ !! ทำการรีเฟรชหน้า");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating data to the API:", error);
        });
    } else {
      fetch("http://localhost/apimanga/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((newPlace) => {
          setData([...data, newPlace]);
          setFormData({
            id: "",
            manganame: "",
            descript: "",
            img: "",
            price: "",
            mangastatus: "",
          });
          setShowForm(false);
        })
        .catch((error) => {
          console.error("Error sending data to the API:", error);
        });
      window.alert("เพิ่มข้อมูลสำเร็จ !! ทำการรีเฟรชหน้า");
      window.location.reload();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = (id) => {
    const confirmed = window.confirm("ต้องการแก้ไขหรือไม่ ?");
    if (confirmed) {
      const placeToEdit = data.find((place) => place.id === id);
      if (placeToEdit) {
        setSelectedPlace(placeToEdit);
        setFormData({
          id: placeToEdit.id,
          manganame: placeToEdit.manganame,
          descript: placeToEdit.descript,
          img: placeToEdit.img,
          price: placeToEdit.price,
          mangastatus: placeToEdit.mangastatus,
        });
        setShowForm(true);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("ต้องการลบข้อมูลหรือไม่ ?");
    if (confirmDelete) {
      fetch(`http://localhost/apimanga/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), 
      })
        .then((response) => response.json())
        .then(() => {
        
          setData(data.filter((place) => place.id !== id));
          window.location.reload(); 
        })
        .catch((error) => {
          console.error("Error deleting data from the API:", error);
        });
    } else {
      console.log("Deletion canceled.");
    }
  };
  
 
    const handleClick=()=>{
        localStorage.clear();
        window.location.reload();
    }

  
  return (
    
    <div className="mt-8 ml-8">
      
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleFormOpen}
    >
      เพิ่มข้อมูล
    </button>

    {showForm && (
      <div ref={formRef} className="mt-5">
        <form onSubmit={handleSubmit} className="max-w-2xl">
          <input
            type="text"
            className="border rounded w-full py-2 px-3 mb-4"
            placeholder="ชื่อมังงะ"
            name="manganame"
            value={formData.manganame}
            onChange={handleInputChange}
          />
        
        <textarea
            className="border rounded w-full py-2 px-3 mb-4 resize-y"
            placeholder="เรื่องย่อ"
            name="descript"
            value={formData.descript}
            onChange={handleInputChange}
            rows={4}
          />
          <input
            type="text"
            className="border rounded w-full py-2 px-3 mb-4"
            placeholder="รูปภาพ"
            name="img"
            value={formData.img}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="border rounded w-full py-2 px-3 mb-4"
            placeholder="ราคา"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="border rounded w-full py-2 px-3 mb-8"
            placeholder="สถานะ"
            name="mangastatus"
            value={formData.mangastatus}
            onChange={handleInputChange}
          />
          <div className="flex">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-3"
            >
              {selectedPlace ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
              onClick={handleFormClose}
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    )}

    <div className="mt-8">
    <div className="mt-4">
   
            
    <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mr-2 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 ${
            currentPage * itemsPerPage >= data.length ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= data.length}
        >
          Next
        </button>
      </div>
      
      <div className="mt-4 ">
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 " onClick={handleClick}>Logout</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border">ลำดับ</th>
              <th className="border">ชื่อ</th>
              <th className="border">เรื่องย่อ</th>
              <th className="border">รูปภาพ</th>
              <th className="border">ราคา</th>
              <th className="border">สถานะ</th>
              <th className="border">เเก้ไข้/ลบข้อมูล</th>
            </tr>
          </thead>
          <tbody>
            
            {data.sort((a, b) => a.id - b.id)
           .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((place) => (
              <tr key={place.id} className="border">
                <td className="border px-4 py-2">{place.id}</td>
                <td className="border px-4 py-2">{place.manganame}</td>
                <td className="border px-4 py-2">{place.descript}</td>
                <td className="border px-4 py-2 w-40 h-full">
                  <img src={place.img} alt={place.name} className=" h-full " />
                </td>
                <td className="border px-4 py-2">{place.price}</td>
                <td className="border px-4 py-2">{place.mangastatus}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mr-2"
                    onClick={() => handleEdit(place.id)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3"
                    onClick={() => handleDelete(place.id)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
  ))}
          </tbody>
        </table>
      </div>
    </div>
   
  </div>
);
}


export default Dashborad;
