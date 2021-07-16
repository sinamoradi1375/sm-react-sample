import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { deleteTodo } from "../../store/slices/todoSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

interface IProps {}

const TodoTable: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const todoArr = useSelector((state: RootState) => state.todoSlice.todos);
  const handleDeleteTodo = (todoId: number) => {
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
        dispatch(deleteTodo(todoId));
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
        className="todo-table"
      >
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Title</th>
            <th className="text-center">IsCompleted</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todoArr.length > 0 &&
            todoArr.map((item, index) => (
              <tr key={index}>
                <td className="text-center">{item.id}</td>
                <td className="text-center">{item.title}</td>
                <td className="text-center">
                  {item.completed ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} />
                  )}
                </td>
                <td className="text-center">
                  <FontAwesomeIcon
                    className="delete-icon"
                    icon={faTrash}
                    title="Delete"
                    onClick={() => {
                      handleDeleteTodo(item.id);
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

export default TodoTable;
