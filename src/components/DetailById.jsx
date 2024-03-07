import React, { useState } from "react";


function DetailById({ place}) {

  const [data, setData] = useState({
    id: place.id,
    comment: "",
  });
  const serverName = 'http://localhost/apimanga/';
  const [submittedWithoutRating, setSubmittedWithoutRating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: name === "rating" ? parseFloat(value) : value,
    }));
  };
  const [showModal, setShowModal] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save comment and rating to the backend
    console.log(serverName);
    fetch(serverName, {
      method: 'CREATE', // Use 'POST' for creating a new resource
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
      .then((response) => response.json())
      .then((responseData) => {
          console.log(responseData);
          // Clear comment field
          setData((prevData) => ({
              ...prevData,
              comment: '',
          }));
      })
      .catch((error) => {
          console.error('Error:', error);
      });
      window.location.reload(); 
};

  return (
    <div>
       <button
        className=" bg-sky-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        รายละเอียด
      </button>
      {showModal ? (
        <>
         <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
           <div className="relative w-auto my-6 mx-auto max-w-md max-h-full">

              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                  <p>{place.manganame}</p>
                  </h3>
                 
                </div>
                {/*body*/}
    
            
                <div className="relative p-6 flex-auto ">
                
                <div className="flex justify-center mb-4">
                  <img
                    className="h-80 object-cover"
                    src={place.img}
                    alt={place.manganame}
                  />
                </div>
               
                <p className="text-black text-lg leading-relaxed">เรื่องย่อ <br />{place.descript}</p>
                <p className="my-4 text-red-500 text-xl leading-relaxed">ราคา {place.price}</p>
                <p className="my-4 text-blue-500 text-xl leading-relaxed">สถานะ {place.mangastatus}</p>
                <div>
                  <p className="font-semibold">ความคิดเห็น</p>
                  <ul>
                    {Object.values(place.comment).map((comment, index) => (
                      <li key={index}>
                        {comment.comment_text}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="font-semibold">เพิ่มความคิดเห็น</p>
                {submittedWithoutRating && (
                  <p className="text-red-500">
                    กรุณาให้ความคิดเห็นก่อนกดส่งความคิดเห็น
                  </p>
                )}
                <form onSubmit={handleSubmit}>
                  
                  <div className="mb-4">
                    <textarea
                      className="w-full p-2 border rounded"
                      rows={4}
                      name="comment"
                      value={data.comment}
                      onChange={handleChange}
                      placeholder="แสดงความคิดเห็น"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    ส่งความคิดเห็น
                  </button>
                </form>
           
              
              </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            
                
             
        </>
      ) : null}
    </div>
  );
}

export default DetailById;
