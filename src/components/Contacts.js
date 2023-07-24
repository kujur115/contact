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
  handleEdit = () => {
    const { editMode } = this.state;
    this.setState({
      editMode: editMode ? false : true,
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
  handleUpdateContact = async (e) => {
    e.preventDefault();
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
            <img
              className="list-btn"
              onClick={this.handleEdit}
              src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
              alt="edit-btn"
            />

            <img
              className="list-btn"
              onClick={() => handleDelete(id)}
              src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
              alt="delete-btn"
            />
          </p>
        </div>
        {editMode && (
          <div className="edit-mode">
            <form>
              <input
                className="input"
                placeholder="New Name"
                onChange={this.handleNameChange}
                value={editedName}
                required
              />
              <input
                className="input"
                placeholder="New Phone No."
                onChange={this.handlePhoneChange}
                value={editedPhone}
                required
              />
              <button
                onClick={(e) => this.handleUpdateContact(e)}
                className="btn"
              >
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
