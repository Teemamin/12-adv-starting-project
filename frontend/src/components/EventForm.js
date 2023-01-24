import { useNavigate, useNavigation, useActionData,redirect,json } from 'react-router-dom';

import classes from './EventForm.module.css';
import {Form} from 'react-router-dom'

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const data = useActionData() //gives us access to the closest action

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'


  function cancelHandler() {
    navigate('/events');
  }

  return (
    //wen using Form from react router dom, the form will be posted to your action method not the backend
    //Form will automatically trigger the action function of the active route(the route for which the form was loaded)
    <Form method={method} className={classes.form}>
      {data && data.errors && <ul>
        {Object.values(data.errors).map(err=><li key={err}>{err}</li>)}
        
        </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required  defaultValue={event ? event.title :''}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image :''}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date :''}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description :''}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export const action = async ({request,params})=>{
  //the request and params obj are passesd to the action by react router
  //action method is fired when the form is submitted
  let url = 'http://localhost:8080/events'
  if(request.method === 'PATCH'){
    url = `http://localhost:8080/events/${params.id}`
  }
  const data = await request.formData()
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    description: data.get('description'),
    date: data.get('date')
  }
  const response = await fetch(url,{
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  })

  if(response.status === 422){
    return response
  }
  if (!response.ok) {
    throw json({message: 'Could not post event'},{status: 500})
  }
  return redirect('/events')
}