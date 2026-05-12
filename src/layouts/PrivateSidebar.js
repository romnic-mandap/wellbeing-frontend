
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import classNames from 'classnames';
import { useNavigate, Link } from "react-router-dom"

export default function PrivateSidebar({ active = "meals" }) {
  const navigate = useNavigate()

  return (
    <Nav className="nav flex-column flex-nowrap vh-100 overflow-auto text-white p-0 m-0">
      <Card>
        <ul className="list-group">
          <li className={classNames("list-group-item", { "list-group-item-primary": active == "meals" })} onClick={() => { navigate("/meals") }}>Meals</li>
          <li className={classNames("list-group-item", { "list-group-item-primary": active == "aftermealnotes" })} onClick={() => { navigate("/after-meal-notes") }}>After meal notes</li>
          <li className={classNames("list-group-item", { "list-group-item-primary": active == "thoughtrecords" })} onClick={() => { navigate("/thought-records") }}>Thought records</li>
          <li className={classNames("list-group-item", { "list-group-item-primary": active == "thoughtmap" })} onClick={() => { navigate("/thought-map") }}>Thought map</li>
          <li className={classNames("list-group-item", { "list-group-item-primary": active == "fooditems" })} onClick={() => { navigate("/food-items") }}>Food items</li>
          <li className={classNames("list-group-item", { "list-group-item-primary": active == "foodtableitems" })} onClick={() => { navigate("/food-table-items") }}>Food table items</li>
          <li className="list-group-item disabled">Coming soon...</li>
          <li className="list-group-item disabled">Coming soon...</li>
        </ul>

      </Card>

    </Nav>
  )
}

/*
<li className="list-group-item list-group-item-primary">Meals</li>
          <li className="list-group-item">After meal notes</li>
          <li className="list-group-item">Thought records (coming soon...)</li>
          <li className="list-group-item disabled">Coming soon...</li>
          <li className="list-group-item disabled">Coming soon...</li>


<ul className="list-group">
          <li className={classNames("list-group-item", {"list-group-item-primary": active=="meals"})}><Link to="/meals">Meals</Link></li>
          <li className={classNames("list-group-item", {"list-group-item-primary": active=="aftermealnotes"})}><Link to="/after-meal-notes">After meal notes</Link></li>
          <li className="list-group-item">Thought records (coming soon...)</li>
          <li className="list-group-item disabled">Coming soon...</li>
          <li className="list-group-item disabled">Coming soon...</li>
        </ul>
          */

