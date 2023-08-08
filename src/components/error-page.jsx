import '../assets/css/errorstyle.css';

function errorpage() {
    return (
        <>
            <div className='errorDiv'>
                <h1> Error404: Cannot Reach Page</h1>
                <p>This page either cannot be reached or does not exist</p>
                <p>If you like to go back to the home page click the link below</p>
                <a href="https://yourtriptoparadise.netlify.app" className='errorLink'>https://yourtriptoparadise.netlify.app</a>
                <p>We are truly sorry for this inconvenience</p>
            </div>
        </>
    )
}

export default errorpage
