import { useRouteError } from "react-router-dom";
import PageContent from "../UI/PageContent";
import MainNavigation from "../components/MainNavigation";

export default function IsError() {
  const error = useRouteError();
  let title = 'oops error..'
  let message = 'Something went wrong'
  console.log(error)
 
 

  if(error.status === 500){
    title = error.status
    message = error.data.message
  }

  if(error.status === 404){
    title = error.status
    message = error.statusText
  }

  return (
    <div>
        <MainNavigation/>
     
      <PageContent title={title}>
        <p>
            <i>{message}</i>
        </p>
      </PageContent>
    </div>
  );
}