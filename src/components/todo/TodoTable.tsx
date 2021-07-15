import { Table } from "react-bootstrap";
import { ITodo } from "../../models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  todoArr: ITodo[];
}

const TodoTable: React.FC<IProps> = ({ todoArr }) => {
  return (
    <Table striped bordered responsive hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>IsCompleted</th>
        </tr>
      </thead>
      <tbody>
        {todoArr.length > 0 &&
          todoArr.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                {item.completed ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <FontAwesomeIcon icon={faTimes} />
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TodoTable;
