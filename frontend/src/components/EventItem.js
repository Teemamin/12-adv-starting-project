import classes from './EventItem.module.css';
import {Link, useSubmit} from 'react-router-dom'

function EventItem({ event }) {
  const submit = useSubmit()
  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?')
    //submit takes 2 agrs first is the data obj you wanna submit(the data will b automatically wrapped in
    //in a formData obj by react router, second args is an obj of same value u could set on form eg 
    //{method:post, action: to some action route if the action is defined ina different route}
    //here the action is already defined in the eventDetail route, so no need to declare it )
    //The first argument to submit accepts many different values.
    //You can submit any form or form input element: https://reactrouter.com/en/main/hooks/use-submit
    if(proceed){
      submit(null,{method: 'DELETE'})
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
