import "./Login.css";

export const Login = () => {
    const [credentials, setCredentials] = useState(
        {
          email: "",
          password: ""
        }
      )

      function handleChange(e) {
        console.log('handleChange');
        setCredentials(prevState => (
          {
            ...prevState,
            [e.target.name]: e.target.value
          }
        ))
      }
      
      function login() {
        console.log('Login')
        console.log(credentials)
      }

      return (
        <>
          <h1>Login</h1>
          <div>
            <input type="email" name="email" placeholder='Email' onChange={handleChange} />
          </div>
          <div>
            <input type="password" name="password" placeholder='Password' onChange={handleChange} />
          </div>
          <div>
            <input type="button" value="Login" onClick={login} />
          </div>
        </>
      )
}

export default Login;