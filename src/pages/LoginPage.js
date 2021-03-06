import React from 'react';
import Input from '../components/Input';


export class LoginPage extends React.Component {

    state = {
        username:"",
        password : ""
    }

    onChangeUsername = (event) =>{
        const value = event.target.value;
        this.setState({
            username:value
        });
    }

    onChangePassword = (event) =>{
        const value = event.target.value;
        this.setState({
            password:value
        });
    }

    onClickLogin = () =>{
        this.props.actions.postLogin();
    }

    render(){
        return (
            <div className='container'>
                <h1 className='text-center'>Login</h1>
                <div className='col-12 mb-3'>
                    <Input label="Username" 
                        placeholder='Username here' 
                        value ={this.state.username} 
                        onChange={this.onChangeUsername}>
                    </Input>
                </div>

                <div className='col-12 mb-3'>
                    <Input label="Password" 
                    placeholder="Password here .." 
                    type="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}>
                </Input>
                </div>

                <div className='text-center'>
                    <button className='btn btn-primary' 
                    onClick={this.onClickLogin}>Login</button>
                </div>
            </div>

        );
    }
}

LoginPage.defaultProps = {
    actions:{
        postLogin: () => new Promise((resolve, reject) => resolve({}))
    }

};

export default LoginPage;