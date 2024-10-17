// import Swal from "sweetalert2";
// import { useAuth } from "../../CMSAdmin/Auth/AuthContext";
// import useFetch from "../useFetch";
// import { forwardRef, useImperativeHandle } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const TermsandConditions = forwardRef(({ onEdit, onDelete }, ref) => {
//   useImperativeHandle(ref, () => ({
//     childFunction,
//   }));
//   const { isAuthenticated, isAdminPage } = useAuth();

//   const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

//   const { data: termsandconditions, refetch } = useFetch(
//     `${API_URL}/api/termsandconditions`
//   );
//   console.log("service content: ", termsandconditions);

//   const childFunction = (newUser) => {
//     // console.log("test function:", newUser);
//     refetch();
//   };

//   const handleDeleteClick = (termId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       cancelButtonColor: "#3085d6",
//       confirmButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         onDelete(termId);
//       }
//     });
//   };

//   const handleDragEnd = (result) => {
//     // Handle reordering logic here
//   };

//   return (
//     <>
//       {/* ======= Terms and Conditions ======= */}
//       <div
//         className="hero hero-single route bg-image"
//         alt="Blog Details"
//         style={{ backgroundImage: "url(../assets/img/overlay-bg.jpg)" }}
//       >
//         <div className="overlay-mf"></div>
//         <div className="hero-content display-table">
//           <div className="table-cell">
//             <div className="container">
//               <h2 className="hero-title mb-4">TERMS AND CONDITIONS</h2>
//             </div>
//           </div>
//         </div>
//       </div>

//       {termsandconditions && (
//         <section id="conditions" className="conditions-mf pt-5 route">
//           <div className="container">
//             <div className="row">
//               {termsandconditions.map((term) => (
//                 <div className="col-md-4" key={term._id}>
//                   <div className="conditions-box">
//                     {isAuthenticated && isAdminPage && (
//                       <div className="admin-actions d-flex justify-content-end align-items-start">
//                         <button
//                           className="admin-btn btn btn-primary btn-sm"
//                           aria-label="Edit"
//                           onClick={() => onEdit(term)}
//                         >
//                           <i className="bi bi-pencil" />
//                         </button>
//                         <button
//                           className="admin-btn btn btn-danger btn-sm mx-1"
//                           aria-label="Delete"
//                           onClick={() => handleDeleteClick(term._id)}
//                         >
//                           <i className="bi bi-trash" />
//                         </button>
//                       </div>
//                     )}

//                     {isAuthenticated && isAdminPage ? (
//                       <DragDropContext onDragEnd={handleDragEnd}>
//                         <Droppable droppableId="termsDroppable">
//                           {(provided) => (
//                             <div
//                               {...provided.droppableProps}
//                               ref={provided.innerRef}
//                             >
//                               {termsandconditions.map((term, index) => (
//                                 <Draggable
//                                   key={term._id}
//                                   draggableId={term._id.toString()}
//                                   index={index}
//                                 >
//                                   {(provided) => (
//                                     <div
//                                       ref={provided.innerRef}
//                                       {...provided.draggableProps}
//                                       {...provided.dragHandleProps}
//                                     >
//                                       <h3>{term.title}</h3>
//                                       <p>{term.content}</p>
//                                       <button onClick={() => onEdit(term._id)}>
//                                         Edit
//                                       </button>
//                                       <button
//                                         onClick={() => onDelete(term._id)}
//                                       >
//                                         Delete
//                                       </button>
//                                     </div>
//                                   )}
//                                 </Draggable>
//                               ))}
//                               {provided.placeholder}
//                             </div>
//                           )}
//                         </Droppable>
//                       </DragDropContext>
//                     ) : (
//                       <div className="conditions-content">
//                         <h2 className="conditions-title">{term.Title}</h2>
//                         <p className="conditions-description text-center">
//                           {term.Description}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}
//       {/* End Services Section */}
//     </>
//   );
// });

// export default TermsandConditions;
// import Swal from "sweetalert2";
// import { useAuth } from "../../CMSAdmin/Auth/AuthContext";
import useFetch from "../useFetch";
import { forwardRef, useImperativeHandle } from "react";
import "./TermsAndConditions.css";

const TermsandConditions = forwardRef(({ terms }, ref) => {
  const childFunction = (newUser) => {
    // console.log("test function:", newUser);
    refetch();
  };

  useImperativeHandle(ref, () => ({
    childFunction,
  }));
  // const { isAuthenticated, isAdminPage } = useAuth();

  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const { data: termsandconditions, refetch } = useFetch(
    `${API_URL}/api/terms`
  );
  console.log("terms content: ", termsandconditions);

  return (
    <>
      {/* ======= Terms and Conditions ======= */}
      <div
        className="hero hero-single route bg-image"
        alt="Blog Details"
        style={{ backgroundImage: "url(../assets/img/overlay-bg.jpg)" }}
      >
        <div className="overlay-mf"></div>
        <div className="hero-content display-table">
          <div className="table-cell">
            <div className="container">
              <h2 className="hero-title mb-4">TERMS AND CONDITIONS</h2>
            </div>
          </div>
        </div>
      </div>

      {termsandconditions && termsandconditions.length > 0 && (
        <section id="conditions" className="conditions-mf pt-5 route">
          <div className="container">
            <div className="row">
              {termsandconditions.map((term) => (
                <div className="col-12" key={term._id}>
                  <div className="conditions-box">
                    <div className="conditions-content">
                      <h2 className="conditions-title">{term.title}</h2>
                      <p className="conditions-description">{term.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* End Services Section */}
    </>
  );
});

export default TermsandConditions;
