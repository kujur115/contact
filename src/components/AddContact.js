import { Component } from "react";

class AddContact extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      phone: "",
      creating: false,
    };
  }

  handleChange = (type, e) => {
    if (type === "name") {
      this.setState({
        name: e.target.value,
      });
      return;
    }
    this.setState({
      phone: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      creating: true,
    });
    const { name, phone } = this.state;
    const { addContact } = this.props;
    if (name && phone) {
      addContact(name, phone);
      this.setState({
        name: "",
        phone: "",
        creating: false,
      });
    }
  };

  render() {
    const { name, phone, creating } = this.state;
    return (
      <div id="add-contacts-container">
        <h2>Add Contact</h2>
        <form>
          <div className="input-box">
            <input
              className="input"
              placeholder="Name"
              value={name}
              required
              onChange={(e) => this.handleChange("name", e)}
            />
            <input
              className="input"
              placeholder="Phone No."
              value={phone}
              required
              onChange={(e) => this.handleChange("phone", e)}
            />
            <button
              className="btn"
              onClick={this.handleSubmit}
              disabled={creating}
            >
              {creating ? "Creating Contact" : "Add Contact"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default AddContact;
