import React from 'react'
import EventForm from '../components/EventForm'

const NewEventPage = () => {
  return (
    <>
    <EventForm method='POST'/>
  </>
  )
}

export default NewEventPage

//repurpursed this to a reusable action for edit and add new event
// export const action = async ({request,params})=>{
  //the request and params obj are passesd to the action by react router
  //action method is fired when the form is submitted
//   let isId
//   if(params.length > 0){
//     isId = params.id
//   }
//   const data = await request.formData()
//   const eventData = {
//     title: data.get('title'),
//     image: data.get('image'),
//     description: data.get('description'),
//     date: data.get('date')
//   }
//   const response = await fetch('http://localhost:8080/events',{
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(eventData),
//   })

//   if(response.status === 422){
//     return response
//   }
//   if (!response.ok) {
//     throw json({message: 'Could not post event'},{status: 500})
//   }
//   return redirect('/events')
// }