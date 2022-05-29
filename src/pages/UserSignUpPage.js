import React from 'react';

import Input from '../components/Input'

export class UserSignUpPage extends React.Component{

    state = {
        displayName : '',
        username : '',
        password : '',
        passwordRepeat : '',
        pendingApiCalls:false,
        errors :{},
        passwordRepeatConfirmed:true
    };

    onChangeDisplayName = (event) =>{
        const value = event.target.value;
        const errors = {...this.state.errors};
        delete errors.displayName;
        this.setState({displayName:value, errors});
    };

    onChangeUsername = (event) =>{
        const value = event.target.value;
        const errors = {...this.state.errors};
        delete errors.username;
        this.setState({username : value,errors});
    };

    onChangePassword = (event) =>{
        const value = event.target.value;
        const passwordRepeatConfirmed = this.state.password === value;
        const errors = {...this.state.errors};
        delete errors.password;
        errors.passwordRepeat = passwordRepeatConfirmed ? '' : 'Password didnot match ';
        this.setState({password : value, passwordRepeatConfirmed,errors });
    };

    onChangePasswordRepeat = (event) => {
        const value = event.target.value;
        const passwordRepeatConfirmed = this.state.password === value;
        const errors = {...this.state.errors};
        errors.passwordRepeat = passwordRepeatConfirmed ? '' : 'Password didnot match ';
        this.setState({passwordRepeat : value, passwordRepeatConfirmed, errors});
    };

    onClickSignup = () =>{
        const user = {
            username : this.state.username,
            displayName: this.state.displayName,
            password:this.state.password
        };

            this.setState({pendingApiCalls:true});
        // if(this.props.actions){
            this.props.actions.postSignup(user).then((response) =>{
                this.setState({pendingApiCalls:false});
            })

            .catch((apiError) => {
                let errors = {...this.state.errors}
                if(apiError.response.data && apiError.response.data.validationErrors){
                    errors ={...apiError.response.validationErrors};
                }
                this.setState({pendingApiCalls:false, errors});
  
            }); 
            // this.props.actions.postSignup();

        // }
    };
    render(){
        return (

            <div className='container'>
                <h1 className='text-center'>Sign Up</h1>
                <div className='col-12 mb-3'>
                    <Input 
                    label="Display Name"
                    placeholder='Display name ' 
                    value={this.state.displayName}
                    onChange={this.onChangeDisplayName}
                    hasError = {this.state.errors.displayName && true}
                    error = {this.state.errors.displayName}
                    />

                </div>
                

                <div className='col-12 mb-3'>
                <Input 
                    label="Username"
                    placeholder='Enter your username '
                    value={this.state.username}
                    onChange= {this.onChangeUsername} 
                    hasError = {this.state.errors.displayName && true}
                    error = {this.state.errors.displayName}
                    />
                </div>
               
                <div className='col-12 mb-3'>
                <Input 
                    label="Password"
                    placeholder='Enter your password' 
                    type='password'
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    hasError = {this.state.errors.displayName && true}
                    error = {this.state.errors.displayName}
                    />
                </div>
               

                <div className='col-12 mb-3'>
                <Input 
                    label="Re-enter your password"
                    placeholder='Re enter your password' type='password'
                    value={this.state.passwordRepeat}
                    onChange={this.onChangePasswordRepeat}
                    hasError = {this.state.errors.displayName && true}
                    error = {this.state.errors.displayName}
                    />
                </div>
                
                <div className='text-center'>
                    <button className='btn btn-primary'
                    onClick={this.onClickSignup}
                    disabled={this.state.pendingApiCalls || !this.state.passwordRepeatConfirmed}
                    >
                  
                    {this.state.pendingApiCalls && (
                        <div className="spinner-border text-light spinner-border-sm mr-1">
                        {/* <span className="sr-only">Loading...</span> */}
                      </div> 
                
                    )}   
                        Sign Up</button>
                </div>
            </div>
        )
    }
}

UserSignUpPage.defaultProps = {
    actions:{
        postSignup: () => 
        new Promise((resolve, reject) => {
            resolve({});
        })
    }

};

export default UserSignUpPage;