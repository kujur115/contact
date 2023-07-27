import React from "react";
import userIcon from "../assets/images/user.png";

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editedName: props.user.name,
      editedPhone: props.user.phone,
    };
  }

  // Toggle the editMode state between true and false when the edit button is clicked
  handleEdit = () => {
    this.setState((prevState) => ({
      editMode: !prevState.editMode,
    }));
  };

  // Handle changes in the name input field and update the state accordingly
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  // Handle the update of the contact information when the update button is clicked
  handleUpdateContact = async (e) => {
    e.preventDefault();
    const { editedName, editedPhone } = this.state;
    const { handleUpdate, user } = this.props;
    if (editedName && editedPhone) {
      // Call the handleUpdate method received from props to update the contact
      await handleUpdate(editedName, editedPhone, user.id);
      // Reset editMode to false to hide the edit form
      this.setState({
        editMode: false,
      });
    }
  };

  render() {
    const { name, phone, id } = this.props.user;
    const { editMode, editedName, editedPhone } = this.state;

    return (
      <li>
        <div className="non-edit">
          <div>
            <p className="name-container">
              <img className="user-icon" src={userIcon} alt="user-icon" />
              <span className="name">{name}</span>
            </p>
            <p className="phone-container">{phone}</p>
          </div>
          <p className="btns-container">
            {/* Edit button: onClick triggers the handleEdit method */}
            <img
              className="list-btn"
              onClick={this.handleEdit}
              src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
              alt="edit-btn"
            />
            {/* Delete button: onClick triggers the handleDelete method passed from props */}
            <img
              className="list-btn"
              onClick={() => this.props.handleDelete(id)}
              src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
              alt="delete-btn"
            />
          </p>
        </div>
        {/* Display the edit form when editMode is true */}
        {editMode && (
          <div className="edit-mode">
            <form>
              {/* Input field for updating the name */}
              <input
                className="input"
                name="editedName"
                placeholder="New Name"
                onChange={this.handleInputChange}
                value={editedName}
                required
              />
              {/* Input field for updating the phone number */}
              <input
                className="input"
                name="editedPhone"
                placeholder="New Phone No."
                onChange={this.handleInputChange}
                value={editedPhone}
                required
              />
              {/* Update button: onClick triggers the handleUpdateContact method */}
              <button onClick={this.handleUpdateContact} className="btn">
                Update
              </button>
            </form>
          </div>
        )}
      </li>
    );
  }
}

export default Contacts;
