import React from "react";

// const Contacts=()=> {}

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editedName: "",
      editedPhone: "",
    };
  }
  handleEdit = () => {
    this.setState({
      editMode: true,
    });
  };
  handleNameChange = (e) => {
    this.setState({
      editedName: e.target.value,
    });
  };
  handlePhoneChange = (e) => {
    this.setState({
      editedPhone: e.target.value,
    });
  };
  handleUpdateContact = async () => {
    const { editedName, editedPhone } = this.state;
    const { handleUpdate, user } = this.props;
    if (editedName && editedPhone) {
      await handleUpdate(editedName, editedPhone, user.id);
      this.setState({
        editMode: false,
      });
    }
  };
  render() {
    const { user, handleDelete } = this.props;
    const { name, phone, id } = user;
    const { editMode } = this.state;
    return (
      <li>
        <p className="name-container">
          <img src={user} alt="user-icon" />
          <span className="name">
            {editMode ? (
              <input
                className="input"
                placeholder="New Name"
                onChange={this.handleNameChange}
                required
              />
            ) : (
              name
            )}
          </span>
        </p>
        <p className="phone-container">
          {editMode ? (
            <input
              className="input"
              placeholder="New Phone No."
              onChange={this.handlePhoneChange}
              required
            />
          ) : (
            phone
          )}
        </p>
        <p className="btns-container">
          {editMode ? (
            <img
              className="list-btn"
              onClick={this.handleUpdateContact}
              src="https://cdn-icons-png.flaticon.com/512/1688/1688988.png"
              alt="submit-edit"
            />
          ) : (
            <img
              className="list-btn"
              onClick={this.handleEdit}
              src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
              alt="edit-btn"
            />
          )}
          <img
            className="list-btn"
            onClick={() => handleDelete(id)}
            src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
            alt="delete-btn"
          />
        </p>
      </li>
    );
  }
}

export default Contacts;
