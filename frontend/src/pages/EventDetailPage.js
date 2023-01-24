import React, { Suspense } from 'react'
import { json,   useRouteLoaderData, redirect, Await, defer } from 'react-router-dom'
import EventItem from '../components/EventItem'
import EventsList from '../components/EventsList'

const EventDetailPage = () => {
    const {event,events} = useRouteLoaderData('event-detail')
    // console.log(loaderData)
  return (
    <>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading event..</p>}>
        <Await resolve={event}>
          {(loadedEvent)=><EventItem event={loadedEvent} />}
        </Await>
      </Suspense>

      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading events list..</p>}>
         <Await resolve={events}>
            {(loadedEvents)=> <EventsList events={loadedEvents}/>}
         </Await>
      </Suspense>
  </>
   
  )
}

export default EventDetailPage

const loadEvents = async ()=>{
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    throw json({message: 'Could not fetch data'},{status: 500})
  } else {
    const reData = await response.json()
    return reData.events
  }
}

const loadEvent = async (id)=>{
  const response = await fetch(`http://localhost:8080/events/${id}`);
  if (!response.ok) {
      throw json({message: 'Could not fetch event'},{status: 500})
  }
  else{
    const reData = await response.json()
    return reData.event
  }
}
//you should only use defer wen you need to show somtin b4 all the data is readly available
export const eventLoader = async({request,params})=>{
    const id = params.id
    return defer({//adding await here will tell react router defer to wait for the event data to load first before rendering the eventDetail page(navigation should start only when the details have been loaded)
      //then the events loadEvents() can load when the details page have loaded
      event: await loadEvent(id),
      events: loadEvents(),
    });
  
//await is your lever your switch for controlling which data should be awaited before moving to this page and which data should be defered
//wit the above setup, we will wait for the event details to be loaded first b4 loading this component at all
//but we would load the list of events after rendereing this page 
}

    
export const action = async ({request,params})=>{
  const id = params.id
  // console.log(request)
  const response = await fetch(`http://localhost:8080/events/${id}`,{
    method: request.method
  });
  if (!response.ok) {
      throw json({message: 'Could not fetch delete event'},{status: 500})
  }
  else{
      return redirect('/events')
  }

}

  //loader func you can return the response without awaiting the resolved promise cos react router will extract the response data for you
    //therefore no need to maully extract the responses
    // const resData = await response.json();
    // return resData.events