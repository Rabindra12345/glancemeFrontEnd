import React from 'react';

export class UserSignUpPage extends React.Component{

    state = {
        displayName : '',
        username : '',
        password : '',
        passwordRepeat : '',
        pendingApiCalls:false,
        errors :{}
    };

    onChangeDisplayName = (event) =>{
        const value = event.target.value;
        this.setState({displayName:value});
    };

    onChangeUsername = (event) =>{
        const value = event.target.value;
        this.setState({username : value});
    };

    onChangePassword = (event) =>{
        const value = event.target.value;
        this.setState({password : value });
    };

    onChangePasswordRepeat = (event) => {
        const value = event.target.value;
        this.setState({passwordRepeat : value});
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
                    <label>Display Name</label>
                    <input className='form-control' 
                    placeholder='Display name ' 
                    value={this.state.displayName}
                    onChange={this.onChangeDisplayName}/>

                    <div className='invalid-feedback'>
                        {this.state.errors.displayName}
                    </div>
                </div>
                

                <div className='col-12 mb-3'>
                    <label>UserName</label>
                    <input className='form-control'
                    placeholder='Enter your username '
                    value={this.state.username}
                    onChange= {this.onChangeUsername} />
                </div>
               
                <div className='col-12 mb-3'>
                    <label>Password</label>
                    <input className='form-control'
                    placeholder='Enter your password' 
                    type='password'
                    value={this.state.password}
                    onChange={this.onChangePassword}/>
                </div>
               

                <div className='col-12 mb-3'>
                    <label>Re-enter the password</label>
                    <input className='form-control'
                    placeholder='Re enter your password' type='password'
                    value={this.state.passwordRepeat}
                    onChange={this.onChangePasswordRepeat}/>
                </div>
                
                <div className='text-center'>
                    <button className='btn btn-primary'
                    onClick={this.onClickSignup}
                    disabled={this.state.pendingApiCalls}
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