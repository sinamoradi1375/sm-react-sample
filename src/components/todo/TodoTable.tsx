import { Table } from "react-bootstrap";
import { ITodo } from "../../models";

interface IProps {
  data: ITodo[];
}

const TodoTable: React.FC<IProps> = () => {
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
        <tr>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TodoTable;
