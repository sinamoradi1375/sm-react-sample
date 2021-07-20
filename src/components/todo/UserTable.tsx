import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { deleteUser } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { IUser } from "../../models";

interface IProps {
  setUserToEdit: (user: IUser) => void;
}

const UserTable: React.FC<IProps> = ({ setUserToEdit }) => {
  const dispatch = useDispatch();
  const todoArr = useSelector((state: RootState) => state.userSlice.users);

  const handleDeleteUser = (todoId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-outline-secondary ms-3",
      },
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(todoId));
        Swal.fire({
          title: "Successfully Deleted",
          icon: "success",
          showConfirmButton: true,
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
          confirmButtonText: "Ok!",
        });
      }
    });
  };
  return (
    <>
      <Table
        striped
        bordered
        responsive
        hover
        variant="dark"
        className="users-table"
      >
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">First Name</th>
            <th className="text-center">Last Name</th>
            <th className="text-center">Age</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todoArr.length > 0 &&
            todoArr.map((item, index) => (
              <tr key={index}>
                <td className="text-center">{item.id}</td>
                <td className="text-center">{item.firstName}</td>
                <td className="text-center">{item.lastName}</td>
                <td className="text-center">{item.age}</td>
                <td className="text-center">
                  <FontAwesomeIcon
                    className="delete-icon"
                    icon={faTrash}
                    title="Delete"
                    onClick={() => {
                      handleDeleteUser(item.id);
                    }}
                  />
                  <FontAwesomeIcon
                    className="edit-icon ms-4"
                    icon={faPencilAlt}
                    title="Edit"
                    onClick={() => {
                      setUserToEdit(item);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserTable;
