import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';

function App() {
  const [Data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        var response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setData(response.data);
        //console.log(response.data)
      } catch (err) {
        //return new Error("Failed to Fetch !", err);
        alert("failed to fetch data");
      }
    })();
  });

  return (
    <div className="App">
      {/* <h1>Employee Data Table</h1>
      <table>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </thead>
        <tbody>
          {Data.map((empData)=>(<tr>
            <td>{empData.id}</td>
            <td>{empData.name}</td>
            <td>{empData.email}</td>
            <td>{empData.role}</td>
          </tr>))}
          
        </tbody>
      </table> */}
      <PaginatedItems itemsPerPage={10}/>
    </div>
  );
}
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  const [Data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        var response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setData(response.data);
        //console.log(response.data)
      } catch (err) {
        //return new Error("Failed to Fetch !", err);
        alert("failed to fetch data");
      }
    })();
  });
  return (
    <>
      <table>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </thead>
        <tbody>
          {currentItems.map((empData)=>(<tr>
            <td>{empData.id}</td>
            <td>{empData.name}</td>
            <td>{empData.email}</td>
            <td>{empData.role}</td>
          </tr>))}
          
        </tbody>
      </table>
    </>
  );
}

function PaginatedItems({ itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const [Data, setData] = useState([]);
  const currentItems = Data.slice(itemOffset, endOffset);
  console.log(currentItems)
  const pageCount = Math.ceil(items.length / itemsPerPage);
  
  useEffect(() => {
    (async () => {
      try {
        var response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setData(response.data);
        //console.log(response.data)
      } catch (err) {
        //return new Error("Failed to Fetch !", err);
        alert("failed to fetch data");
      }
    })();
  });
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      {/* <Items currentItems={currentItems} /> */}
      {/* <table>
        <tbody>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>

          {Data.map((empData)=>(<tr>
            <td>{empData.id}</td>
            <td>{empData.name}</td>
            <td>{empData.email}</td>
            <td>{empData.role}</td>
          </tr>))}
          
        </tbody>
      </table> */}
      <Items currentItems={currentItems} />
      <button onClick={handlePageClick}>Previous</button>
      <button onClick={handlePageClick}>Next</button>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default App;
