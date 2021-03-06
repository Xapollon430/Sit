import { useContext } from "react";
import { useFormik } from "formik";
import { StoreContext } from "../../../store/store";
import * as actions from "../../../store/actions";
import * as Yup from "yup";

const PersonalInfoSchema = Yup.object().shape({
  name: Yup.string().required("First name is required"),
  surname: Yup.string().required("Surname is required"),
  address: Yup.string(),
  state: Yup.string(),
  city: Yup.string(),
  zip: Yup.string().max(5),
  profilePicture: Yup.mixed(),
});

export default (setErrorFromServer) => {
  const [state, dispatch] = useContext(StoreContext);

  return useFormik({
    initialValues: {
      name: state.user.name,
      surname: state.user.surname,
      address: state.user.address || "",
      state: state.user.state || "",
      city: state.user.city || "",
      zip: state.user.zip || "",
      profilePicture: "",
    },
    validationSchema: PersonalInfoSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const updatedProfileData = new FormData();
        for (const data in values) {
          values[data] != "" && updatedProfileData.append(data, values[data]);
        }

        let response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/update-personal-info`,
          {
            method: "PATCH",
            body: updatedProfileData,
            headers: {
              Authorization: "Bearer " + state.accessToken,
            },
          }
        );
        if (response.status != 200) {
          throw await response.text();
        }
        let updatedUser = await response.json();

        dispatch(
          actions.generalDispatchBundler({
            user: updatedUser,
          })
        );
      } catch (e) {
        setErrorFromServer(e);
        resetForm();
      }
    },
  });
};
