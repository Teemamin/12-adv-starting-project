import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
    const fetcher = useFetcher() //fetcher can b used for both loader or action
    //This hook lets you plug your UI into your actions and loaders without navigating.
    //use fetcher if you wanna trigger an action or a loader with out actually loading the page (route) containing the action or loader
   //https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/35734084#questions
    const {data, state} = fetcher
    // console.log(data)
    useEffect(()=>{
        if(state === 'idle' && data && data.message){
            window.alert(data.message)
        }
    },[data,state])
  return (
    <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
        name='email'
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;