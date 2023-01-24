import React from 'react'
import EventForm from '../components/EventForm'
import { useRouteLoaderData} from 'react-router-dom'

const EditEventPage = () => {
  const loaderData = useRouteLoaderData('event-detail')
    // console.log(loaderData)
  return (
    <>
      <EventForm event={loaderData.event} method='PATCH' />
    </>
  )
}

export default EditEventPage

//repurpursed this to a reusable action for edit and add new event
// export const action = async ({request,params})=>{
//   const id = params.id
//   const data = await request.formData()
//   const eventData = {
//     title: data.get('title'),
//     image: data.get('image'),
//     description: data.get('description'),
//     date: data.get('date')
//   }
//   const response = await fetch(`http://localhost:8080/events/${id}`,{
//     method: request.method,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(eventData),
//   })

//   if(response.status === 422){
//     return response
//   }
//   if (!response.ok) {
//     throw json({message: 'Could not edit event'},{status: 500})
//   }
//   return redirect('/events')
// }