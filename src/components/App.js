import React from "react";
import AddContact from "./AddContact";
import ContactList from "./Contacts";
const url = "https://jsonplaceholder.typicode.com/users/";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      users: data,
    });
  }

  handleDelete = async (id) => {
    let { users } = this.state;
    const urll = url + id;
    await fetch(urll, {
      method: "DELETE",
    });
    let updatedUser = users.filter((user) => user.id !== id);
    this.setState({
      users: updatedUser,
    });
  };

  handleUpdate = async (name, phone, id) => {
    let { users } = this.state;
    const urll = url + id;
    await fetch(urll, {
      method: "PUT",
      body: JSON.stringify({ id, name, phone }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log("Updated data", json));

    let updatedUser = users.map((user) => {
      if (user.id === id) {
        user.name = name;
        user.phone = phone;
      }
      return user;
    });
    this.setState({
      users: updatedUser,
    });
  };

  handleAdd = async (name, phone) => {
    let id = Date.now();
    const { users } = this.state;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({ name, phone }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log("contact added", json));

    let updatedUsers = [{ name, phone, id }].concat(users);

    this.setState({ users: updatedUsers });
  };

  render() {
    const { users } = this.state;
    return (
      <>
        <div className="header">
          <h1>Contacts</h1>
        </div>
        {/* <hr /> */}
        <div className="body">
          <AddContact addContact={this.handleAdd} />
          <div id="contact-list-container">
            <h2>Contact List</h2>
            <ul>
              {users.length === 0 ? (
                <h1>Loading...</h1>
              ) : (
                users.map((user) => (
                  <ContactList
                    user={user}
                    key={user.id}
                    handleDelete={this.handleDelete}
                    handleUpdate={this.handleUpdate}
                  />
                ))
              )}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default App;
