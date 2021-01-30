// import React, { Component } from 'react';
// import Nav from '../components/authentication/Navbar';
// import LoginForm from '../components/authentication/LoginForm';
// import SignupForm from '../components/authentication/SignupForm';


// class Home extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             displayed_form: '',
//             logged_in: localStorage.getItem('token') ? true : false,
//             username: ''
//         };
//     }

//     componentDidMount() {
//         if (this.state.logged_in) {
//             fetch('http://127.0.0.1:8000/current_user/', {
//                 headers: {
//                     Authorization: `JWT ${localStorage.getItem('token')}`
//                 }
//             })
//                 .then(res => res.json())
//                 .then(json => {
//                     this.setState({ username: json.username });
//                 });
//         }
//     }

//     handle_login = (e, data) => {
//         e.preventDefault();
//         fetch('http://127.0.0.1:8000/token-auth/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//             .then(res => res.json())
//             .then(json => {
//                 localStorage.setItem('token', json.token);
//                 this.setState({
//                     logged_in: true,
//                     displayed_form: '',
//                     username: json.user.username
//                 });
//             })
//             // TODO: DISPLAY SOME NOTIFICATION 
//             .catch(error => {
//                 console.log("wrong credentials");
//             })
//     };

//     handle_signup = (e, data) => {
//         e.preventDefault();
//         fetch('http://127.0.0.1:8000/users/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//             .then(res => res.json())
//             .then(json => {
//                 localStorage.setItem('token', json.token);
//                 this.setState({
//                     logged_in: true,
//                     displayed_form: '',
//                     username: json.username
//                 });
//             })
//             // TODO: display some Notification
//             .catch(error => {
//                 console.log("wrong credentials")
//             })
//     };

//     handle_logout = () => {
//         localStorage.removeItem('token');
//         this.setState({ logged_in: false, username: '' });
//     };

//     display_form = form => {
//         this.setState({
//             displayed_form: form
//         });
//     };

//     render() {
//         let form;
//         switch (this.state.displayed_form) {
//             case 'login':
//                 form = <LoginForm handle_login={this.handle_login} />;
//                 break;
//             case 'signup':
//                 form = <SignupForm handle_signup={this.handle_signup} />;
//                 break;
//             default:
//                 form = null;
//         }

//         return (
//             <div className="App">
//                 <Nav
//                     logged_in={this.state.logged_in}
//                     display_form={this.display_form}
//                     handle_logout={this.handle_logout}
//                 />
//                 {form}
//                 {/* <h3>
//                     {this.state.logged_in
//                         ? `Hello, ${this.state.username}`
//                         : 'Please Log In'}
//                 </h3> */}
//             </div>
//         );
//     }
// }

// export default Home;
