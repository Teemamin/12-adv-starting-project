import EventsList from '../components/EventsList';
import {useLoaderData, json, defer, Await} from 'react-router-dom'
import { Suspense } from 'react';

function EventsPage() {
    const {events} = useLoaderData()
    return(
      //<Suspense> lets you display a fallback until its children have finished loading.
      //d promise returned by the loader is what we pass to resolve as a val, await will wait for the data to b there
      //the func btw the await,will b execcuted by react router once the promise is resolved(once we have the data)
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading data..</p>}>
        <Await resolve={events} >
          {(loadedEvents)=> <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    )
  //   if(data.isError){
  //       return <p>{data.message}</p>
  //   }
  //   const events = data.events
  // return (
  //   <>
  //    <EventsList events={events} />
  //   </>
  // );
}

export default EventsPage;

const loadEvents = async ()=>{
  //this is a client side code
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    throw json({message: 'Could not fetch data'},{status: 500})
    // return {isError: true, message: 'there was an issue fetching the data'} an alterantive to handle error
    // throw new Response(JSON.stringify({message: 'Could not fetch data', status: 500}))
  } else {
    const reData = await response.json()
    return reData.events
  }
}

export const loader = () => {
  // the val returned by defer will be the val returned by our loader
    return defer({events: loadEvents()})
    
  }