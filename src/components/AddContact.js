import React, { Component } from "react";

class AddContact extends Component {
  state = {
    name: "",
    phone: "",
    creating: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding state property (name or phone) with the input value
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone } = this.state;
    const { addContact } = this.props;
    if (name.trim() && phone.trim()) {
      // If both name and phone have non-empty values, proceed to add the contact
      this.setState({
        creating: true,
      });
      // Call the addContact function received from props to add the contact
      addContact(name, phone);
      // Reset the state to clear the input fields and set 'creating' back to false
      this.setState({
        name: "",
        phone: "",
        creating: false,
      });
    }
  };

  render() {
    const { name, phone, creating } = this.state;
    const buttonLabel = creating ? "Creating Contact" : "Add Contact";
    // Disable the button when 'creating' is true or either the name or phone is empty
    const isDisabled = creating || !name.trim() || !phone.trim();

    return (
      <div id="add-contacts-container">
        <h2>Add Contact</h2>
        <form>
          <div className="input-box">
            <input
              className="input"
              name="name"
              placeholder="Name"
              value={name}
              required
              onChange={this.handleChange}
            />
            <input
              className="input"
              name="phone"
              placeholder="Phone No."
              value={phone}
              required
              onChange={this.handleChange}
            />
            <button className="btn" onClick={this.handleSubmit} disabled={isDisabled}>
              {buttonLabel}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddContact;
