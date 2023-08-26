
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

export default function PrivateSidebar() {

  return (
    <Nav className="nav flex-column flex-nowrap vh-100 overflow-auto text-white p-0 m-0">
      <Card>
        <ul className="list-group">
          <li className="list-group-item list-group-item-primary">Meals</li>
          <li className="list-group-item">After meal notes (coming soon...)</li>
          <li className="list-group-item">Thought records (coming soon...)</li>
          <li className="list-group-item disabled">Coming soon...</li>
          <li className="list-group-item disabled">Coming soon...</li>
        </ul>

      </Card>

    </Nav>
  )
}