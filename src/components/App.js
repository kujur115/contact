import React, { Component } from "react";
import AddContact from "./AddContact";
import ContactList from "./Contacts";

const API_BASE_URL = "https://jsonplaceholder.typicode.com/users/";

class App extends Component {
  state = {
    users: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      // Fetch user data from the API
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }
      const data = await response.json();

      // Update the component state with the fetched user data
      this.setState({
        users: data,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      // If there is an error during data fetching, set loading to false
      // to indicate that data is not being loaded successfully.
      this.setState({
        loading: false,
      });
    }
  }

  handleDelete = async (id) => {
    try {
      const url = API_BASE_URL + id;
      // Send a DELETE request to the API to delete the contact with the given id
      await fetch(url, {
        method: "DELETE",
      });

      // Update the component state by removing the deleted contact from the users array
      this.setState((prevState) => ({
        users: prevState.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  handleUpdate = async (name, phone, id) => {
    try {
      const url = API_BASE_URL + id;
      // Send a PUT request to the API to update the contact with the given id
      await fetch(url, {
        method: "PUT",
        body: JSON.stringify({ id, name, phone }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      // Update the component state by updating the name and phone of the contact
      this.setState((prevState) => ({
        users: prevState.users.map((user) => {
          if (user.id === id) {
            user.name = name;
            user.phone = phone;
          }
          return user;
        }),
      }));
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  handleAdd = async (name, phone) => {
    try {
      const url = API_BASE_URL;
      // Send a POST request to the API to add a new contact
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ name, phone }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add contact.");
      }

      // Parse the response to get the new contact data
      const data = await response.json();
      console.log(data);
      // Update the component state by adding the new contact to the users array
      this.setState((prevState) => ({
        users: [data, ...prevState.users],
      }));
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  render() {
    const { users, loading } = this.state;

    return (
      <>
        <div className="header">
          <h1>Contacts</h1>
        </div>
        <div className="body">
          {/* Render the AddContact component and pass the handleAdd method as a prop */}
          <AddContact addContact={this.handleAdd} />
          <div id="contact-list-container">
            <h2>Contact List</h2>
            <ul>
              {/* If loading is true, display a loading message, otherwise, render the ContactList component */}
              {loading ? (
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
