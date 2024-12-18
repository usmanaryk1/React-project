import Contact from "../../Components/Contact/Contact";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import validationSchema from "./ContactValidation";
import useFetch from "../../Components/useFetch";
import { useState, useEffect } from "react";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";
import "./ContactForm.css";

const ContactForm = () => {
  const [currentContact, setCurrentContact] = useState(null);
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status

  const {
    data: contacts,
    setData: setContacts,
    refetch,
    error,
    isPending,
  } = useFetch(`${API_URL}/api/contact`);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      description: "",
      location: "",
      number: "",
      email: "",
      isActive: false,
    },
  });

  useEffect(() => {
    if (currentContact) {
      setValue("description", currentContact.description);
      setValue("location", currentContact.location);
      setValue("number", currentContact.number);
      setValue("email", currentContact.email);
      setValue("isActive", currentContact.isActive);
    } else {
      reset();
    }
  }, [currentContact, setValue, reset]);

  // console.log("currentContact", currentContact);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = {
      description: data.description,
      location: data.location,
      number: data.number,
      email: data.email,
      isActive: data.isActive,
    };

    if (currentContact) {
      // Update contact
      // const updatedContact = { ...currentContact, ...formData };
      const response = await fetch(
        `${API_URL}/api/contact/${currentContact._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      // console.log("Updated contact response:", result);
      setContacts(
        contacts.map((contact) =>
          contact._id === result._id ? result : contact
        )
      );
      // console.log("Updated Contact: ", contacts);
      toast.success("Contacts updated successfully");
    } else {
      // Add new service
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        // console.log("Added contact response: ", result);
        setContacts((prevContacts) => [...prevContacts, result]);
        // console.log("Added Contact: ", contacts);
        toast.success("Contact added successfully");
      } else {
        toast.error("Failed to add Contact");
      }
    }
    reset();
    setCurrentContact(null);
    setIsSubmitting(false);
    refetch();
  };

  const onReset = () => {
    reset();
    setCurrentContact(null);
  };

  const handleEdit = (contact) => {
    setCurrentContact(contact);
    // console.log("onedit: ", contact);
  };

  const handleDelete = async (id) => {
    // console.log("Deleting service with ID:", id);
    const response = await fetch(`${API_URL}/api/contact/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setContacts(contacts.filter((contact) => contact._id !== id));
      refetch();
      // toast.success("Contact deleted successfully");
      // console.log("Deleted Contact", contacts);
    } else {
      toast.error("Failed to delete service");
    }
  };

  if (isPending) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <>
      <section id="contact-form" className="contact-form form">
        <div className="container">
          <div className="row">
            <div className="contact-container">
              <div className="col-12">
                <h2>Add Contact Info!</h2>
              </div>
              <div className="col-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-froup">
                    <input
                      type="text"
                      name="description"
                      className="form-control"
                      {...register("description")}
                      placeholder="Description"
                    />
                  </div>
                  {errors.description && (
                    <p className="error-message">
                      {errors.description.message}
                    </p>
                  )}

                  <div className="form-group">
                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      {...register("location")}
                      placeholder="Location"
                    />
                  </div>
                  {errors.location && (
                    <p className="error-message">{errors.location.message}</p>
                  )}

                  <div className="form-group">
                    <input
                      type="text"
                      name="number"
                      className="form-control"
                      {...register("number")}
                      placeholder="Phone Number"
                    />
                  </div>
                  {errors.number && (
                    <p className="error-message">{errors.number.message}</p>
                  )}

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      {...register("email")}
                      placeholder="Email"
                    />
                  </div>
                  {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
                  )}

                  <div className="isActive">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      {...register("isActive")}
                      className="mx-2"
                    />
                    <label htmlFor="isActive">isActive</label>
                    {errors.isActive && (
                      <p className="error-message">{errors.isActive.message}</p>
                    )}
                  </div>

                  <div className="buttons">
                    <button className="reset" type="reset" onClick={onReset}>
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </section>
      <Contact
        onEditClick={handleEdit}
        onDeleteClick={handleDelete}
        contact={contacts}
      />
    </>
  );
};

export default ContactForm;
