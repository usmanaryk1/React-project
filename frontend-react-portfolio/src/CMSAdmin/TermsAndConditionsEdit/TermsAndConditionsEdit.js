// import TermsandConditions from "../../Components/TermsAndConditions/Terms&Conditions";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { toast } from "react-toastify";
// import { useState, useEffect, useRef } from "react";
// import validationSchema from "./TermsValidation"; // Define your validation schema
// import useFetch from "../../Components/useFetch";

// const TermsAndConditionsEdit = () => {
//   const token = localStorage.getItem("token");
//   const [currentTerm, setCurrentTerm] = useState(null);
//   const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { setData: setTerms } = useFetch(`${API_URL}/api/terms`);
//   const childRef = useRef();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {
//       title: "",
//       content: "",
//       isActive: false,
//     },
//   });

//   useEffect(() => {
//     if (currentTerm) {
//       setValue("title", currentTerm.title);
//       setValue("content", currentTerm.content);
//     } else {
//       reset();
//     }
//   }, [currentTerm, setValue, reset]);

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     const formData = {
//       title: data.title,
//       content: data.content,
//     };

//     if (currentTerm) {
//       const response = await fetch(`${API_URL}/api/terms/${currentTerm._id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       if (response.ok) {
//         const result = await response.json();
//         setTerms((prevTerms) =>
//           prevTerms.map((term) => (term._id === result._id ? result : term))
//         );
//         toast.success("Terms updated successfully");
//       }
//     } else {
//       const response = await fetch(`${API_URL}/api/terms`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       if (response.ok) {
//         const result = await response.json();
//         setTerms((prevTerms) => [...prevTerms, result]);
//         toast.success("Terms added successfully");
//       } else {
//         toast.error("Failed to add Terms");
//       }
//     }
//     setIsSubmitting(false);
//     setCurrentTerm(null);
//   };

//   const onReset = () => {
//     reset();
//     setCurrentTerm(null);
//   };

//   const handleEdit = (term) => {
//     setCurrentTerm(term);
//   };

//   const handleDelete = async (id) => {
//     const response = await fetch(`${API_URL}/api/terms/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (response.ok) {
//       setTerms((prevTerms) => prevTerms.filter((term) => term._id !== id));
//       toast.success("Terms deleted successfully");
//     } else {
//       toast.error("Failed to delete terms");
//     }
//   };

//   return (
//     <>
//       <section id="hero-form" className="hero-form form">
//         <div className="container">
//           <div className="row">
//             <div className="hero-container">
//               <div className="col-12">
//                 <h2>Add Terms and Conditions!</h2>
//               </div>
//               <div className="col-12">
//                 <form onSubmit={handleSubmit(onSubmit)} noValidate>
//                   <div className="form-group">
//                     <input
//                       type="text"
//                       name="title"
//                       className="form-control"
//                       {...register("title")}
//                       placeholder="Title"
//                       required
//                     />
//                   </div>
//                   {errors.title && (
//                     <p className="error-message">{errors.title.message}</p>
//                   )}
//                   <div className="form-group">
//                     <textarea
//                       name="content"
//                       {...register("content")}
//                       placeholder="Terms and conditions content"
//                     ></textarea>
//                   </div>
//                   {errors.content && (
//                     <p className="error-message">{errors.content.message}</p>
//                   )}

//                   <div className="buttons">
//                     <button className="reset" type="button" onClick={onReset}>
//                       Reset
//                     </button>
//                     <button
//                       type="submit"
//                       className="submit"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? "Submitting..." : "Submit"}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//         <hr />
//       </section>
//       <TermsandConditions
//         onEditClick={handleEdit}
//         onDeleteClick={handleDelete}
//         ref={childRef}
//         terms={setTerms}
//       />
//     </>
//   );
// };

// export default TermsAndConditionsEdit;

import TermsandConditions from "../../Components/TermsAndConditions/Terms&Conditions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import validationSchema from "./TermsValidation"; // Define your validation schema
import useFetch from "../../Components/useFetch";
import { useAuth } from "../../CMSAdmin/Auth/AuthContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Swal from "sweetalert2";

const TermsAndConditionsEdit = () => {
  const token = localStorage.getItem("token");
  const [currentTerm, setCurrentTerm] = useState(null);
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setData: setTerms } = useFetch(`${API_URL}/api/terms`);
  const childRef = useRef();
  const { isAuthenticated, isAdminPage } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      content: "",
      isActive: false,
    },
  });

  useEffect(() => {
    if (currentTerm) {
      setValue("title", currentTerm.title);
      setValue("content", currentTerm.content);
    } else {
      reset();
    }
  }, [currentTerm, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = { title: data.title, content: data.content };
      let response;

      if (currentTerm) {
        response = await fetch(`${API_URL}/api/terms/${currentTerm._id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch(`${API_URL}/api/terms`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        const result = await response.json();
        toast.success(
          currentTerm
            ? "Terms updated successfully"
            : "Terms added successfully"
        );
        refetch(); // to refresh the list
        setCurrentTerm(null);
        reset();
      } else {
        const errorMsg = await response.json();
        toast.error(errorMsg?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Network error, please try again later");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { data: termsandconditions, refetch } = useFetch(
    `${API_URL}/api/termsandconditions`
  );

  const [editingTermId, setEditingTermId] = useState(null);
  const [updatedTerms, setUpdatedTerms] = useState(termsandconditions || []);

  const handleDeleteClick = (termId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const prevTerms = updatedTerms;
        setUpdatedTerms(updatedTerms.filter((term) => term._id !== termId)); // Optimistic update
        try {
          await fetch(`${API_URL}/api/terms/${termId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success("Terms deleted successfully");
        } catch (error) {
          toast.error("Failed to delete terms");
          setUpdatedTerms(prevTerms); // Revert to previous state if deletion fails
        }
      }
    });
  };

  const handleEditClick = (term) => {
    setEditingTermId(term._id);
  };

  const handleSaveClick = (termId) => {
    const updatedTerm = updatedTerms.find((term) => term._id === termId);
    onEdit(updatedTerm);
    setEditingTermId(null);
    handleSubmit(onSubmit)();
    refetch();
  };

  const onEdit = (updatedTerm) => {
    setCurrentTerm(updatedTerm); // Set the term to edit
    setValue("title", updatedTerm.title); // Set the form value for editing
    setValue("content", updatedTerm.content); // Set the form content value for editing
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTerms = Array.from(termsandconditions);
    const [removed] = reorderedTerms.splice(result.source.index, 1);
    reorderedTerms.splice(result.destination.index, 0, removed);

    setUpdatedTerms(reorderedTerms);
    onReorder(reorderedTerms);
  };

  const onReorder = async (reorderedTerms) => {
    await fetch(`${API_URL}/api/terms/reorder`, {
      method: "POST", // or PUT depending on your API
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ terms: reorderedTerms }),
    });
  };

  return (
    <>
      <section id="conditions" className="conditions-mf pt-5 route">
        <div className="container">
          <div className="row">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="termsDroppable">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {updatedTerms.map((term, index) => (
                      <Draggable
                        key={term._id}
                        draggableId={term._id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="col-md-4"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="conditions-box">
                              <div className="admin-actions d-flex justify-content-end align-items-start">
                                {editingTermId === term._id ? (
                                  <>
                                    <button
                                      className="admin-btn btn btn-success btn-sm"
                                      onClick={() => handleSaveClick(term._id)}
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="admin-btn btn btn-warning btn-sm mx-1"
                                      onClick={() => setEditingTermId(null)}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="admin-btn btn btn-primary btn-sm"
                                      onClick={() => handleEditClick(term)}
                                    >
                                      <i className="bi bi-pencil" />
                                    </button>
                                    <button
                                      className="admin-btn btn btn-danger btn-sm mx-1"
                                      onClick={() =>
                                        handleDeleteClick(term._id)
                                      }
                                    >
                                      <i className="bi bi-trash" />
                                    </button>
                                  </>
                                )}
                              </div>
                              <div className="conditions-content">
                                <form>
                                  <input
                                    type="text"
                                    value={term.title}
                                    onChange={(e) =>
                                      setUpdatedTerms((prevTerms) =>
                                        prevTerms.map((t) =>
                                          t._id === term._id
                                            ? {
                                                ...t,
                                                title: e.target.value,
                                              }
                                            : t
                                        )
                                      )
                                    }
                                    className="form-control mb-2"
                                  />
                                  <textarea
                                    value={term.content}
                                    onChange={(e) =>
                                      setUpdatedTerms((prevTerms) =>
                                        prevTerms.map((t) =>
                                          t._id === term._id
                                            ? {
                                                ...t,
                                                content: e.target.value,
                                              }
                                            : t
                                        )
                                      )
                                    }
                                    className="form-control"
                                  />
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </section>

      <TermsandConditions ref={childRef} terms={setTerms} />
    </>
  );
};

export default TermsAndConditionsEdit;
