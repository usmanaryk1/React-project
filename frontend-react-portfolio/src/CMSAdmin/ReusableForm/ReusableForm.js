// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

const ReusableForm = ({
  fields,
  register,
  errors,
  validationSchema,
  isSubmitting,
  onReset,
}) => {
  //   const {
  //     register,
  //     formState: { errors },
  //   } = useForm({
  //     resolver: validationSchema ? yupResolver(validationSchema) : undefined,
  //   });

  return (
    <>
      {fields.map((field, index) => (
        <div className="form-group" key={index}>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              placeholder={field.placeholder}
              className="form-control"
              {...register(field.name, field.validation)}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              className="form-control"
              {...register(field.name, field.validation)}
            />
          )}
          {/* <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            className="form-control"
            {...register(field.name, field.validation)}
          /> */}
          {errors[field.name] && (
            <p className="error-message">{errors[field.name].message}</p>
          )}
        </div>
      ))}
      <div className="buttons">
        <button className="reset" type="reset" onClick={onReset}>
          Reset
        </button>
        <button type="submit" className="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </>
  );
};

export default ReusableForm;
